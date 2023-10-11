import './App.css';
import SearchResults from './components/searchResults/searchResults';
import data from "./testData.json"
import Playlist from './components/playlist/playlist';
import { useState } from 'react';

function App() {

  const [playlist, setPlaylist] = useState([])

  const addTrackToPlaylist = (track) => {
    const newTrack = { ...track, id: Date.now() };
    setPlaylist((prev) => [...prev, newTrack])
  }

  const removeTrackFromPlaylist = (track) => {
    setPlaylist((prev) => prev.filter((t) => t.id !== track.id))
  }

  return (
    <div className="App">
      <header className="App-header">
        <h2>SearchResults</h2>
        <SearchResults
          onClickFunction={addTrackToPlaylist}
          tracks={data}
        />
        <h2>Playlist</h2>
        <Playlist
          tracks={playlist}
          onClickFunction={removeTrackFromPlaylist}
        />
      </header>
    </div>
  );
}

export default App;
