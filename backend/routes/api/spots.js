const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot } = require('../../db/models');

const router = express.Router();

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
