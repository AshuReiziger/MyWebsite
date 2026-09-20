import Image from "next/image";
import type { CSSProperties } from "react";

interface Client {
  name: string;
  src: string;
  width: number;
  height: number;
}

const CLIENTS: Client[] = [
  { name: "BlueMoon Outsourcing & Consulting", src: "/images/clients/bluemoon.png", width: 1560, height: 585 },
  { name: "Lead from the Heart", src: "/images/clients/lead-from-the-heart.png", width: 982, height: 528 },
  { name: "Royalty World", src: "/images/clients/royalty-world.png", width: 1576, height: 478 },
  { name: "Blissful Travels", src: "/images/clients/blissful-travels.png", width: 1370, height: 528 },
  { name: "KinkyMe", src: "/images/clients/kinkyme.png", width: 1457, height: 478 },
  { name: "Maverick Arts & Architecture", src: "/images/clients/maa.png", width: 1662, height: 482 },
  { name: "Nuriel Mercy Care", src: "/images/clients/nuriel-mercy.png", width: 453, height: 557 },
  { name: "Nutribox", src: "/images/clients/nutribox.png", width: 569, height: 577 },
  { name: "Orbit Interiors", src: "/images/clients/orbit-interiors.png", width: 1286, height: 478 },
  { name: "Safe Haven for Nature", src: "/images/clients/safe-haven-for-nature.png", width: 1460, height: 618 },
  { name: "TEEF Holistic Care", src: "/images/clients/teef.png", width: 594, height: 600 },
  { name: "Ubique Immigration Quest", src: "/images/clients/ubique.png", width: 1644, height: 533 },
  { name: "Felas Vestures", src: "/images/clients/felas-vestures.png", width: 625, height: 736 },
  { name: "HRMS", src: "/images/clients/hrms.png", width: 1495, height: 464 },
  { name: "KMHP", src: "/images/clients/kmhp.png", width: 426, height: 662 },
  { name: "L AND J Construction", src: "/images/clients/l-and-j-construction.png", width: 1628, height: 528 },
  { name: "RVTC", src: "/images/clients/rvtc.png", width: 501, height: 762 },
];

function LogoStrip({ items }: { items: Client[] }) {
  // Doubled so the strip can loop seamlessly (the CSS animation translates
  // exactly -50%, landing back on the same visual frame it started from).
  const track = [...items, ...items];
  // Keeps per-logo scroll speed roughly consistent across strips of
  // different lengths (e.g. the full desktop row vs. each mobile half).
  const durationSeconds = items.length * 3;

  return (
    <div
      className="animate-marquee flex w-max items-center gap-16"
      style={{ "--marquee-duration": `${durationSeconds}s` } as CSSProperties}
    >
      {track.map((client, i) => (
        <Image
          key={`${client.name}-${i}`}
          src={client.src}
          alt=""
          width={client.width}
          height={client.height}
          className="h-8 w-auto shrink-0 opacity-70 transition-opacity hover:opacity-100"
        />
      ))}
    </div>
  );
}

export function ClientLogos() {
  const half = Math.ceil(CLIENTS.length / 2);
  const firstHalf = CLIENTS.slice(0, half);
  const secondHalf = CLIENTS.slice(half);

  return (
    <div className="overflow-hidden">
      <span className="sr-only">Trusted by {CLIENTS.map((client) => client.name).join(", ")}</span>
      <div aria-hidden="true">
        <div className="hidden md:block">
          <LogoStrip items={CLIENTS} />
        </div>
        <div className="flex flex-col gap-8 md:hidden">
          <LogoStrip items={firstHalf} />
          <LogoStrip items={secondHalf} />
        </div>
      </div>
    </div>
  );
}
