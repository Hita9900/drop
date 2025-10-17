import SpotifyWebApi from 'spotify-web-api-node';

let accessToken = null;
let tokenExpiry = null;

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

export async function GET() {
  try {
    if (!accessToken || Date.now() >= tokenExpiry) {
      const data = await spotifyApi.clientCredentialsGrant();
      accessToken = data.body.access_token;
      tokenExpiry = Date.now() + data.body.expires_in * 1000;
      spotifyApi.setAccessToken(accessToken);
    }
    return Response.json({ accessToken });
  } catch (error) {
    return Response.json({ error: 'Failed to fetch token', error }, { status: 500 });
  }
}