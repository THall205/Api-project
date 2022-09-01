const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Review } = require('../../db/models');

const router = express.Router();
//get spots owned by current user

router.get('/:spotId/reviews', async (req, res) => {
  const { spotId } = req.params
  const spot = await Spot.findByPk(spotId)


  if (!spot) {
    res.status(404)
    res.json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  }
  res.json(spotReviews)



  const spotReviews = await Review.findAll({
    where: spot.id
  })
})

router.post('/:spotId/reviews',
 requireAuth,
  async (req,res)=>{
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
router.get('/current',
  requireAuth,
  async (req, res) => {

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
router.put('/:id', async (req, res) => {

  let spot = await Spot.findByPk(req.params.id)
  const { address, city, state, country, lat, lng, name, description, price } = req.body

  if (address) spot.address = address
  if (city) spot.city = city
  if (state) spot.state = state
  if (country) spot.country = country
  if (lat) spot.lat = lat
  if (lng) spot.lng = lng
  if (name) spot.name = name
  if (description) spot.description = description
  if (price) spot.price = price

  if (!spot) {
    res.status(404)
    res.json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  }
  spot.save()

  return res.json(spot)



})


router.delete('/:id', requireAuth, async (req, res) => {

  let spot = await Spot.findByPk(req.params.id)

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

router.post('/',
  requireAuth,
  async (req, res) => {
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
