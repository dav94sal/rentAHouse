import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { postSpot } from '../../store/spots';
import './SpotForm.css';

function SpotForm() {
  const [country, setCountry] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [preview, setPreview] = useState('');
  const [img2, setImg2] = useState('');
  const [img3, setImg3] = useState('');
  const [img4, setImg4] = useState('');
  const [img5, setImg5] = useState('');
  const [errors, setErrors] = useState({})
  const dispatch = useDispatch()

  const handleSubmit = e => {
    e.preventDefault();

    const validations = {}
    const images = { 1: {url: preview, preview: true} };
    const imgArr = [img2, img3, img4, img5];

    if (!preview) validations.preview = "Preview image is required";

    imgArr.forEach((img, i) => {
      if (img) images[i + 2] = {url: img, preview: false};
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

    const newSpot = dispatch(postSpot(spotObj)).catch(err => validations.errors = err)
    console.log(validations)

    // if (newSpot) {
    //   <Navigate to={`/spots/${newSpot.id}`} />
    // }

    validations[newSpot.errors] = newSpot.errors

    setErrors(validations)
  }

  return (
    <div className='spot-form-container'>

      <div className='header container'>
        <h1>Create a new Spot</h1>
        <h2>Where&apos;s your place located?</h2>
        <p>
          Guests will only get your exact address once they booked a reservation
        </p>
      </div>

      <div className='location container'>
        <label htmlFor='country'>
          Country
        </label>
        <input
          name='country'
          type='text'
          placeholder='Country'
          value={country}
          onChange={e => setCountry(e.target.value)}
        />

        <label>
          Street Address
        </label>
        <input
          type='text'
          placeholder='Address'
          value={address}
          onChange={e => setAddress(e.target.value)}
        />

        <div className='city-state'>
          <label>
            City
            <input
              type='text'
              placeholder='City'
              value={city}
              onChange={e => setCity(e.target.value)}
            />
          </label>
          <p id='comma'>,</p>

          <label>
            State
            <input
              type='text'
              placeholder='State'
              value={state}
              onChange={e => setState(e.target.value)}
            />
          </label>
        </div>

        <div className='lat-lng'>
          <label>
            Latitude
            <input
              type='text'
              placeholder='Latitude'
              value={latitude}
              onChange={e => setLatitude(e.target.value)}
            />
          </label>
          <p id='comma'>,</p>
          <label>
            Longitude
            <input
              type='text'
              placeholder='Longitude'
              value={longitude}
              onChange={e => setLongitude(e.target.value)}
            />
          </label>
        </div>
      </div>

      <div className='description container'>
        <h2>Describe your place to guests</h2>

        <p>
          Mention the best features of your space,
          any special amentities like fast wifi or parking,
          and what you love about the neighborhood.
        </p>

        <input
          id='input-description'
          type='textarea'
          placeholder='Please write at least 30 characters'
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </div>

      <div className='create-name container'>
        <h2>Create a name for your spot</h2>

        <p>
          Catch guests&apos; attention with a spot name that highlights what makes
          your place special..
        </p>

        <input
          type='text'
          placeholder='Name of your spot'
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </div>

      <div className='pricing container'>
        <h2>Set a base price for your spot</h2>

        <p>
          Competitive pricing can help your listing stand out and rank higher
          in search results.
        </p>

        <p>$</p>
        <input
          type='text'
          placeholder='Price per night (USD)'
          value={price}
          onChange={e => setPrice(e.target.value)}
        />
      </div>

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
        {preview? '': errors.preview}

        <input
          type='text'
          placeholder='Image URL'
          value={img2}
          onChange={e => setImg2(e.target.value)}
        />

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

      <div className='submit container'>
        <button
          type='submit'
          onClick={handleSubmit}
        >
          Create Spot
        </button>
      </div>
    </div>
  )
}

export default SpotForm;
