import spotifyUrlInfo from "spotify-url-info";

const getData = spotifyUrlInfo(fetch).getPreview;


export async function POST(req) {

  try {
    const { url } = await req.json();
    if (!url) {
      return Response.json(
        { error: "missing spotify URL" },
        { status: 400 }
      );
    }
    const preview = await getData(url);
    return Response.json(preview);
  } catch (err) {
    console.error("spotify api error", err);
    return Response.json(
      { error: err.message || "internal server error , could not fetch data" },
      {status : 500}
    )
  }
}