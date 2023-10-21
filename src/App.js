import './App.css';
import SearchResults from './components/searchResults/searchResults';
import Playlist from './components/playlist/playlist';
import Spotify from './components/spotify/spotify';
import { useState, useEffect } from 'react';

function App() {
  const [playlist, setPlaylist] = useState([])
  const [playlistName, setPlaylistName] = useState("Playlist Name")
  const [tracks, setTracks] = useState([])
  const [searchQuery, setsSearchQuery] = useState("Drake")
  const [token, setToken] = useState(null)


  const addTrackToPlaylist = (track) => {
    if (playlist.includes(track)) {
      return
    }
    setPlaylist((prev) => [...prev, track]);
  };

  const removeTrackFromPlaylist = (track) => {
    setPlaylist((prev) => prev.filter((t) => t.id !== track.id))
  }

  const saveToSpotify = (e) => {
    e.preventDefault();
    const trackURIs = playlist.map(track => track.uri);
    alert(trackURIs)
    setPlaylist([]);
    setPlaylistName("");
  }
  function getAccessToken() {
    if (!token) {
      Spotify.authorizeAccessToken();
    }
  }


  function searchSpotify() {
    getAccessToken()
    if (token) {
      Spotify.searchTracks(searchQuery, token)
        .then(tracks => {
          setTracks(tracks)
        })
        .catch(error => {
          console.error(error);
        });
    }
    setsSearchQuery('')
  }

  useEffect(() => {
    const accessToken = Spotify.getAccessTokenFromUrl();

    if (accessToken) {
      setToken(accessToken);

      // Remove the access token from the URL
      window.history.replaceState(null, null, window.location.pathname);
    }
  }, []);



  return (
    <>
      <div className='searchDiv'>
        <input
          value={searchQuery}
          className='searchBar'
          onChange={({ target }) =>
            setsSearchQuery(target.value)} />
        <button
          disabled={token ? false : true}
          className='searchSpotifyBtn'
          onClick={() => searchSpotify()}>
          Search Spotify
        </button>
        <button
          disabled={token ? true : false}
          className='searchSpotifyBtn'
          onClick={() =>
            getAccessToken()}>
          {token ? "Logged In" : "Log in to Spotify"}
        </button>
      </div>
      <div className="App">
        <div>
          <p className='h2'>Search Results</p>

          {tracks.length > 0 && (
            <SearchResults
              tracks={tracks}
              onClickFunction={addTrackToPlaylist} />
          )}
        </div>
        <div>
          <center>
            <input
              onChange={({ target }) => setPlaylistName(target.value)}
              placeholder={playlistName} className='h2'
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
            className='saveToSpotifyBtn'>
            Save Playlist To Spotify
          </button>
        </form>
      </center>
    </>
  );
}

export default App;