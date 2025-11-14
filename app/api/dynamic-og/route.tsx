import ImageResponse from "@takumi-rs/image-response";

import ChillTime from "@/components/svg/artworks/chill-time";
import Christmas from "@/components/svg/artworks/christmas";
import Summer from "@/components/svg/artworks/summer";

import Moon from "@/components/svg/artworks/moon";
import { NextResponse } from "next/server";

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
    ArtworkComponent = ChillTime;
  }

  const imageResponse = new ImageResponse(
    (
      <div tw="flex flex-col relative w-full h-full p-16 text-primary bg-zinc-200">
        <div tw="flex items-center gap-4 mb-3">
          <Moon style={{ width: 64, height: 64 }} />
          {searchParams.get("title") && searchParams.get("description") && (
            <span tw="text-[56px] font-semibold">Raul Carini</span>
          )}
        </div>
        <p tw="font-extrabold text-[84px] text-ellipsis mt-[0.5em] mb-[0.5em]">
          {title}
        </p>
        <span tw="font-medium text-[48px] text-ellipsis text-zinc-800">
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
  return new NextResponse(imageResponse.body, {
    headers: {
      "Content-Type": "image/webp",
      "Cache-Control":
        "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
