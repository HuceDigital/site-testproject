"use client";
import type {
  FormFieldBlock,
  Form as FormType,
} from "@payloadcms/plugin-form-builder/types";

import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import RichText from "@/components/RichText";
import { Button } from "@/components/ui/button";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { WhatsAppContact } from "@/components/WhatsApp/WhatsAppContact";

import { fields } from "./fields";
import { IntergratedMaps } from "./IntergratedMaps";
import { getClientSideURL } from "@/utilities/getURL";
import { ConditionalMeasurement } from "./ConditionalMeasurement";

export type FormBlockType = {
  blockName?: string;
  blockType?: "formBlock";
  enableIntro: boolean;
  form: FormType & { formVariant?: "traditional" | "googleMaps" };
  introContent?: SerializedEditorState;
  formVariant?: "traditional" | "googleMaps";
};

export const FormBlock: React.FC<
  {
    id?: string;
  } & FormBlockType
> = (props) => {
  const {
    enableIntro,
    form: formFromProps,
    form: {
      id: formID,
      confirmationMessage,
      confirmationType,
      redirect,
      submitButtonLabel,
    } = {},
    introContent,
    formVariant = "traditional",
  } = props;

  const formMethods = useForm({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    defaultValues: formFromProps.fields as any,
    mode: "onTouched",
  });
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    watch,
  } = formMethods;

  const [isLoading, setIsLoading] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>();
  const [error, setError] = useState<
    { message: string; status?: string } | undefined
  >();
  const router = useRouter();

  const service = watch("service") as string | undefined;

  const onSubmit = useCallback(
    (data: Record<string, any>) => {
      let loadingTimerID: ReturnType<typeof setTimeout>;
      const submitForm = async () => {
        setError(undefined);

        // Include all form data, including conditional fields
        const dataToSend = Object.entries(data).map(([name, value]) => ({
          field: name,
          value: String(value || ""),
        }));

        // Prepend window measurements to the message if Glaswerk is selected
        if (
          data.service === "glaswerk" &&
          data.windowWidth &&
          data.windowHeight
        ) {
          const messageField = dataToSend.find(
            (item) => item.field === "message"
          );
          if (messageField) {
            const measurements = `Window Measurements:<br>Width: ${data.windowWidth}cm<br>Height: ${data.windowHeight}cm<br><br>`;
            messageField.value = measurements + messageField.value;
          }
        }

        loadingTimerID = setTimeout(() => setIsLoading(true), 1000);

        try {
          const req = await fetch(
            `${getClientSideURL()}/api/form-submissions`,
            {
              body: JSON.stringify({
                form: formID,
                submissionData: dataToSend,
              }),
              headers: { "Content-Type": "application/json" },
              method: "POST",
            }
          );

          const res = await req.json();
          clearTimeout(loadingTimerID);

          if (req.status >= 400) {
            setIsLoading(false);
            setError({
              message: res.errors?.[0]?.message || "Internal Server Error",
              status: res.status,
            });
            return;
          }

          setIsLoading(false);
          setHasSubmitted(true);

          if (confirmationType === "redirect" && redirect) {
            const { url } = redirect;
            if (url) router.push(url);
          }
        } catch (err) {
          console.warn(err);
          setIsLoading(false);
          setError({ message: "Something went wrong." });
        }
      };

      void submitForm();
    },
    [router, formID, redirect, confirmationType]
  );

  const resolvedVariant = formFromProps?.formVariant ?? formVariant;

  if (resolvedVariant === "googleMaps") {
    return <IntergratedMaps {...props} />;
  }

  return (
    <div className="relative mx-auto max-w-3xl">
      <div className="absolute inset-0 -z-10 rounded-[2rem] bg-gradient-to-br from-indigo-50 via-white to-cyan-50" />

      {enableIntro && introContent && !hasSubmitted && (
        <div className="mb-6 md:mb-8">
          <RichText
            className="mb-2 lg:mb-4"
            data={introContent}
            enableGutter={false}
          />
        </div>
      )}

      <div className="overflow-hidden rounded-[2rem] border border-slate-200/60 bg-white shadow-2xl">
        <div className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white p-8">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
            Neem contact op
          </h2>
          <p className="mt-2 max-w-prose text-slate-600">
            Vul het formulier in en we reageren doorgaans binnen één werkdag.
          </p>
        </div>

        <FormProvider {...formMethods}>
          {!isLoading && hasSubmitted && confirmationType === "message" && (
            <div className="confirmation-message mx-auto max-w-xl p-8">
              <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-8 text-center shadow-sm">
                <CheckCircle className="mx-auto mb-4 h-16 w-16 text-emerald-500" />
                <div className="mb-2 text-2xl font-bold text-slate-900">
                  Bedankt!
                </div>
                <div className="mb-4 text-lg font-medium text-slate-900/90">
                  <RichText
                    data={confirmationMessage}
                    className="prose max-w-none !text-black [&_h1]:text-2xl [&_h2]:text-xl [&_h3]:text-lg"
                  />
                </div>
                <div className="mb-6 text-base text-slate-600">
                  We nemen spoedig contact met u op.
                </div>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button asChild className="px-6 py-3 text-base font-semibold">
                    <Link href="/">Terug naar home</Link>
                  </Button>
                  <WhatsAppContact
                    message="Hallo! Ik heb net het contactformulier ingevuld en wacht op jullie reactie. Kunnen jullie me meer informatie geven?"
                    variant="button"
                    className="px-6 py-3 text-base font-semibold"
                  />
                </div>
              </div>
            </div>
          )}

          {isLoading && !hasSubmitted && (
            <div className="flex items-center justify-center p-10">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-300 border-t-transparent" />
              <span className="ml-3 text-slate-600">Even geduld…</span>
            </div>
          )}

          {error && (
            <div className="mx-8 mt-8 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
              {`${error.status || "500"}: ${error.message || ""}`}
            </div>
          )}

          {!hasSubmitted && (
            <form id={formID} onSubmit={handleSubmit(onSubmit)} className="p-8">
              <div className="space-y-6">
                {formFromProps?.fields?.map((field, index) => {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  const Field: React.FC<any> =
                    fields?.[field.blockType as keyof typeof fields];
                  if (!Field) return null;

                  return (
                    <div key={index}>
                      <Field
                        form={formFromProps}
                        {...field}
                        {...formMethods}
                        control={control}
                        errors={errors}
                        register={register}
                      />
                      {(field as any).name === "service" &&
                        service === "glaswerk" && (
                          <div className="mt-6 rounded-2xl border border-sky-100 bg-sky-50/60 p-6">
                            <ConditionalMeasurement
                              control={control}
                              register={register}
                              errors={errors}
                              form={formFromProps}
                            />
                          </div>
                        )}
                    </div>
                  );
                })}
              </div>

              <div className="mt-8">
                <Button
                  form={formID}
                  type="submit"
                  variant="default"
                  className="group relative w-full justify-center rounded-xl px-8 py-6 text-base font-medium transition-transform duration-200 hover:scale-[1.01] sm:w-auto"
                >
                  {submitButtonLabel}
                </Button>
                <p className="mt-3 text-xs text-slate-500">
                  Door te verzenden ga je akkoord met onze privacyvoorwaarden.
                </p>
              </div>
            </form>
          )}
        </FormProvider>
      </div>

      <style jsx>{`
        .field-input {
          @apply w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none ring-0 placeholder:text-slate-400 focus:border-slate-300 focus:bg-white focus:shadow-md focus-visible:ring-2 focus-visible:ring-slate-200 disabled:cursor-not-allowed disabled:opacity-60;
        }
      `}</style>
    </div>
  );
};
