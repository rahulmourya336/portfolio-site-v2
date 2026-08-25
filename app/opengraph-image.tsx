import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt =
  "Rahul Mourya, full stack engineer building React and Vue front ends on Python and AWS";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #08080b 0%, #191033 55%, #08080b 100%)",
          padding: "72px",
          color: "#f5f5f7",
          fontSize: 32,
        }}
      >
        <div style={{ display: "flex", fontSize: 26, color: "#a78bfa", letterSpacing: 6 }}>
          {site.url.replace("https://", "").toUpperCase()}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 86, fontWeight: 700, lineHeight: 1.05 }}>
            Rahul Mourya
          </div>
          <div style={{ fontSize: 40, color: "#a8a8b6" }}>
            Full stack engineer. React, Vue, Python, AWS.
          </div>
        </div>
        <div style={{ display: "flex", gap: 16, fontSize: 26, color: "#8a8a9a" }}>
          <span>Projects</span>
          <span>·</span>
          <span>Blog</span>
          <span>·</span>
          <span>7+ years shipping</span>
        </div>
      </div>
    ),
    size,
  );
}
