import Track from "../track/track"
import "./tracklist.css"

function TrackList(props) {
  const { tracks = [], onClickFunction } = props;
  return (
    <>
      {tracks.map((track) => (
        <li className="tracks" key={track.id}>
          <Track
            id={track.id}
            songName={track.name}
            artist={track.artists[0].name}
            album={track.album.name}
            onClickFunction={() => onClickFunction(track)}
            uri={track.uri}
          />
        </li>
      ))}
    </>
  );
}

  

export default TrackList
