function Track(props) {
  const { id, songName, album, artist, onClickFunction, uri } = props;

  const handleClick = () => {
    // Construct the track object
    const track = { id, songName, album, artist, uri };    
    // Call the onClickFunction with the track object
    onClickFunction(track);
  };

  return (
    <>
      <p onClick={handleClick}>
        {songName} - {artist} - {album}
      </p>
    </>
  );
}

export default Track;

