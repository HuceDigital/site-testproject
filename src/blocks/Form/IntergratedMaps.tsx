"use client";

import type React from "react";
import { useState } from "react";
import type { Form as FormType } from "@payloadcms/plugin-form-builder/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Mail,
  MapPin,
  Phone,
  Plus,
  Trash2,
  CheckCircle,
  MessageCircle,
} from "lucide-react";
import { WhatsAppContact } from "@/components/WhatsApp/WhatsAppContact";

export type PayloadContactFormProps = {
  id?: string;
  blockName?: string;
  blockType?: "formBlock";
  form: FormType;
  formVariant?: "traditional" | "googleMaps";
  contactInfo?: {
    address?: string;
    phone?: string;
    email?: string;
    mapQuery?: string;
  };
};

export const PayloadContactForm: React.FC<PayloadContactFormProps> = ({
  form,
  contactInfo,
}) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Convert formData object to the expected array format
      const dataToSend = Object.entries(formData).map(([field, value]) => ({
        field,
        value: String(value || ""),
      }));

      // Prepend window measurements to the message if Glaswerk is selected
      if (
        formData.service === "glaswerk" &&
        Array.isArray(formData.windows) &&
        formData.windows.length > 0
      ) {
        const messageField = dataToSend.find(
          (item) => item.field === "message"
        );
        if (messageField) {
          const windowsText = formData.windows
            .map(
              (win, idx) =>
                `Window ${idx + 1}: ${win.width}cm x ${win.height}cm`
            )
            .join("<br><br>");
          const measurements = `Window Measurements:<br>${windowsText}<br><br>`;
          messageField.value = measurements + messageField.value;
        }
      }

      // Submit to Payload form submission endpoint
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/form-submissions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            form: form.id,
            submissionData: dataToSend,
          }),
        }
      );

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({}); // Reset form
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderField = (field: any) => {
    if (!field || !field.name) {
      return null;
    }

    const fieldName = field.name;
    const fieldLabel = field.label || fieldName;
    const isRequired = field.required || false;
    const blockType = field.blockType || field.type || "text";

    // Handle text and email fields
    if (blockType === "text" || blockType === "email") {
      return (
        <div key={field.id || fieldName}>
          <Label htmlFor={fieldName}>
            {fieldLabel} {isRequired && <span className="text-red-500">*</span>}
          </Label>
          <Input
            id={fieldName}
            name={fieldName}
            type={blockType === "email" ? "email" : "text"}
            required={isRequired}
            value={formData[fieldName] || ""}
            onChange={(e) =>
              setFormData({ ...formData, [fieldName]: e.target.value })
            }
            className="mt-1"
          />
        </div>
      );
    }

    // Handle number fields
    if (blockType === "number") {
      return (
        <div key={field.id || fieldName}>
          <Label htmlFor={fieldName}>
            {fieldLabel} {isRequired && <span className="text-red-500">*</span>}
          </Label>
          <Input
            id={fieldName}
            name={fieldName}
            type="number"
            required={isRequired}
            value={formData[fieldName] || ""}
            onChange={(e) =>
              setFormData({ ...formData, [fieldName]: e.target.value })
            }
            className="mt-1"
          />
        </div>
      );
    }

    // Handle textarea fields
    if (blockType === "textarea" || blockType === "message") {
      return (
        <div key={field.id || fieldName}>
          <Label htmlFor={fieldName}>
            {fieldLabel} {isRequired && <span className="text-red-500">*</span>}
          </Label>
          <Textarea
            id={fieldName}
            name={fieldName}
            required={isRequired}
            rows={5}
            value={formData[fieldName] || ""}
            onChange={(e) =>
              setFormData({ ...formData, [fieldName]: e.target.value })
            }
            className="mt-1"
          />
        </div>
      );
    }

    // Handle select fields
    if (blockType === "select") {
      return (
        <div key={field.id || fieldName}>
          <Label htmlFor={fieldName}>
            {fieldLabel} {isRequired && <span className="text-red-500">*</span>}
          </Label>
          <Select
            value={formData[fieldName] || ""}
            onValueChange={(value) => {
              if (fieldName === "service") {
                // Initialize windows array when switching to glaswerk
                if (value === "glaswerk" && !Array.isArray(formData.windows)) {
                  setFormData({
                    ...formData,
                    service: value,
                    windows: [{ width: "", height: "" }],
                  });
                  return;
                }
              }
              setFormData({ ...formData, [fieldName]: value });
            }}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder={fieldLabel} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option: any) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {fieldName === "service" && formData["service"] === "glaswerk" && (
            <div className="mt-6 rounded-2xl border border-sky-100 bg-sky-50/60 p-6">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm text-slate-700">
                  Voeg de afmetingen van je ramen toe.
                </p>
                <Button
                  type="button"
                  variant="secondary"
                  className="h-8 px-3"
                  onClick={() => {
                    const next = Array.isArray(formData.windows)
                      ? [...formData.windows]
                      : [];
                    next.push({ width: "", height: "" });
                    setFormData({ ...formData, windows: next });
                  }}
                >
                  <Plus className="mr-1 h-4 w-4" /> Nieuw raam
                </Button>
              </div>

              <div className="space-y-4">
                {(Array.isArray(formData.windows) ? formData.windows : []).map(
                  (win: any, idx: number) => {
                    const widthCm = parseFloat(win.width || "0");
                    const heightCm = parseFloat(win.height || "0");
                    const areaM2 =
                      !isNaN(widthCm) && !isNaN(heightCm)
                        ? (widthCm / 100) * (heightCm / 100)
                        : 0;
                    return (
                      <div
                        key={idx}
                        className="rounded-xl border border-slate-200 bg-white p-4"
                      >
                        <div className="mb-3 flex items-center justify-between">
                          <span className="text-sm font-medium text-slate-900">
                            Raam {idx + 1}
                          </span>
                          <Button
                            type="button"
                            variant="ghost"
                            className="h-8 px-2 text-red-600 hover:text-red-700"
                            onClick={() => {
                              const next = [...(formData.windows || [])];
                              next.splice(idx, 1);
                              setFormData({ ...formData, windows: next });
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <div>
                            <Label htmlFor={`windowWidth_${idx}`}>
                              Breedte (cm){" "}
                              <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id={`windowWidth_${idx}`}
                              name={`windowWidth_${idx}`}
                              type="number"
                              required
                              value={win.width || ""}
                              onChange={(e) => {
                                const next = [...(formData.windows || [])];
                                next[idx] = {
                                  ...next[idx],
                                  width: e.target.value,
                                };
                                setFormData({ ...formData, windows: next });
                              }}
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor={`windowHeight_${idx}`}>
                              Hoogte (cm){" "}
                              <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id={`windowHeight_${idx}`}
                              name={`windowHeight_${idx}`}
                              type="number"
                              required
                              value={win.height || ""}
                              onChange={(e) => {
                                const next = [...(formData.windows || [])];
                                next[idx] = {
                                  ...next[idx],
                                  height: e.target.value,
                                };
                                setFormData({ ...formData, windows: next });
                              }}
                              className="mt-1"
                            />
                          </div>
                        </div>
                        <div className="mt-3 rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs text-slate-700">
                          <div className="flex items-center justify-between">
                            <span>
                              Oppervlakte:{" "}
                              {areaM2 > 0 ? areaM2.toFixed(2) : "0.00"} m²
                            </span>
                            {areaM2 > 0 && (
                              <span
                                className={`ml-3 rounded px-2 py-1 font-medium ${areaM2 < 0.75 ? "bg-red-100 text-red-700" : "bg-emerald-100 text-emerald-700"}`}
                              >
                                {/* {areaM2 < 0.75
                                  ? "Min. 0.75 m² vereist"
                                  : "Voldoet aan minimum"} */}
                              </span>
                            )}
                          </div>
                          {/* {areaM2 > 0 && areaM2 < 0.75 && (
                            <p className="mt-2 text-[11px] text-red-600">
                              Verhoog breedte of hoogte zodat het oppervlak
                              minstens 0.75 m² is.
                            </p>
                          )} */}
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          )}
        </div>
      );
    }

    // Fallback for unknown field types
    console.log("[v0] Unknown field type:", blockType);
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">
            {form.title || "Example contact form:"}
          </h1>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left Column - Contact Form */}
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-slate-900">
                Neem contact op
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Vul het formulier in en we reageren doorgaans binnen één
                werkdag.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {form.fields && Array.isArray(form.fields) ? (
                form.fields.map((field) => renderField(field))
              ) : (
                <p className="text-sm text-slate-500">
                  No form fields configured
                </p>
              )}

              {submitStatus === "success" && (
                <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-8 text-center shadow-sm">
                  <CheckCircle className="mx-auto mb-4 h-16 w-16 text-emerald-500" />
                  <div className="mb-2 text-2xl font-bold text-slate-900">
                    Bedankt!
                  </div>
                  <div className="mb-4 text-lg font-medium text-slate-900/90">
                    Het contact formulier is succesvol verzonden.
                  </div>
                  <div className="mb-6 text-base text-slate-600">
                    We nemen spoedig contact met u op.
                  </div>
                  <Button
                    onClick={() => (window.location.href = "/")}
                    className="px-6 py-3 text-base font-semibold"
                  >
                    Terug naar home
                  </Button>
                </div>
              )}

              {submitStatus === "error" && (
                <div className="rounded-2xl border border-red-200 bg-red-50/70 p-6 text-center shadow-sm">
                  <div className="mb-2 text-lg font-bold text-red-800">
                    Er is een fout opgetreden
                  </div>
                  <div className="text-base text-red-700">
                    Er is een probleem opgetreden bij het verzenden van het
                    formulier. Probeer het opnieuw.
                  </div>
                </div>
              )}

              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? "Submitting..."
                  : form.submitButtonLabel || "Submit"}
              </Button>
            </form>
          </div>

          {/* Right Column - Business Info & Map */}
          <div className="space-y-8">
            {/* Business Info Card */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">Contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 rounded-full bg-primary/10 p-2">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">Adres</p>
                    <p className="text-sm text-slate-600 whitespace-pre-line">
                      {contactInfo?.address || ""}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 rounded-full bg-primary/10 p-2">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">Telefoon</p>
                    <p className="text-sm text-slate-600">
                      {contactInfo?.phone || ""}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 rounded-full bg-primary/10 p-2">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">E-mail</p>
                    <p className="text-sm text-slate-600">
                      {contactInfo?.email || ""}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 rounded-full bg-green-100 p-2">
                    <MessageCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-slate-900">WhatsApp</p>
                    <p className="text-sm text-slate-600 mb-2">
                      Stuur ons een bericht via WhatsApp
                    </p>
                    <WhatsAppContact
                      message="Hallo! Ik heb een vraag over jullie schilderdiensten. Kunnen jullie me helpen?"
                      variant="button"
                      className="text-sm"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Google Maps */}
            <Card className="shadow-lg">
              <CardContent className="p-0">
                <div className="aspect-[4/3] w-full overflow-hidden rounded-lg">
                  <iframe
                    src={
                      contactInfo?.mapQuery
                        ? `https://www.google.com/maps?q=${encodeURIComponent(contactInfo.mapQuery)}&output=embed`
                        : "https://www.google.com/maps?q=Amsterdam%2C%20Netherlands&output=embed"
                    }
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Business Location"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

// Maintain compatibility with FormBlock import
export type IntergratedMapsProps = PayloadContactFormProps;
export const IntergratedMaps = PayloadContactForm;
