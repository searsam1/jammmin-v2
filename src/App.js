import './App.css';
import SearchResults from './components/searchResults/searchResults';
import data from "./testData.json"
import Playlist from './components/playlist/playlist';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [playlist, setPlaylist] = useState([])

  const addTrackToPlaylist = (track) => {
    const newTrack = { ...track, id: uuidv4() };
    setPlaylist((prev) => [...prev, newTrack])
  }

  const removeTrackFromPlaylist = (track) => {
    setPlaylist((prev) => prev.filter((t) => t.id !== track.id))
  }

  const [playlistName, setPlaylistName] = useState("")

  const saveToSpotify = (e) => {
    e.preventDefault();

    // Generate an array of track URIs
    const trackURIs = playlist.map(track => track.uri);
    console.log(trackURIs);

    // TODO: Use the Spotify API to save the playlist

    // Reset the existing playlist
    setPlaylist([]);
    setPlaylistName("");
  }

  return (
    <div className="App">
      <header className="App-header">
        <h2>SearchResults</h2>
        <SearchResults
          onClickFunction={addTrackToPlaylist}
          tracks={data}
        />
        <h2>
          <input
            className='playlistName'
            value={playlistName}
            onChange={(({ target }) => setPlaylistName(target.value))}
          />
        </h2>
        <Playlist
          tracks={playlist}
          onClickFunction={removeTrackFromPlaylist}
          playlistName={playlistName}
        />
        <form className='saveToSpotify' onSubmit={saveToSpotify}>
          <button type="submit">Save to Spotify</button>
        </form>
      </header>
    </div>
  );
}

export default App;

