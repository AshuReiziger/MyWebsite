import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import { join } from "node:path";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const svg = readFileSync(
    join(process.cwd(), "public/images/logo/reiziger-ashu-wordmark.svg"),
    "utf8"
  );
  const logoDataUri = `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0a",
        }}
      >
        <img src={logoDataUri} width={560} height={208} alt="" />
        <div
          style={{
            marginTop: 32,
            fontSize: 28,
            color: "#a1a1a1",
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          Designer. Strategist. Educator. Creative Leader.
        </div>
      </div>
    ),
    { ...size }
  );
}
