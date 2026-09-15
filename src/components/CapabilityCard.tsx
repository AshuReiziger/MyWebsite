import Image from "next/image";

export interface Capability {
  title: string;
  description: string;
  image?: string;
}

export function CapabilityCard({
  title,
  description,
  image,
  index,
}: Capability & { index: number }) {
  return (
    <div className="group relative isolate overflow-hidden rounded-2xl border border-line p-8 transition-colors hover:border-accent/50">
      {image && (
        <>
          <Image
            src={image}
            alt=""
            fill
            className="-z-10 object-cover grayscale transition-[filter,transform] duration-700 group-hover:scale-105 group-hover:grayscale-0"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-paper/90 via-paper/75 to-paper/90" />
        </>
      )}
      <span className="block text-right text-xs font-semibold text-line">
        {String(index).padStart(2, "0")}
      </span>
      <h3 className="mt-6 font-display text-xl font-bold tracking-tight">{title}</h3>
      <p className="mt-3 text-muted">{description}</p>
    </div>
  );
}
