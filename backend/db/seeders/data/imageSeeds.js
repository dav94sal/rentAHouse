const demoSpots = require('./spotSeeds');
const demoReviews = require('./reviewSeeds')

class ImageCreator {
  constructor() {
    this.staticSpotUrls = {
      "demo-spot": 'https://i.ibb.co/jhtYvy2/cabin-1406376.jpg',
      "The Camp": 'https://i.ibb.co/w6rnbWC/prison-walls-1460144.jpg',
      "Ya'lls place": 'https://i.ibb.co/CmQ7KTm/pexels-jeffrey-czum-254391-3330118.jpg',
      "Voodoo Hills": 'https://i.ibb.co/pyftQ8y/pexels-sebastians-731082.jpg',
      "Cemetary Gates": 'https://i.ibb.co/mBdvGHp/cemetary-1-1442451.jpg',
      "White River Cabin": 'https://i.ibb.co/JxFntWw/pexels-eberhardgross-1612351.jpg',
      "Mary's Bed and Breakfast": 'https://i.ibb.co/WGGt2xP/pexels-pixabay-259685.jpg',
      "Spiders' Web": 'https://i.ibb.co/XkR1hPK/pexels-pixabay-34225.jpg',
      "Stark Tower": 'https://i.ibb.co/XYw8dmf/pexels-essow-k-251295-936722.jpg',
      "Dumbledores Palace": 'https://i.ibb.co/QHjnbHH/pexels-einfoto-2091166.jpg',
      "Nurmengard Castle": 'https://i.ibb.co/MsB35dt/pexels-minan1398-1006094.jpg',
      "Ice Shack": 'https://i.ibb.co/48PH9Vh/pexels-tobiasbjorkli-2104151.jpg',
      "Quibbler Inn": 'https://i.ibb.co/G01G2gD/pexels-eberhardgross-2098405.jpg',
      "Practice House Studios": 'https://i.ibb.co/tXqws26/10418851-727543720661541-8852380464613337125-n.jpg',
    }

    this.dynamicSpotUrls = [
      'https://i.ibb.co/6Fd2Zpc/pexels-tobiasbjorkli-2119713.jpg',
      'https://i.ibb.co/m6DTxfX/pexels-expect-best-79873-323780.jpg',
      'https://i.ibb.co/tC0mHsG/pexels-clement-proust-363898785-14641908.jpg',
      'https://i.ibb.co/0XTqTqL/pexels-binyaminmellish-186077.jpg',
      'https://i.ibb.co/Zfg8qP2/pexels-binyaminmellish-1396122.jpg',
      'https://i.ibb.co/vHQjp1n/pexels-binyaminmellish-1396132.jpg',
      'https://i.ibb.co/Gcyrmq3/pexels-dilayelmas-8086123.jpg',
      'https://i.ibb.co/F0fZnZW/pexels-julia-kuzenkov-442028-1974596.jpg',
      'https://i.ibb.co/v1RqNcH/pexels-tomas-malik-793526-2581922.jpg',
      'https://i.ibb.co/BzDnnt0/pexels-luis-yanez-57302-206172.jpg',
      'https://i.ibb.co/nck2J9n/pexels-thgusstavo-2102587.jpg',
      'https://i.ibb.co/sWwXG6H/pexels-scottwebb-1029599.jpg',
      'https://i.ibb.co/DDm31tT/pexels-christa-grover-977018-2121121.jpg',
      'https://i.ibb.co/4FY7NqK/pexels-emrecan-2079249.jpg',
      'https://i.ibb.co/6FZ6DSh/pexels-falling4utah-1080696.jpg',
      'https://i.ibb.co/CW6bL6s/pexels-falling4utah-2724748.jpg',
      'https://i.ibb.co/K0cLv5x/pexels-quang-nguyen-vinh-222549-2134224.jpg',
      'https://i.ibb.co/bg5frwp/pexels-ilya-shakir-1278798-2440471.jpg',
      'https://i.ibb.co/ZXB5Xp9/pexels-pixabay-277667.jpg',
      'https://i.ibb.co/Yb0FNtH/pexels-pixabay-147411.jpg',
      'https://i.ibb.co/kXMVFjL/pexels-pixabay-210617.jpg',
      'https://i.ibb.co/YZkqwCF/pexels-pixabay-462205.jpg',
      'https://i.ibb.co/XkjKMQx/pexels-pixabay-221024.jpg',
      'https://i.ibb.co/6spG7BG/pexels-pixabay-53610.jpg',
      'https://i.ibb.co/M20byPN/pexels-pixabay-209296.jpg',
      'https://i.ibb.co/SXkMF8s/pexels-pixabay-221540.jpg',
      'https://i.ibb.co/WH2hcDQ/pexels-pixabay-280229.jpg',
      'https://i.ibb.co/jDwMLRt/pexels-pixabay-259588.jpg',
      'https://i.ibb.co/C6kQdMb/pexels-pixabay-164522.jpg',
      'https://i.ibb.co/8b5L8Gg/pexels-pixabay-210464.jpg',
      'https://i.ibb.co/QKQFdRW/chairs-2-1489343.jpg',
    ];

    this.reviewUrls = [
      'https://i.ibb.co/NxgL179/childhood-1241405.jpg',
      'https://i.ibb.co/SnQzr1h/old-vacant-room-1539752.jpg',
      'https://i.ibb.co/KwmYXhS/pexels-weirdfish-2640604.jpg',
      'https://i.ibb.co/ZTp0pYJ/father-and-children-on-a-walk-1429203.jpg',
      'https://i.ibb.co/th5SZRP/lonely-bouquet-1385870.jpg',
      'https://i.ibb.co/Y2h9hBT/pexels-pixabay-275484.jpg',
      'https://i.ibb.co/rx0fz7r/pexels-vika-glitter-392079-1648776.jpg',
      'https://i.ibb.co/DDm31tT/pexels-christa-grover-977018-2121121.jpg',
      'https://i.ibb.co/4FY7NqK/pexels-emrecan-2079249.jpg',
      'https://i.ibb.co/0BdM6Cv/pexels-itsterrymag-2631746.jpg',
      'https://i.ibb.co/6FZ6DSh/pexels-falling4utah-1080696.jpg',
      'https://i.ibb.co/CW6bL6s/pexels-falling4utah-2724748.jpg',
      'https://i.ibb.co/3vCbSNL/pexels-christa-grover-977018-2121120.jpg',
      'https://i.ibb.co/kxrkVkx/pexels-dropshado-2251247.jpg',
      'https://i.ibb.co/HdndLYP/pexels-pixabay-358636.jpg',
      'https://i.ibb.co/Z1k836R/pexels-pixabay-259962.jpg',
      'https://i.ibb.co/8b5L8Gg/pexels-pixabay-210464.jpg',
      'https://i.ibb.co/TLfKrST/pexels-pixabay-271624.jpg',
      'https://i.ibb.co/j45psnp/pexels-pixabay-279607.jpg',
      'https://i.ibb.co/1nLxhzR/pexels-pixabay-271649.jpg',
      'https://i.ibb.co/6JcNgWH/pexels-emrecan-2079434.jpg',
      'https://i.ibb.co/n8yb9tR/pexels-fotoaibe-1643383.jpg',
      'https://i.ibb.co/MfnpbKQ/pexels-mtk402-2098913.jpg',
      'https://i.ibb.co/sttZBKB/pexels-lina-2253916.jpg',
      'https://i.ibb.co/4SGmJpy/pexels-e-photography-1475938.jpg',
      'https://i.ibb.co/FhPjkbn/pexels-saviesa-home-1098995-2089696.jpg',
      'https://i.ibb.co/K0cLv5x/pexels-quang-nguyen-vinh-222549-2134224.jpg',
      'https://i.ibb.co/7gcrXpG/pexels-pixabay-280232.jpg',
      'https://i.ibb.co/PM2pgB4/pexels-jvdm-1457842.jpg',
      'https://i.ibb.co/gTXYZyG/pexels-jvdm-1457847.jpg',
      'https://i.ibb.co/WtJpR2j/pexels-jvdm-1457841.jpg',
      'https://i.ibb.co/4JgmrX3/pexels-isabel-araujo-861343-2100238.jpg',
      'https://i.ibb.co/0X7rmfv/pexels-gochrisgoxyz-1648838.jpg',
      'https://i.ibb.co/b3Qfky5/pexels-alex-qian-1180283-2343466.jpg',
      'https://i.ibb.co/0YgTGJB/pexels-fox-58267-982070.jpg',
      'https://i.ibb.co/rZC34tP/pexels-pixabay-259580.jpg',
      'https://i.ibb.co/xXQtG8Y/pexels-pixabay-262048.jpg',
      'https://i.ibb.co/k9PNDp7/pexels-pixabay-276554.jpg',
      'https://i.ibb.co/bg5frwp/pexels-ilya-shakir-1278798-2440471.jpg',
    ];

    this.easterEggs = {
      toyHouse: 'https://i.ibb.co/KwmYXhS/pexels-weirdfish-2640604.jpg',
      spider: 'https://i.ibb.co/J7Rk7wY/pexels-pixabay-40795.jpg',
      music:[
        'https://i.ibb.co/RgZ3H96/pexels-rdne-7502585.jpg',
        'https://i.ibb.co/wK8grxS/pexels-mikhail-nilov-7886314.jpg',
        'https://i.ibb.co/t3jCS2V/David-Desaturated.jpg',
        'https://i.ibb.co/zsR9Psw/pexels-rdne-8198558.jpg',
        'https://i.ibb.co/4Sb6tjN/pexels-yankrukov-9009503.jpg'
      ]
    }

    this.images = this.seedCreator();
  }

