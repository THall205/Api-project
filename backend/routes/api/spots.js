const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage} = require('../../db/models');

const router = express.Router();
//get spots owned by current user
router.get('/current',
requireAuth,
async (req,res)=>{

    let spots = await Spot.findAll({
        where:{
            ownerId: req.user.id
        }
    })
    res.json(spots)
})

router.post('/:id/images',

async (req,res)=>{


    const spotId = await Spot.findByPk(req.params.id)
    const {url,preview} = req.body

    if(!spotId){
        res.status(404)
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
          })
    }
    const spotImage = await SpotImage.create({
        spotId, url,preview
    })

    res.json(spotImage)
})

router.post('/',
requireAuth,
async (req,res)=>{
const {address,city,state,country,lat,lng,name,description,price} = req.body

const spot = await Spot.create({address,city,state,country,lat,lng,name,description,price})
res.json(spot)
})



router.get('/', async (req,res)=>{

  let spots=  await Spot.findAll()

if(!spots){
    res.json({
        "message": "Spot couldn't be found",
        "statusCode": 404
      })
}
  else return res.json(spots)

})

module.exports = router
