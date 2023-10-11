import Track from "../track/track"
import "./tracklist.css"

function TrackList(props) {
    const { tracks, onClickFunction } = props
    return (
        <>{
            tracks.map(({ id, songName, artist, album }) =>
            (<li
                className="tracks"
                key={id}>
                <Track
                    id={id}
                    songName={songName}
                    artist={artist}
                    album={album}
                    onClickFunction={onClickFunction}
                />
            </li>)
            )
        }</>
    )
}

export default TrackList
