import { ImageResponse } from "next/og";

export const alt =
  "Dye Capture, a student research study on carbon-alginate beads for textile dye removal";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        overflow: "hidden",
        background: "#F4EFE5",
        color: "#1F211F",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          width: 468,
          display: "flex",
          background: "#DCE9EA",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 52,
          left: 64,
          bottom: 52,
          width: 8,
          display: "flex",
          background: "#1F6F78",
        }}
      />

      <div
        style={{
          width: 744,
          height: "100%",
          padding: "58px 64px 52px 100px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              color: "#164C53",
              fontSize: 20,
              fontWeight: 700,
              letterSpacing: 4.5,
              textTransform: "uppercase",
            }}
          >
            Dye Capture
          </div>

          <div
            style={{
              display: "flex",
              maxWidth: 610,
              marginTop: 42,
              fontSize: 68,
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: -3.5,
            }}
          >
            Carbon-alginate bead research
          </div>

          <div
            style={{
              display: "flex",
              maxWidth: 590,
              marginTop: 30,
              color: "#4C504B",
              fontSize: 25,
              lineHeight: 1.42,
            }}
          >
            Uncoated carbon-alginate beads at 20% carbon removed 84% of Reactive
            Blue 140. A chitosan coating cut that to 41%.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            color: "#4C504B",
            fontSize: 18,
            fontWeight: 600,
          }}
        >
          <span>The University of Texas at Austin · College of Natural Sciences</span>
          <span
            style={{
              width: 42,
              height: 1,
              margin: "0 16px",
              background: "#9E9A91",
            }}
          />
          <span>Reactive Blue 140</span>
        </div>
      </div>

      <svg
        width="440"
        height="440"
        viewBox="0 0 440 440"
        style={{ position: "absolute", top: 94, right: 14 }}
        aria-hidden="true"
      >
        <circle cx="220" cy="220" r="181" fill="#EBE4D8" stroke="#1F6F78" strokeWidth="3" />
        <path
          d="M39 244C102 204 151 270 218 235C286 200 334 255 401 219V332C364 377 300 401 220 401C140 401 77 377 39 332V244Z"
          fill="#1F6F78"
        />
        <path
          d="M44 251C105 216 151 277 220 243C286 211 337 261 395 231"
          fill="none"
          stroke="#F4EFE5"
          strokeWidth="7"
          strokeLinecap="round"
        />
        <circle cx="222" cy="184" r="79" fill="#1F211F" />
        <circle cx="195" cy="155" r="10" fill="#5B929B" />
        <circle cx="244" cy="147" r="7" fill="#DCE9EA" />
        <circle cx="257" cy="192" r="12" fill="#1F6F78" />
        <circle cx="205" cy="211" r="8" fill="#DCE9EA" />
        <circle cx="237" cy="226" r="5" fill="#5B929B" />
        <circle cx="316" cy="112" r="23" fill="#1F6F78" />
        <circle cx="344" cy="155" r="10" fill="#5B929B" />
      </svg>

      <div
        style={{
          position: "absolute",
          right: 66,
          bottom: 56,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          color: "#F4EFE5",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 68,
            fontWeight: 700,
            lineHeight: 1,
            letterSpacing: -3,
          }}
        >
          84%
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 7,
            fontSize: 15,
            fontWeight: 700,
            letterSpacing: 2.6,
            textTransform: "uppercase",
          }}
        >
          Highest removal
        </div>
      </div>
    </div>,
    size,
  );
}
