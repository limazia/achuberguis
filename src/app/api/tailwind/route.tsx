import { ImageResponse } from "@vercel/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
        }}
      >
        <div tw="w-card h-card border-2 border-red-500 p-4 bg-gray-100 flex">
          <div className="w-card h-card border-[3px] border-black p-4">
            aaa
          </div>
        </div>
      </div>
    ),
    {
      width: 775,
      height: 269,
    }
  );
}
