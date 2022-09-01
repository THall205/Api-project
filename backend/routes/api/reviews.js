const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Review, ReviewImage} = require('../../db/models');

const router = express.Router();


router.post('/:reviewId/images',
[requireAuth],

  async (req, res) => {

    const { reviewId } = req.params
    const review = await Review.findByPk(reviewId)
    const { url } = req.body


    if (!review) {
      res.status(404)
      return res.json({
        "message": "Review couldn't be found",
        "statusCode": 404
      })
    }
    const reviewImage = await ReviewImage.create({
        where:{reviewId:review.id},
       url
    })

    return res.json(reviewImage)

  })


router.get('/current',
requireAuth,
async (req,res)=>{

    let reviews = await Review.findAll({
        where:{
            userId: req.user.id
        }
    })
    if(!reviews){
        res.status(404)
        res.json({message:'no reviews by this user'})
    }
    res.json(reviews)
})



module.exports = router
