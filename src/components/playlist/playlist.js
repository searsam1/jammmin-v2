import TrackList from "../tracklist/tracklist"
import "./playlist.css"

function Playlist(props) {
    const { tracks, onClickFunction, playlistName } = props
    if (tracks) {
        return (
            <div className="playlist">
                {playlistName}
                <TrackList
                    tracks={tracks}
                    onClickFunction={onClickFunction}
                />
            </div>
        )
    }
    return null;
}



export default Playlist