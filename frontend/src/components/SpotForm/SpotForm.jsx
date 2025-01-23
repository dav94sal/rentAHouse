import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getAllSpots, postSpot, updateSpot } from '../../store/spots';
import { addUserSpot, getUserSpots } from '../../store/session';
import './SpotForm.css';
import { useSession } from '../../context/sessionContext';

function SpotForm({isNewSpot}) {
  const { spotId } = useParams()
  const currSpot = useSelector(state => state.spots.current[spotId]);
  const { setHasSpots } = useSession();
  // const [isLoading, setIsLoading] = useState();
  const [country, setCountry] = useState(currSpot? currSpot.country : '');
  const [address, setAddress] = useState(currSpot? currSpot.address : '');
  const [city, setCity] = useState(currSpot? currSpot.city : '');
  const [state, setState] = useState(currSpot? currSpot.state : '');
  const [latitude, setLatitude] = useState(currSpot? currSpot.lat : '');
  const [longitude, setLongitude] = useState(currSpot? currSpot.lng : '');
  const [description, setDescription] = useState(currSpot? currSpot.description : '');
  const [name, setName] = useState(currSpot? currSpot.name : '');
  const [price, setPrice] = useState(currSpot? currSpot.price : '');
  const [preview, setPreview] = useState('');
  const [img2, setImg2] = useState('');
  const [img3, setImg3] = useState('');
  const [img4, setImg4] = useState('');
  const [img5, setImg5] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isNewSpot) {
      dispatch(getUserSpots())
    }
    // console.log(errors)
  }, [dispatch, isNewSpot, errors]);

  const buildData = () => {
    const images = { 1: {url: preview, preview: true} };
    const imgArr = [img2, img3, img4, img5];

    imgArr.forEach((img, i) => {
      if (img) {images[i + 2] = {url: img, preview: false}}
    });

    const spotObj = {
      spot: {
        country,
        address,
        city,
        state,
        lat: latitude,
        lng: longitude,
        name,
        description,
        price,
      },
      images
    }

    return spotObj;
  }


  const formatError = (type) => {
    if (errors[type]) {
      return errors[type].slice(0, 1).toUpperCase() + errors[type].slice(1)
    }
  }

  const validateData = (spotObj) => {
    const validations = {};
    const spotData = Object.entries(spotObj.spot);

    spotData.forEach(el => {
      if (el[0] === 'description' && el[1].length < 30) {
        return validations[el[0]] = "Description needs 30 or more characters"
      }
      if (el[1] === '') {
        return validations[el[0]] = `${el[0]} is required`
      }
    })

    if (!preview && isNewSpot) validations.preview = "Preview image is required";
    const imageData = Object.entries(spotObj.images);

    imageData.forEach(img => {
      const url = img[1].url
      // console.log(url)
      if (
        isNewSpot &&
        !url.endsWith('.png') &&
        !url.endsWith('.jpg') &&
        !url.endsWith('.jpeg')
      ) {
          validations[`img${img[0]}`] = `Image URL must end in .png, .jpg, or .jpeg`
        }
    })

    const err = Object.keys(validations);
    if (err.length === 0) return true
    else {
      setErrors(validations);
      return false;
    }
  }

  const handleSubmit = async e => {
    e.preventDefault();

    const spotObject = buildData();
    const valid = validateData(spotObject);

    setHasSubmitted(true);

    let response;

    // state.spots.current slice of state is in wrong format
    // after dispatch
    if (valid) {
      isNewSpot?
        response = await dispatch(postSpot(spotObject)) :
        response = await dispatch(updateSpot(spotObject, currSpot.id))
      console.log("response", spotId)
      await dispatch(addUserSpot(spotId))
      await dispatch(getAllSpots())
      // await dispatch(getSpotDetails(spotId))
      setHasSpots(true)
      navigate(`/spots/${response.id}`)
    }

  }

  return (
    <div className='spot-form-container'>

      <div className='header container'>
        <h1>
          {isNewSpot? "Create a new Spot" : "Update your Spot"}

        </h1>
        <h2>Where&apos;s your place located?</h2>
        <p>
          Guests will only get your exact address once they booked a reservation
        </p>
      </div>

      <div className='location container'>
        <div className='location-label'>
          <label htmlFor='country'>
            {`Country `}
          </label>
          <p className='errors'>
            {hasSubmitted? formatError('country') : ''}
          </p>
        </div>
        <input
          name='country'
          type='text'
          placeholder='Country'
          value={country}
          onChange={e => setCountry(e.target.value)}
        />

        <div className='location-label'>
          <label>
            Street Address
          </label>
          <p className='errors'>
            {hasSubmitted? formatError('address') : ''}
          </p>
        </div>
        <input
          type='text'
          placeholder='Address'
          value={address}
          onChange={e => setAddress(e.target.value)}
        />

        <div className='city-state'>
          <div className='location-label city-header'>
            <label className='city'>
              City
            </label>
            <p className='errors'>
              {hasSubmitted? formatError('city') : ''}
            </p>
          </div>
          <input
            className='special-input'
            type='text'
            placeholder='City'
            value={city}
            onChange={e => setCity(e.target.value)}
          />
          <p id='comma'> , </p>

          <div className='location-label state'>
            <label >
              State
            </label>
            <p className='errors'>
              {hasSubmitted? formatError('state') : ''}
            </p>
          </div>
          <input
            className='special-input state-input'
            type='text'
            placeholder='State'
            value={state}
            onChange={e => setState(e.target.value)}
          />
        </div>

        <div className='lat-lng'>
          <div className='location-label'>
            <label>
              Latitude
            </label>
            <p className='errors'>
              {hasSubmitted? formatError('lat') : ''}
            </p>
          </div>
          <input
            className='special-input lat-input'
            type='text'
            placeholder='Latitude'
            value={latitude}
            onChange={e => setLatitude(e.target.value)}
          />
          <p id='comma'>,</p>
          <div className='location-label state'>
            <label>
              Longitude
            </label>
            <p className='errors'>
              {hasSubmitted? formatError('lng') : ''}
            </p>
          </div>
          <input
            className='special-input'
            type='text'
            placeholder='Longitude'
            value={longitude}
            onChange={e => setLongitude(e.target.value)}
          />
        </div>
      </div>

      <div className='description container'>
        <h2>Describe your place to guests</h2>

        <p>
          Mention the best features of your space,
          any special amentities like fast wifi or parking,
          and what you love about the neighborhood.
        </p>

        <textarea
          id='input-description'
          type='textarea'
          placeholder='Please write at least 30 characters'
          value={description}
          onChange={e => setDescription(e.target.value)}
        >
        </textarea>

        <p className='errors'>
          {hasSubmitted? formatError('description') : ''}
        </p>
      </div>

      <div className='create-name container'>
        <h2>Create a title for your spot</h2>

        <p>
          Catch guests&apos; attention with a spot title that highlights what makes
          your place special..
        </p>

        <input
          type='text'
          placeholder='Name of your spot'
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <p className='errors'>
          {hasSubmitted? formatError('name') : ''}
        </p>
      </div>

      <div className='pricing container'>
        <h2>Set a base price for your spot</h2>

        <p>
          Competitive pricing can help your listing stand out and rank higher
          in search results.
        </p>

        <div className='dollar-sign'>
          <p>$</p>
          <input
            type='text'
            placeholder='Price per night (USD)'
            value={price}
            onChange={e => setPrice(e.target.value)}
          />
        </div>

        <p className='errors'>
          {hasSubmitted? formatError('price') : ''}
        </p>
      </div>

      {
        isNewSpot &&
        <div className='add-photos container'>
          <h2>Liven up your spot with photos</h2>

          <p>
            Submit a link to at least one photo to publish your spot.
          </p>

          <input
            type='text'
            placeholder='Preview Image URL'
            value={preview}
            onChange={e => setPreview(e.target.value)}
            />

          <p className='errors'>
            {hasSubmitted? errors.preview : ''}
          </p>

          <input
            type='text'
            placeholder='Image URL'
            value={img2}
            onChange={e => setImg2(e.target.value)}
            />

          <p className='errors'>
            {hasSubmitted? '': errors.img2}
          </p>

          <input
            type='text'
            placeholder='Image URL'
            value={img3}
            onChange={e => setImg3(e.target.value)}
            />

          <input
            type='text'
            placeholder='Image URL'
            value={img4}
            onChange={e => setImg4(e.target.value)}
            />

          <input
            type='text'
            placeholder='Image URL'
            value={img5}
            onChange={e => setImg5(e.target.value)}
            />
        </div>
      }

      <div className='submit container'>
        <button
          className='submit-button'
          type='submit'
          onClick={handleSubmit}
          >
          {isNewSpot? "Create Spot" : "Update Spot"}
        </button>
      </div>
    </div>
  )
}

export default SpotForm;
