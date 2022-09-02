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

  if (!spot) {
    res.status(404)
    res.json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  }

  const newReview = await Review.create({
    where:{spotId:spot.id},
    userId:req.user.id,
    spotId,
    review,
    stars
  })
  res.json(newReview)

})



 router.get('/:spotId/bookings',requireAuth,async(req,res)=>{


  const spot = await Spot.findByPk(req.params.spotId)

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

  const spot = await Spot.findByPk(req.params.spotId)

  const {startDate,endDate} = req.body

  if(!spot){
    res.status(404)
    res.json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  }

  const booking = await Booking.create({
  where:{spotId:req.params.spotId},
  spotId:req.params.spotId,
  userId:req.user.id,
  startDate,
  endDate
  })

  res.json(booking)

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

  let spots = await Spot.findAll()

  if (!spots) {
    res.json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  }

  return res.json(spots)

})

module.exports = router
