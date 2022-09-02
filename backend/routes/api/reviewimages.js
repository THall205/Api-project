const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { ReviewImage} = require('../../db/models');

const router = express.Router();

router.delete('/:imageId',requireAuth,async (req,res)=>{
  const {imageId} = req.params


  const image = await ReviewImage.findByPk(imageId)
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
