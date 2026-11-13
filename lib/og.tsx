import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

/** Open Graph-картинка (латиница — встроенный шрифт next/og не содержит кириллицы). */
export function renderOg() {
  const dot = (left: number, top: number, size: number, color: string, radius = "50%") => (
    <div style={{ position: "absolute", left, top, width: size, height: size, background: color, borderRadius: radius }} />
  );
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 90px",
          background: "#fff8ec",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        {dot(900, 70, 190, "#ffc93c")}
        {dot(1010, 330, 120, "#4fc4b8", "40px")}
        {dot(860, 430, 90, "#ff7a66")}
        {dot(760, 210, 40, "#c7b8f2")}
        <div style={{ display: "flex", fontSize: 30, fontWeight: 700, color: "#17776e", letterSpacing: 4 }}>ZHARKENT</div>
        <div style={{ display: "flex", fontSize: 128, fontWeight: 900, color: "#2a2c33", letterSpacing: -4, marginTop: 10 }}>
          KAISAR <span style={{ color: "#c9402b", marginLeft: 28 }}>KK</span>
        </div>
        <div style={{ display: "flex", gap: 18, marginTop: 30 }}>
          {["13", "2-5", "4x", "KZ / RU"].map((s, i) => (
            <div
              key={s}
              style={{
                display: "flex",
                padding: "14px 28px",
                borderRadius: 999,
                fontSize: 34,
                fontWeight: 800,
                color: "#2a2c33",
                background: ["#ffe9a8", "#d3f2ee", "#ffe0da", "#eee9fd"][i],
                border: "3px solid #2a2c33",
              }}
            >
              {s}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", fontSize: 30, color: "#565a66", marginTop: 34 }}>07:30 - 18:00 · +7 702 274 78 77</div>
      </div>
    ),
    ogSize,
  );
}
