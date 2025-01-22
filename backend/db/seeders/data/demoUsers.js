const bcrypt = require("bcryptjs");

const demoUsers = [
    {
    //   id: 1,
      username: 'demo-user',
      firstName: 'demo',
      lastName: 'user',
      email: 'demo@user.io',
      hashedPassword: bcrypt.hashSync('password')
    },
    {
    //   id: 2,
      username: 'FakeUser1',
      firstName: 'fake1',
      lastName: 'user1',
      email: 'user1@user.io',
      hashedPassword: bcrypt.hashSync('password2')
    },
    {
    //   id: 3,
      username: 'FakeUser2',
      firstName: 'fake2',
      lastName: 'user2',
      email: 'user2@user.io',
      hashedPassword: bcrypt.hashSync('password3')
    },
    {
    //   id: 4,
      username: 'bonJovifan1',
      firstName: 'Dean',
      lastName: 'Winchester',
      email: 'dWinchester@supernatural.io',
      hashedPassword: bcrypt.hashSync('password')
    },
    {
    //   id: 5,
      username: 'bSinger',
      firstName: 'Bobby',
      lastName: 'Singer',
      email: 'bSinger@supernatural.io',
      hashedPassword: bcrypt.hashSync('password2')
    },
    {
    //   id: 6,
      username: 'sasquatch',
      firstName: 'Sam',
      lastName: 'Winchester',
      email: 'sammy@supernatural.io',
      hashedPassword: bcrypt.hashSync('password3')
    },
    {
    //   id: 7,
      username: 'Spidey',
      firstName: 'Peter',
      lastName: 'Parker',
      email: 'pete@avngrs.io',
      hashedPassword: bcrypt.hashSync('password')
    },
    {
    //   id: 8,
      username: 'JDepp',
      firstName: 'Gellert',
      lastName: 'Grindelwald',
      email: 'gg@ftgg.io',
      hashedPassword: bcrypt.hashSync('password')
    },
    {
    //   id: 9,
      username: 'JOY!',
      firstName: 'Riley',
      lastName: 'Anon',
      email: 'riley@insideout.io',
      hashedPassword: bcrypt.hashSync('password2')
    },
    {
    //   id: 10,
      username: 'LunaBella',
      firstName: 'Luna',
      lastName: 'Lovegood',
      email: 'lunylovely@quibbler.mi',
      hashedPassword: bcrypt.hashSync('password3')
    }
]


module.exports = demoUsers;
