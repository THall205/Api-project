const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage} = require('../../db/models');

const router = express.Router();

router.delete('/:imageId,',requireAuth,async (req,res)=>{
  const {imageId} = req.params
  console.log(imageId)
  const spot = await Spot.findAll({
    where:{ownerId:req.user.id}
  })
  console.log(spot)

  const image = await SpotImage.findOne({
    where:{
      spotId:spot.id,
      id:image.id

    }
  })
  if(!image){
    res.json({
      message:'no image found'
    })
  }

  await image.destroy()

     res.json({
        "message": "Successfully deleted",
        "statusCode": 200
      })
})




module.exports = router
