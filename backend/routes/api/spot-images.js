const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage} = require('../../db/models');

const router = express.Router();

router.delete('/:imageId,',requireAuth,async (req,res)=>{
    const image = await SpotImage.findByPk(req.params.id)
     await image.destroy()
     res.json({
        "message": "Successfully deleted",
        "statusCode": 200
      })
})




module.exports = router
