const clientId = '7e5e326aa2c7430baf87da02c59acbbb';
const redirectUri = 'https://eclectic-crisp-b9decf.netlify.app';

const Spotify = {
  // Function to initiate Spotify's Authorization Code Flow
  // with the required permissions (scopes)
  authorizeAccessToken() {
    const scope = 'user-read-private user-read-email playlist-modify-private playlist-modify-public';
    const url = `https://accounts.spotify.com/authorize?response_type=token&client_id=${encodeURIComponent(clientId)}&scope=${encodeURIComponent(scope)}&redirect_uri=${encodeURIComponent(redirectUri)}`;
    window.location.href = url;
  },

  // Function to retrieve the access token from the URL
  getAccessTokenFromUrl() {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const token = params.get('access_token');
    return token;
  },

  // Function to search for tracks on Spotify
  // using the given query and access token
  async searchTracks(query, accessToken) {
    const headers = {
      Authorization: `Bearer ${accessToken}`
    };
    const searchUrl = `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track`;

    return fetch(searchUrl, { headers })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        const tracks = data.tracks.items;
        const nextPage = data.tracks.next;
        console.log(nextPage)
        return tracks;
      })
      .catch(error => {
        console.error(error);
      });
  },

  // Function to create a new playlist on Spotify 
  // with the given name and access token
  createPlaylist(accessToken, playlistName) {
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    };

    const body = {
      "name": playlistName,
      "description": "New playlist description",
      "public": false
    };
    let user_id = "alecsears";
    const playlistUrl = `https://api.spotify.com/v1/users/${encodeURIComponent(user_id)}/playlists`;

    return fetch(playlistUrl, {
      method: "POST",
      body: JSON.stringify(body),
      headers: headers
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        const playlist = data;
        return playlist;
      });
  },

  // Function to add tracks to an existing Spotify playlist
  // with the given ID, using an array of track URIs and access token
  addTracksToPlaylist(playlistId, playlistUris, accessToken) {
    const headers = {
      Authorization: `Bearer ${accessToken}`
    };
    const body = {
      "uris": playlistUris,
    }

    const playlistUrl = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
    return fetch(playlistUrl, {
      method: "POST",
      body: JSON.stringify(body),
      headers: headers
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        const playlist = data;
        return playlist;
      });
  }
};

export default Spotify;
