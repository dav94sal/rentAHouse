import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

function SpotTile({ spot }) {

  return (
    <Link to={`/spots/${spot.id}`}>
      <div className="spot-tile-container">
        <img src={spot.previewImage}/>

        <div className="spot-info">
          <p>{`${spot.city}, ${spot.state}`}</p>
          <p><FaStar /> {spot.avgRating}</p>
        </div>

        <p>{`$${spot.price} / night`}</p>
      </div>
    </Link>
  )
}
 export default SpotTile;
