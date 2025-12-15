import Link from "next/link";

interface ServiceItemProps {
  title: string;
  description: string;
  href: string;
  iconSrc?: string;
  iconAlt: string;
  isActive: boolean;
  onClick: () => void;
}

export default function ServiceItem({
  title,
  description,
  href,
  iconSrc = "/elanto/g16.svg",
  iconAlt,
  isActive,
  onClick,
}: ServiceItemProps) {
  if (isActive) {
    return (
      <div className="bg-blue-600 rounded-lg p-6 transition-all duration-300">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 flex items-center justify-center">
            <img
              src={iconSrc}
              alt={iconAlt}
              className="w-6 h-6"
              style={{ filter: "invert(1)" }}
            />
          </div>
          <div className="flex-1">
            <h3 className="text-white text-xl font-bold mb-2">{title}</h3>
            <p className="text-white/90 text-sm mb-4 leading-relaxed">
              {description}
            </p>
            <Link href={href} className="text-white underline">
              Meer lezen →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-4 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-800 transition-all duration-300"
    >
      <img src={iconSrc} alt={iconAlt} className="w-5 h-5 mt-1" />
      <span className="font-medium">{title}</span>
    </button>
  );
}

