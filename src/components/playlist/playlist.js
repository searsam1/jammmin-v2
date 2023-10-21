// Importing the TrackList component
import TrackList from "../tracklist/tracklist";
// Importing the CSS file for styling
import "./playlist.css";

// Playlist component to display the playlist of tracks
function Playlist(props) {
    // Destructuring the props to extract the needed data
    const { tracks, onClickFunction, playlistName } = props;
    console.log(playlistName)
    // If tracks are provided, render the TrackList component with the tracks and the onClickFunction
    if (tracks) {
        return (
            <div className="playlist">
                <TrackList 
                    tracks={tracks}
                    onClickFunction={onClickFunction}
                />
            </div>
        );
    }

    // If no tracks are provided, render nothing
    return null;
}

// Exporting the Playlist component
export default Playlist;
