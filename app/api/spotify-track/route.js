import SpotifyWebApi from 'spotify-web-api-node';

   const spotifyApi = new SpotifyWebApi();

   export async function GET(req) {
     try {
       const { searchParams } = new URL(req.url);
       const url = searchParams.get('url');
       console.log('URL:', url);
       if (!url) {
         return Response.json({ error: 'No URL provided' }, { status: 400 });
       }

       //gets the track id
       const trackId = url.split('/track/')[1]?.split('?')[0];
       if (!trackId || trackId.length !== 22) {
         return Response.json({ error: 'Invalid track ID format' }, { status: 400 });
       }

       const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
       const tokenResponse = await fetch(baseUrl+'/api/spotify-token', {
         cache: 'no-store',
         headers: { 'Accept': 'application/json' }
       });
       console.log('response url= ',tokenResponse.url);
       if (!tokenResponse.ok) {
         const errorText = await tokenResponse.text();
         console.error('Token Fetch Error:', errorText);
         return Response.json({ error: 'Failed to get token', details: errorText }, { status: tokenResponse.status });
       }

       const tokenData = await tokenResponse.json();
       if (tokenData.error) {
         return Response.json({ error: 'Failed to get token' }, { status: 500 });
       }

       spotifyApi.setAccessToken(tokenData.accessToken);
       const data = await spotifyApi.getTrack(trackId);
       const track = data.body;

       return Response.json({
         title: track.name,
         artist: track.artists[0].name,
         coverArt: track.album.images[0]?.url || '',
       });
     } catch (error) {
       console.error('Track Error:', error.message, error.cause);
       return Response.json({ error: 'Failed to fetch track data', details: error.message }, { status: 500 });
     }
   }