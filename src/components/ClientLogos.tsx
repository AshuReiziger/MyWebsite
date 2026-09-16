import Image from "next/image";

const CLIENTS = [
  { name: "BlueMoon Outsourcing & Consulting", src: "/images/clients/bluemoon.png", width: 1560, height: 585 },
  { name: "Lead from the Heart", src: "/images/clients/lead-from-the-heart.png", width: 982, height: 528 },
  { name: "Royalty World", src: "/images/clients/royalty-world.png", width: 1576, height: 478 },
];

export function ClientLogos() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-16 gap-y-8">
      {CLIENTS.map((client) => (
        <Image
          key={client.name}
          src={client.src}
          alt={client.name}
          width={client.width}
          height={client.height}
          className="h-8 w-auto opacity-70 transition-opacity hover:opacity-100"
        />
      ))}
    </div>
  );
}
