import { Card } from "@/components/ui/card";
import { Media } from "@/components/Media";
import RichText from "@/components/RichText";
import type { TeamSection as TeamSectionProps } from "@/payload-types";

export const TeamSectionBlock: React.FC<
  TeamSectionProps & { disableInnerContainer?: boolean }
> = ({ title, intro, stats, members }) => {
  return (
    <section className="bg-[#f5f5f5] pt-16 pb-8 ">
      <div className="grid w-full gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Left Content */}
        <div className="flex flex-col justify-center max-w-[640px]">
          {title && (
            <h2 className="mb-6 font-sans text-5xl  text-foreground lg:text-6xl">
              {title}
            </h2>
          )}
          {intro && (
            <div className="mb-12 text-lg leading-relaxed text-muted-foreground prose max-w-none">
              <RichText data={intro} enableGutter={false} />
            </div>
          )}

          {/* Statistics */}
          {Array.isArray(stats) && stats.length > 0 && (
            <div className="flex flex-col lg:flex-row flex-wrap gap-6">
              {stats.map((s, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl shadow-sm  px-6 py-6 text-center"
                >
                  <div className="mb-1 font-sans text-2xl font-bold text-foreground whitespace-nowrap overflow-hidden">
                    {s.value}
                  </div>
                  <div className="text-sm font-medium text-foreground opacity-80">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Right Content - Animated Team Cards */}
        <div className="relative h-[600px] overflow-hidden">
          <div className="flex gap-4">
            <div className="flex w-1/2 flex-col gap-4 animate-scroll-down">
              {[...(members || []), ...(members || [])].map((member, index) => (
                <Card
                  key={`left-${index}`}
                  className="overflow-hidden rounded-2xl border-0 shadow-md"
                >
                  <div className="relative h-[200px] w-full">
                    <Media
                      resource={member.image}
                      fill
                      imgClassName="object-cover"
                    />
                  </div>
                  <div className="bg-white p-4 hidden">
                    <h3 className="font-sans text-lg font-bold text-foreground">
                      {member.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {member.role}
                    </p>
                  </div>
                </Card>
              ))}
            </div>

            {/* Right Column - Scrolls Up */}
            <div className="flex w-1/2 flex-col gap-4 animate-scroll-up">
              {[...(members || []), ...(members || [])].map((member, index) => (
                <Card
                  key={`right-${index}`}
                  className="overflow-hidden rounded-2xl border-0 shadow-md"
                >
                  <div className="relative h-[200px] w-full">
                    <Media
                      resource={member.image}
                      fill
                      imgClassName="object-cover"
                    />
                  </div>
                  <div className="bg-white p-4 hidden">
                    <h3 className="font-sans text-lg font-bold text-foreground">
                      {member.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {member.role}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Gradient Overlays */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#f5f5f5] to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#f5f5f5] to-transparent" />
        </div>
      </div>
    </section>
  );
};
