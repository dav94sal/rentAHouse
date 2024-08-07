// restore session: '/api/session'
// restore token: '/api/csrf/restore'

// login username
fetch('/api/session', {
  method: 'POST',
  headers: {
    "Content-Type": "application/json",
    "XSRF-TOKEN": ``
  },
  body: JSON.stringify({ credential: 'demo-user', password: 'password' })
}).then(res => res.json()).then(data => console.log(data));

// login email
fetch('/api/session', {
  method: 'POST',
  headers: {
    "Content-Type": "application/json",
    "XSRF-TOKEN": ``
  },
  body: JSON.stringify({ credential: 'demo@user.io', password: 'password' })
}).then(res => res.json()).then(data => console.log(data));


// logout
fetch('/api/session', {
  method: 'DELETE',
  headers: {
    "Content-Type": "application/json",
    "XSRF-TOKEN": ``
  }
}).then(res => res.json()).then(data => console.log(data));

// signup
fetch('/api/users', {
  method: 'POST',
  headers: {
    "Content-Type": "application/json",
    "XSRF-TOKEN": ``
  },
  body: JSON.stringify({
    email: 'spidey@spider.man',
    firstName: 'Peter',
    lastName: 'Parker',
    username: 'Spidey',
    password: 'password'
  })
}).then(res => res.json()).then(data => console.log(data));

// create spot
fetch('/api/spots', {
  method: 'POST',
  headers: {
    "Content-Type": "application/json",
    "XSRF-TOKEN": ``
  },
  body: JSON.stringify({
  "address": "123 Disney Lane",
  "city": "San Francisco",
  "state": "California",
  "country": "United States of America",
  "lat": 37.7645358,
  "lng": -122.4730327,
  "name": "App Academy",
  "description": "Place where web developers are created",
  "price": 123
  })
}).then(res => res.json()).then(data => console.log(data));

// edit spot
fetch('/api/spots/1', {
  method: 'PUT',
  headers: {
    "Content-Type": "application/json",
    "XSRF-TOKEN": ``
  },
  body: JSON.stringify({
  "address": "123 Disney Lane",
  "city": "San Francisco",
  "state": "California",
  "country": "United States of America",
  "lat": 37.7645358,
  "lng": -122.4730327,
  "name": "App Academy",
  "description": "Place where web developers are created",
  "price": 123
  })
}).then(res => res.json()).then(data => console.log(data));

// add review to a spot
fetch('/api/spots/7/reviews', {
  method: 'POST',
  headers: {
    "Content-Type": "application/json",
    "XSRF-TOKEN": ``
  },
  body: JSON.stringify({
    "review": "This was an awesome spot!",
    "stars": 5,
  })
}).then(res => res.json()).then(data => console.log(data));

// add booking to a spot
fetch('/api/spots/6/bookings', {
  method: 'POST',
  headers: {
    "Content-Type": "application/json",
    "XSRF-TOKEN": ``
  },
  body: JSON.stringify({
    "startDate": "2021-11-19",
    "endDate": "2021-11-20"
  })
}).then(res => res.json()).then(data => console.log(data));

// edit review
fetch('/api/reviews/1', {
  method: 'PUT',
  headers: {
    "Content-Type": "application/json",
    "XSRF-TOKEN": ``
  },
  body: JSON.stringify({
    "review": "This was an awesome spot!",
    "stars": 5,
  })
}).then(res => res.json()).then(data => console.log(data));

// edit booking
fetch('/api/bookings/1', {
  method: 'PUT',
  headers: {
    "Content-Type": "application/json",
    "XSRF-TOKEN": ``
  },
  body: JSON.stringify({
     "startDate": "2021-11-19",
    "endDate": "2021-11-20"
  })
}).then(res => res.json()).then(data => console.log(data));

// add an image to spot
fetch('/api/spots/7/images', {
  method: 'POST',
  headers: {
    "Content-Type": "application/json",
    "XSRF-TOKEN": ``
  },
  body: JSON.stringify({
    "url": "",
    "preview": "true"
  })
}).then(res => res.json()).then(data => console.log(data));

// add an image to review
fetch('/api/reviews/1/images', {
  method: 'POST',
  headers: {
    "Content-Type": "application/json",
    "XSRF-TOKEN": ``
  },
  body: JSON.stringify({
    "url": ""
  })
}).then(res => res.json()).then(data => console.log(data));

// delete a spot
fetch('/api/spots/7', {
  method: 'DELETE',
  headers: {
    "Content-Type": "application/json",
    "XSRF-TOKEN": ``
  }
}).then(res => res.json()).then(data => console.log(data));

// delete a review
fetch('/api/reviews/7', {
  method: 'DELETE',
  headers: {
    "Content-Type": "application/json",
    "XSRF-TOKEN": ``
  }
}).then(res => res.json()).then(data => console.log(data));

// delete a booking
fetch('/api/bookings/7', {
  method: 'DELETE',
  headers: {
    "Content-Type": "application/json",
    "XSRF-TOKEN": ``
  }
}).then(res => res.json()).then(data => console.log(data));

// delete a spot image
fetch('/api/spot-images/7', {
  method: 'DELETE',
  headers: {
    "Content-Type": "application/json",
    "XSRF-TOKEN": ``
  }
}).then(res => res.json()).then(data => console.log(data));

// delete a review image
fetch('/api/review-images/1', {
  method: 'DELETE',
  headers: {
    "Content-Type": "application/json",
    "XSRF-TOKEN": ``
  }
}).then(res => res.json()).then(data => console.log(data));
