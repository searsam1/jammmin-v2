import Track from "../track/track"
import "./tracklist.css"

function TrackList(props) {
    const { tracks, onClickFunction } = props
    return (
        <>{
            tracks.map(({ id, songName, artist, album, uri }) =>
            (<li
                className="tracks"
                key={id}>
                <Track
                    id={id}
                    songName={songName}
                    artist={artist}
                    album={album}
                    onClickFunction={onClickFunction}
                    uri={uri}
                />
            </li>)
            )
        }</>
    )
}

export default TrackList
