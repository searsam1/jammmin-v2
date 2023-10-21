const clientId = '7e5e326aa2c7430baf87da02c59acbbb';
const redirectUri = 'http://localhost:3000/callback';

const Spotify = {
  authorizeAccessToken() {
    const scope = 'user-read-private user-read-email';
    const url = `https://accounts.spotify.com/authorize?response_type=token&client_id=${encodeURIComponent(clientId)}&scope=${encodeURIComponent(scope)}&redirect_uri=${encodeURIComponent(redirectUri)}`;
    window.location.href = url;
  },
  getAccessTokenFromUrl() {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const token = params.get('access_token');
    return token
  },
  async searchTracks(query, accessToken) {
    // Define the headers for the request
    const headers = {
      Authorization: `Bearer ${accessToken}`
    };

    // Construct the URL for the Spotify search API
    const searchUrl = `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track`;

    // Make the fetch request to the Spotify Web API
    return fetch(searchUrl, { headers })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        const tracks = data.tracks.items;
        return tracks;
      })

      .catch(error => {
        console.error(error);
      });
  }


}

export default Spotify;
