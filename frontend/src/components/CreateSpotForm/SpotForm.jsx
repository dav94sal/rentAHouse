import './SpotForm.css';

function SpotForm() {
  return (
    <div className='spot-form-container'>
      <div className='header'>
        <h1>Create a new Spot</h1>
        <h2>Where&apos;s your place located?</h2>
        <p>
          Guests will only get your exact address once they booked a reservation
        </p>
      </div>

      <div className='location'>
        <label htmlFor='country'>
          Country
        </label>
        <input
          name='country'
          type='text'
          placeholder='Country'
        />

        <label>
          Street Address
        </label>
        <input
          type='text'
          placeholder='Address'
        />

        <div className='city-state'>
          <label>
            City
            <input
              type='text'
              placeholder='City'
            />
          </label>
          <p id='comma'>,</p>

          <label>
            State
            <input
              type='text'
              placeholder='State'
            />
          </label>
        </div>

        <div className='lat-lng'>
          <label>
            Latitude
            <input
              type='text'
              placeholder='Latitude'
            />
          </label>
          <p id='comma'>,</p>
          <label>
            Longitude
            <input
              type='text'
              placeholder='Longitude'
            />
          </label>
        </div>

      </div>

      <div className='description'>
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
        />
      </div>
    </div>
  )
}

export default SpotForm;
