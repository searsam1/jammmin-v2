import TrackList from "../tracklist/tracklist"
import "./searchResults.css"

function SearchResults(props) {
    const {tracks, onClickFunction} = props
    return (
        <div className="searchResults">
            <TrackList 
            tracks={tracks}
            onClickFunction={onClickFunction}
            />
        </div>
    )
}

export default SearchResults