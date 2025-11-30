// app/api/spotify-track/route.ts

import SpotifyWebApi from 'spotify-web-api-node';
const spotifyApi = new SpotifyWebApi();

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const url = searchParams.get('url');

    if (!url) {
      return Response.json({ error: 'No URL provided' }, { status: 400 });
    }

    const trackId = url.split('/track/')[1]?.split('?')[0];
    if (!trackId || trackId.length !== 22) {
      return Response.json({ error: 'Invalid Spotify track URL' }, { status: 400 });
    }

    // Fetch fresh token
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const tokenRes = await fetch(`${baseUrl}/api/spotify-token`, { cache: 'no-store' });
    if (!tokenRes.ok) throw new Error('Failed to get token');
    const { accessToken } = await tokenRes.json();
    spotifyApi.setAccessToken(accessToken);

    // Get track + album info
    const trackData = await spotifyApi.getTrack(trackId);
    const track = trackData.body;

    const mainArtistId = track.artists[0].id;

    // Get artist for genres
    const artistData = await spotifyApi.getArtist(mainArtistId);
    const rawGenres = artistData.body.genres; // ← these come lowercase + no spaces

    // Format genres: "metalcore, djent, progressive metalcore"
    const formattedGenres = rawGenres
      .map((g) =>
        g
          .split(/[\s-_]+/)           // split on space, _, -
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')
      )
    // Get release year from album release_date
    // Spotify gives: "2023-05-12" or sometimes just "2023"
    const releaseDate = track.album.release_date;
    const year = releaseDate?.split('-')[0] || null;

    return Response.json({
      title: track.name,
      artist: track.artists[0].name,
      track_Id: trackId,
      year: year ? Number(year) : null, 
      genres: formattedGenres || null,
      duration_ms: track.duration_ms,
      coverArt: track.album.images[0]?.url || null,
      preview_url: track.preview_url,
    });

  } catch (error) {
    console.error('Spotify error:', error);
    return Response.json(
      { error: 'Failed to fetch track', details: error.message },
      { status: 500 }
    );
  }
}