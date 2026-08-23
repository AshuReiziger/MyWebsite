import Image from "next/image";

export function WorkImage({
  src,
  alt,
  className,
}: {
  src?: string;
  alt: string;
  className?: string;
}) {
  return (
    <div className={"relative overflow-hidden " + (className ?? "")}>
      {src && <Image src={src} alt={alt} fill className="object-cover" />}
    </div>
  );
}
