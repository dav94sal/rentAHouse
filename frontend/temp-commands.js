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
