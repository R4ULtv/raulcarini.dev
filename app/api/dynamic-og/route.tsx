import ImageResponse from "@takumi-rs/image-response";

import ChillTime from "@/components/svg/artworks/chill-time";
import PlanningATrip from "@/components/svg/artworks/planning-a-trip";
import Christmas from "@/components/svg/artworks/christmas";
import Summer from "@/components/svg/artworks/summer";

import Moon from "@/components/svg/artworks/moon";

import { getAllPosts } from "@/lib/content";

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") || "Raul Carini";
  const description = searchParams.get("description") || "Full-Stack Developer";

  const month = new Date().getMonth();
  let ArtworkComponent;

  if (month === 11 || month === 0) {
    ArtworkComponent = Christmas;
  } else if (month >= 5 && month <= 7) {
    ArtworkComponent = Summer;
  } else {
    ArtworkComponent = Math.random() < 0.5 ? ChillTime : PlanningATrip;
  }

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          position: "relative",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          color: "#18181b", // zinc-900
          padding: "4rem",
          backgroundColor: "#e4e4e7", // zinc-200
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "16px",
            marginBottom: "12px",
            color: "#18181b",
          }}
        >
          <Moon style={{ fill: "#18181b", width: 64, height: 64 }} />
          {searchParams.get("title") && searchParams.get("description") && (
            <span
              style={{
                fontSize: 56,
                fontWeight: 600,
              }}
            >
              Raul Carini
            </span>
          )}
        </div>
        <p
          style={{
            fontWeight: 800,
            fontSize: 84,
            textOverflow: "ellipsis",
            lineClamp: 2,
            marginTop: "0.5em",
            marginBottom: "0.5em",
          }}
        >
          {title}
        </p>
        <span
          style={{
            fontSize: 48,
            color: "#27272a", // zinc-800
            fontWeight: 500,
            lineClamp: 2,
            textOverflow: "ellipsis",
          }}
        >
          {description}
        </span>
        {!searchParams.get("title") && !searchParams.get("description") && (
          <ArtworkComponent
            style={{
              width: 352,
              height: 352,
              position: "absolute",
              bottom: "2rem",
              right: "2rem",
            }}
          />
        )}
      </div>
    ),
    {
      width: 1200,
      height: 630,
      format: "WebP",
    },
  );
}
