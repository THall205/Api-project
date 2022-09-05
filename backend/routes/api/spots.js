const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Review , Booking} = require('../../db/models');

const router = express.Router();
//get spots owned by current user





router.get('/:spotId/reviews',async (req,res)=>{
const {spotId} = req.params
const spot = await Spot.findByPk(spotId)

if (!spot) {
  res.status(404)
  res.json({
    "message": "Spot couldn't be found",
    "statusCode": 404
  })
}

const reviews = await Review.findAll({
  where:{spotId:spot.id}
})

  res.json(reviews)
})

router.post('/:spotId/reviews',requireAuth,async (req,res)=>{
  const {spotId} = req.params
  const spot = await Spot.findByPk(spotId)
  const{review,stars} = req.body

  const userReview = await Review.findOne({
    where:{userId:req.user.id}
  })

  if(!review || !stars){
   res.json({

      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "review": "Review text is required",
        "stars": "Stars must be an integer from 1 to 5",
      }

    })
  }

 else if (!spot) {
    res.status(404)
    res.json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  }


else if(userReview){
 res.json(   {
  "message": "User already has a review for this spot",
  "statusCode": 403
})
    // res.json({

    //   "message": "Validation error",
    //   "statusCode": 400,
    //   "errors": {
    //     "review": "Review text is required",
    //     "stars": "Stars must be an integer from 1 to 5",
    //   }

    // })
  }
  else{

    const newReview = await Review.create({
      where:{spotId:spot.id},
      userId:req.user.id,
      spotId:spot.id,
      review,
      stars
    })

    res.json(newReview)

  }
  })



router.get('/:spotId/bookings',requireAuth,async(req,res)=>{

  const {spotId} = req.params
  const spot = await Spot.findByPk(spotId)

  if(!spot){
    res.status(404)
    res.json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  }

  const booking = await Booking.findAll({
    where:{spotId:spot.id}
  })
  res.json(booking)
 })

 router.post('/:spotId/bookings',requireAuth,
 async (req,res)=>{
  const {spotId} = req.params
  const spot = await Spot.findByPk(spotId)



  if(!spot){
    res.status(404)
    res.json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  }
  const {startDate,endDate} = req.body

const conflictingBooking = await Booking.findAll({
  where:{
    spotId

  },
  attributes:['startDate','endDate']
})
console.log('booking',conflictingBooking)

if(conflictingBooking.length){
  res.status(403)
  res.json({
    "message": "Sorry, this spot is already booked for the specified dates",
    "statusCode": 403,
    "errors": {
      "startDate": "Start date conflicts with an existing booking",
      "endDate": "End date conflicts with an existing booking"
    }
  })
} else{


  const booking = await Booking.create({
    where:{spotId:spot.id},
    spotId,
    userId:req.user.id,
    startDate,
    endDate
  })

  res.json(booking)
}




})

router.post('/:spotId/images',

  async (req, res) => {

    const { spotId } = req.params
    const spot = await Spot.findByPk(spotId)
    const { url, preview } = req.body
    console.log(spot)

    if (!spot) {
      res.status(404)
      return res.json({
        "message": "Spot couldn't be found",
        "statusCode": 404
      })
    }
    const spotImage = await SpotImage.create({
      spotId, url, preview
    })

    return res.json(spotImage)

  })

router.get('/current',requireAuth,async (req, res) => {

    let spots = await Spot.findAll({
      where: {
        ownerId: req.user.id
      }
    })
    res.json(spots)
  })

router.get('/:id', async (req, res) => {
  let spot = await Spot.findByPk(req.params.id)

  if (!spot) {
    res.json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  }
  return res.json(spot)

})
router.put('/:spotId', async (req, res) => {

  let spot = await Spot.findByPk(req.params.spotId)
  const { address, city, state, country, lat, lng, name, description, price } = req.body


  if (spot === null) {
    res.status(404)
    res.json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  }
  if (address) spot.address = address
  if (city) spot.city = city
  if (state) spot.state = state
  if (country) spot.country = country
  if (lat) spot.lat = lat
  if (lng) spot.lng = lng
  if (name) spot.name = name
  if (description) spot.description = description
  if (price) spot.price = price
 await spot.save()

  return res.json(spot)



})


router.delete('/:spotId', requireAuth, async (req, res) => {

  let spot = await Spot.findByPk(req.params.spotId)

  if (!spot) {
    res.status(404)
    res.json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  }
  await spot.destroy()
  res.json({
    "message": "Successfully deleted",
    "statusCode": 200
  })
})

router.post('/',requireAuth,async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body
    const ownerId = req.user.id
    console.log(ownerId)
    const spot = await Spot.create({ ownerId, address, city, state, country, lat, lng, name, description, price })
    res.json(spot)
  })




router.get('/', async (req, res) => {

  let { page, size } = req.query

  if(!page)page =1;
  if(!size) size = 20;
  if (page < 0) page = 0;
  if (size < 0) size = 0;
  if (page > 10) page = 10;
  if (size > 20) size = 20;

  page = parseInt(page)
  size = parseInt(size)

  if(isNaN(page)) page = 0
  if(isNaN(size)) size = 0

  let spots = await Spot.findAll({
    limit: size,
    page: size * (page - 1)
  })

  if (!spots) {
    res.json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  }

  return res.json(spots)

})

module.exports = router
