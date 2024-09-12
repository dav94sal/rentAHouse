import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

function SpotTile({ spot }) {

  return (
    <div className="spot-tile-container">
      <Link to={`/spots/${spot.id}`}>
        <img src={spot.previewImage}/>

        <div className="spot-info">
          <p>{`${spot.city}, ${spot.state}`}</p>
          <p><FaStar /> {spot.avgRating}</p>
        </div>

        <p>{`$${spot.price} / night`}</p>
      </Link>
    </div>
  )
}
 export default SpotTile;
