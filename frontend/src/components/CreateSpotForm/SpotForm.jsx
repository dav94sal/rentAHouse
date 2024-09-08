import './SpotForm.css';

function SpotForm() {
  return (
    <div className='spot-form-container'>
      <div className='header'>
        <h1>Create a new Spot</h1>
        <h2>Where's your place located?</h2>
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
    </div>
  )
}

export default SpotForm;
