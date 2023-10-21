import './App.css';
import SearchResults from './components/searchResults/searchResults';
import Playlist from './components/playlist/playlist';
import Spotify from './components/spotify/spotify';
import { useState, useEffect } from 'react';

function App() {
  // State variables to manage the playlist, playlist name, search results, search query, and Spotify access token
  const [playlist, setPlaylist] = useState([]);
  const [playlistName, setPlaylistName] = useState("Playlist Name");
  const [tracks, setTracks] = useState([]);
  const [searchQuery, setsSearchQuery] = useState("Drake");
  const [token, setToken] = useState(null);

  // Function to add a track to the playlist if it's not already present
  const addTrackToPlaylist = (track) => {
    if (!playlist.includes(track)) {
      setPlaylist((prev) => [...prev, track]);
    }
  };

  // Function to remove a track from the playlist
  const removeTrackFromPlaylist = (track) => {
    setPlaylist((prev) => prev.filter((t) => t.id !== track.id));
  }

  // Function to retrieve the URIs of tracks in the playlist
  const getPlaylistUris = () => {
    return playlist.map((track) => track.uri);
  }

  // Function to create a playlist in Spotify and add tracks to it
  const saveToSpotify = (e) => {
    e.preventDefault();

    // Check if playlistName is not empty before making the request
    if (playlistName.trim() !== '') {
      Spotify.createPlaylist(token, playlistName)
        .then(newPlaylist => {
          const playlistId = newPlaylist.id;
          const trackUris = getPlaylistUris();

          Spotify.addTracksToPlaylist(playlistId, trackUris, token)
            .then(data => {
              console.log("Tracks added to playlist:", data);
              setPlaylistName("");
              setPlaylist([]);
            })
            .catch(error => {
              console.error("Error adding tracks to playlist:", error);
            });
        })
        .catch(error => {
          console.error(error);
        });
    }
  }

  // Function to get the Spotify access token
  const getAccessToken = () => {
    if (!token) {
      Spotify.authorizeAccessToken();
    }
  }

  // Function to search Spotify for tracks based on the search query
  const searchSpotify = () => {
    getAccessToken();

    if (token && searchQuery.trim() !== '') {
      Spotify.searchTracks(searchQuery, token)
        .then(tracks => {
          setTracks(tracks);
        })
        .catch(error => {
          console.error(error);
        });
    }
    setsSearchQuery('');
  }

  // useEffect hook to get the Spotify access token from the URL
  useEffect(() => {
    const accessToken = Spotify.getAccessTokenFromUrl();

    if (accessToken) {
      setToken(accessToken);

      // Remove the access token from the URL
      window.history.replaceState(null, null, window.location.pathname);
    }
  }, []);

  // Event handler for the Enter key press
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      searchSpotify();
    }
  }

  // Render the component
  return (
    <>
      <div className='searchDiv'>
        <input
          value={searchQuery}
          className='searchBar'
          onChange={({ target }) => setsSearchQuery(target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          disabled={token ? false : true}
          className='searchSpotifyBtn'
          onClick={() => searchSpotify()}
        >
          Search Spotify
        </button>
        <button
          disabled={token ? true : false}
          className='searchSpotifyBtn'
          onClick={() => getAccessToken()}
        >
          {token ? "Logged In" : "Log in to Spotify"}
        </button>
      </div>
      <div className="App">
        <div>
          <p className='h2'>Search Results</p>

          {tracks.length > 0 && (
            <SearchResults
              tracks={tracks}
              onClickFunction={addTrackToPlaylist}
            />
          )}
        </div>
        <div>
          <center>
            <input
              onChange={({ target }) => setPlaylistName(target.value)}
              placeholder={playlistName}
              className='h2'
            />
          </center>
          <Playlist
            tracks={playlist}
            onClickFunction={removeTrackFromPlaylist}
            playlistName={playlistName}
          />
        </div>
      </div>
      <center>
        <form onSubmit={saveToSpotify}>
          <button
            type='submit'
            className='saveToSpotifyBtn'
          >
            Save Playlist To Spotify
          </button>
        </form>
      </center>
    </>
  );
}

export default App;
