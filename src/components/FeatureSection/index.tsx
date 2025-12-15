import { MessageSquare, GraduationCap, ShieldCheck, Zap } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: MessageSquare,
      title: "Communicatie",
      description:
        "Wij houden de lijnen kort: duidelijke afspraken, snelle opvolging en altijd bereikbaar. Zo weet jij precies waar je aan toe bent – voor, tijdens én na de installatie.",
    },
    {
      icon: GraduationCap,
      title: "Kennis",
      description:
        "Met jarenlange ervaring en technische expertise zorgen wij voor oplossingen die werken. Van advies tot installatie: wij denken met je mee.",
    },
    {
      icon: ShieldCheck,
      title: "Betrouwbaarheid",
      description:
        "Je kunt op ons rekenen. Wij leveren wat we beloven, werken met kwaliteitsproducten en zorgen dat jouw beveiliging altijd optimaal functioneert.",
    },
    {
      icon: Zap,
      title: "Efficiëntie",
      description:
        "Wij bieden alles in eigen beheer: advies, installatie én onderhoud. Eén aanspreekpunt, één duidelijk proces – wel zo makkelijk.",
    },
  ];

  return (
    <section className="px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center text-4xl md:text-5xl font-sans mb-12 md:mb-16 ">
          Waar wij in geloven
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gradient-to-r from-primaryBlue to-primaryPurple rounded-xl p-6 text-white space-y-4"
            >
              <feature.icon className="w-8 h-8 text-primaryPurple" />
              <h3 className="font-serif text-xl text-primaryPurple">
                {feature.title}
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
