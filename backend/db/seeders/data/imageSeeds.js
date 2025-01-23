const demoSpots = require('./spotSeeds');
const demoReviews = require('./reviewSeeds')

class ImageCreator {
  constructor() {
    this.spotUrls = [
      'https://i.ibb.co/mBdvGHp/cemetary-1-1442451.jpg',
      'https://i.ibb.co/QKQFdRW/chairs-2-1489343.jpg',
      'https://i.ibb.co/w6rnbWC/prison-walls-1460144.jpg',
      'https://i.ibb.co/jhtYvy2/cabin-1406376.jpg',
    ];
    this.reviewUrls = [
      'https://i.ibb.co/NxgL179/childhood-1241405.jpg',
      'https://i.ibb.co/SnQzr1h/old-vacant-room-1539752.jpg',
      'https://i.ibb.co/ZTp0pYJ/father-and-children-on-a-walk-1429203.jpg',
      'https://i.ibb.co/th5SZRP/lonely-bouquet-1385870.jpg'
    ]
    this.images = this.seedCreator();
  }

  seedCreator() {
    const newImages = [];
    function randomNumber(max, min=0) {
      const num = Math.floor(Math.random() * (max - min + 1)) + min;
      return num;
    }

    demoSpots.forEach((spot, i) => {
      let max = this.spotUrls.length - 1
      let num = randomNumber(max)
      // console.log(num)
      newImages.push({
        imageableId: i+1,
        imageableType: 'Spot',
        url: this.spotUrls[num],
        preview: true,
      })
    })

    demoReviews.forEach((review, i) => {
      let max = this.reviewUrls.length - 1
      newImages.push({
        imageableId: i+1,
        imageableType: 'Review',
        url: this.reviewUrls[randomNumber(max)],
        preview: true,
      })
    })

    // console.log(newImages)
    return newImages;
  }

}

module.exports = ImageCreator;
