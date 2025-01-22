const demoReviews = [
    // Spot 1, OwnerId 1
    {
      userId: 2,
      spotId: 1,
      review: 'Very cold, but beautiful. Please provide more heat!',
      stars: 4
    },
    {
      userId: 10,
      spotId: 1,
      review: "Amazing view of the stars! But, it is VERY cold!",
      stars: 4
    },
    {
      userId: 5,
      spotId: 1,
      review: "Ya idgits can't get a better heater?",
      stars: 3
    },
    {
      userId: 9,
      spotId: 1,
      review: "Why's it so far!?",
      stars: 3
    },
    // Spot 2, OwnerId 1
    {
      userId: 3,
      spotId: 2,
      review: 'Horrible! They made us drink the blood of their enemies!!!',
      stars: 1
    },
    {
      userId: 4,
      spotId: 2,
      review: 'Seen worse, but still... Watch your back.',
      stars: 2
    },
    {
      userId: 6,
      spotId: 2,
      review: "So many ghosts in this place. Couldn't get them all so be careful.",
      stars: 2
    },
    {
      userId: 8,
      spotId: 2,
      review: 'Not Bad.',
      stars: 4
    },
    // Spot 3, OwnerId 2
    {
      userId: 1,
      spotId: 3,
      review: "So peaceful. It's far from the city. Just how I like it.",
      stars: 5
    },
    {
      userId: 7,
      spotId: 3,
      review: "It really is, like, in the middle of knowhere.",
      stars: 5
    },
    {
      userId: 10,
      spotId: 3,
      review: "Great views. Especially at night, go during a full moon!",
      stars: 5
    },
    {
      userId: 9,
      spotId: 3,
      review: "Wow! It's amazingly beautiful",
      stars: 5
    },
    // Spot 4, OwnerId 2
    {
      userId: 1,
      spotId: 4,
      review: "I thought this place was fake but... It's actually pretty nice.",
      stars: 4
    },
    {
      userId: 7,
      spotId: 4,
      review: "Well it was interesting... If you like that kinda thing...",
      stars: 3
    },
    {
      userId: 10,
      spotId: 4,
      review: "Love the aesthetics! And the view is absolutely gorgeous.",
      stars: 5
    },
    {
      userId: 9,
      spotId: 4,
      review: "Very nice.",
      stars: 4
    },
    // Spot 5, OwnerId 3
    {
      userId: 6,
      spotId: 5,
      review: "Not actually haunted.",
      stars: 3
    },
    {
      userId: 7,
      spotId: 5,
      review: "Depressing...",
      stars: 2
    },
    {
      userId: 8,
      spotId: 5,
      review: "Beautiful",
      stars: 4
    },
    {
      userId: 9,
      spotId: 5,
      review: "Nice Place",
      stars: 4
    },
    // Spot 6, OwnerId 3
    {
      userId: 5,
      spotId: 6,
      review: "Love the woods around the cabin. Great for hunting!",
      stars: 5
    },
    {
      userId: 4,
      spotId: 6,
      review: "Gotta love the peace and quiet.",
      stars: 5
    },
    {
      userId: 1,
      spotId: 6,
      review: "Beautiful",
      stars: 4
    },
    {
      userId: 2,
      spotId: 6,
      review: "Nice Place!",
      stars: 4
    },
    // Spot 7, OwnerId 4
    {
      userId: 6,
      spotId: 7,
      review: "Jerk..",
      stars: 4
    },
    {
      userId: 1,
      spotId: 7,
      review: "So amazing!",
      stars: 5
    },
    {
      userId: 5,
      spotId: 7,
      review: "Nice work, ya idgit.",
      stars: 5
    },
    {
      userId: 7,
      spotId: 7,
      review: "Gotta go just for the burgers.",
      stars: 5
    },
    // Spot 8, OwnerId 4
    {
      userId: 1,
      spotId: 8,
      review: "Very homey",
      stars: 5
    },
    {
      userId: 2,
      spotId: 8,
      review: "Cozy",
      stars: 4
    },
    {
      userId: 5,
      spotId: 8,
      review: "Good to know your protections work.",
      stars: 5
    },
    {
      userId: 3,
      spotId: 8,
      review: "Loved it",
      stars: 4
    },
    // Spot 9, OwnerId 5
    {
      userId: 4,
      spotId: 9,
      review: "Thanks for the salt surplus. Saved our lives more than once!",
      stars: 5
    },
    {
      userId: 6,
      spotId: 9,
      review: "That hidden devil's trap... Amazing stuff, Bobby!",
      stars: 5
    },
    {
      userId: 7,
      spotId: 9,
      review: "There are a lot of weird things that happen at this place...",
      stars: 3
    },
    {
      userId: 8,
      spotId: 9,
      review: "This place has an unusual energy... I'll need to study this more.",
      stars: 4
    },
    // Spot 10, OwnerId 5
    {
      userId: 4,
      spotId: 10,
      review: '"Normal place," huh!?',
      stars: 5
    },
    {
      userId: 6,
      spotId: 10,
      review: 'Yeah, "normal." Ha Ha Ha!',
      stars: 5
    },
    {
      userId: 9,
      spotId: 10,
      review: "Aww! So cute!",
      stars: 5
    },
    {
      userId: 10,
      spotId: 10,
      review: "I sense danger here",
      stars: 3
    },
    // Spot 11, OwnerId 6
    {
      userId: 4,
      spotId: 11,
        review: "Bitch...",
        stars: 4
    },
    {
      userId: 5,
      spotId: 11,
        review: "Your parents would be proud. Great place, sam.",
        stars: 5
    },
    {
      userId: 7,
      spotId: 11,
        review: "Amazing home and neighborhood.",
        stars: 4
    },
    {
      userId: 9,
      spotId: 11,
        review: "So cute!",
        stars: 5
    },
    // Spot 12, OwnerId 6
    {
      userId: 4,
      spotId: 12,
        review: "This is where you lived when you left home!?",
        stars: 4
    },
    {
      userId: 5,
      spotId: 12,
        review: "Well, it's different. I'll give ya that.",
        stars: 5
    },
    {
      userId: 1,
      spotId: 12,
        review: "Cool place.",
        stars: 4
    },
    {
      userId: 7,
      spotId: 12,
        review: "I like it. Very minimalist.",
        stars: 5
    },
    // Spot 13, OwnerId 7
    {
      userId: 4,
      spotId: 13,
        review: "Looks like a spider lives here...",
        stars: 3
    },
    {
      userId: 5,
      spotId: 13,
        review: "I'm not one to complain but can you cool it with the spider webs!",
        stars: 4
    },
    {
      userId: 6,
      spotId: 13,
        review: "Spider Man? Like, the real Spider Man?",
        stars: 4
    },
    {
      userId: 8,
      spotId: 13,
        review: "The bug is not magical, but some kind of hybrid...",
        stars: 5
    },
    // Spot 14, OwnerId 7
    {
      userId: 4,
      spotId: 14,
        review: "It's the actual Avengers Tower! Holy Sh*t",
        stars: 5
    },
    {
      userId: 5,
      spotId: 14,
        review: "Bit too flashy for me",
        stars: 4
    },
    {
      userId: 6,
      spotId: 14,
        review: "Long elevator ride..",
        stars: 4
    },
    {
      userId: 10,
      spotId: 14,
        review: "The view is gorgeous!",
        stars: 5
    },
    // Spot 15, OwnerId 8
    {
      userId: 1,
      spotId: 15,
        review: "Very homey. Great place for a vacation.",
        stars: 5
    },
    {
      userId: 2,
      spotId: 15,
        review: "Love the decor!",
        stars: 4
    },
    {
      userId: 9,
      spotId: 15,
        review: "Wow, such beauty!",
        stars: 5
    },
    {
      userId: 3,
      spotId: 15,
        review: "Wonderful.",
        stars: 4
    },
    // Spot 16, OwnerId 8
    {
      userId: 4,
      spotId: 16,
        review: "This is some magic I've never seen before...",
        stars: 3
    },
    {
      userId: 5,
      spotId: 16,
        review: "Stay away from this hellhole!",
        stars: 2
    },
    {
      userId: 6,
      spotId: 16,
        review: "It's a prison!",
        stars: 1
    },
    {
      userId: 7,
      spotId: 16,
        review: "I don't think this place is for regular people...",
        stars: 1
    },
    // Spot 17, OwnerId 9
    {
      userId: 1,
      spotId: 17,
        review: "So many jokes in this home! I love it!",
        stars: 5
    },
    {
      userId: 4,
      spotId: 17,
        review: "Great sense of humor!",
        stars: 5
    },
    {
      userId: 3,
      spotId: 17,
        review: "So much fun! I laughed myself to sleep every night!",
        stars: 5
    },
    {
      userId: 10,
      spotId: 17,
        review: "I haven't had this much fun in years!",
        stars: 5
    },
    // Spot 18, OwnerId 9
    {
      userId: 2,
      spotId: 18,
        review: "Love the frozen lake! Can ice skate all day!",
        stars: 5
    },
    {
      userId: 5,
      spotId: 18,
        review: "Kinda cold, but nice. Peaceful.",
        stars: 4
    },
    {
      userId: 6,
      spotId: 18,
        review: "So peaceful out here.",
        stars: 5
    },
    {
      userId: 7,
      spotId: 18,
        review: "I could spend my whole life here...",
        stars: 5
    },
    // Spot 19, OwnerId 10
    {
      userId: 1,
      spotId: 19,
        review: "Take your issue of the Quibbler and check for Wrackspurts! There's really none there!",
        stars: 5
    },
    {
      userId: 9,
      spotId: 19,
        review: "Ahh! So much wacky fun!",
        stars: 5
    },
    {
      userId: 6,
      spotId: 19,
        review: "Very nice... But very weird...",
        stars: 4
    },
    {
      userId: 7,
      spotId: 19,
        review: "A little eccentric, but I like it.",
        stars: 5
    },
    // Spot 20, OwnerId 10
    {
      userId: 4,
      spotId: 19,
        review: "Yo! You guys can party.",
        stars: 5
    },
    {
      userId: 5,
      spotId: 19,
        review: "Can't put 'em back like I used to.",
        stars: 5
    },
    {
      userId: 1,
      spotId: 19,
        review: "Very old house but I call it home.",
        stars: 4
    },
    {
      userId: 2,
      spotId: 19,
        review: "Greatest BBQ in all of Houston!",
        stars: 4
    },
]

module.exports = demoReviews;