  seedCreator() {
    // generate a random number
    function randomNumber(max, min=0) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // return array
    const newImages = [];

    // loop through all spot seeds
    let i = 0;
    while (i < demoSpots.length) {
      const spot = demoSpots[i]

      // generate random number between 3 & 5 ->
      // -> j represents current img number
      for (let j = 0; j < randomNumber(5, 3); j++) {
        // skeleton object
        const imgObj = {
          imageableId: i+1,
          imageableType: 'Spot',
        };

        // check for a static url in first iteration only
        if (j === 0 && spot.name in this.staticSpotUrls) {
          imgObj.url = this.staticSpotUrls[spot.name]
          imgObj.preview = true;
        } else {
          // determine if this img will be a preview
          imgObj.preview = j === 0 ? true : false;

          // special case: music easter eggs
          if (j > 0 && spot.name === 'Practice House Studios') {
            imgObj.url = this.easterEggs.music[j]
          } else if (j === 3 && spot.name === "Gnome Garden") {
            // special case: toy house
            imgObj.url = this.easterEggs.toyHouse
          } else if (j === 3 && spot.name === "Spiders' Web") {
            // special case: spider-man
            imgObj.url = this.easterEggs.spider
          } else {
            imgObj.url = this.dynamicSpotUrls[randomNumber(this.dynamicSpotUrls.length - 1)]
          }
        }
        // console.log(imgObj)
        newImages.push(imgObj)

        // Add a review img, up to two
        if (j < 2) {
          const reviewImg = {...imgObj}
          reviewImg.imageableType = "Review";
          reviewImg.url = this.reviewUrls[randomNumber(this.reviewUrls.length - 1)]
          reviewImg.preview = j === 0 ? true : false;
          newImages.push(reviewImg)
        }
      }
      i++;
    }

    // console.log(newImages)
    return newImages;
  }

}

module.exports = ImageCreator;
