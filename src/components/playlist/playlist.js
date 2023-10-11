import TrackList from "../tracklist/tracklist"
import "./playlist.css"

function Playlist(props) {
    const { tracks, onClickFunction } = props
    if (tracks) {
        return (
            <div className="playlist">
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