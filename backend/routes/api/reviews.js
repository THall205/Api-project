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

router.put('/:reviewId', requireAuth,async(req,res)=>{

    const reviewToUpdate = await Review.findByPk(req.params.reviewId)
    const {review,stars} = req.body
    console.log(reviewToUpdate)
    console.log(review,stars)


    if(reviewToUpdate=== null){
        res.status(400)
        return res.json({
            "message": "Validation error",
            "statusCode": 400,
            "errors": {
                "review": "Review text is required",
                "stars": "Stars must be an integer from 1 to 5",
            }
        })

    }
    if(review) reviewToUpdate.review = review
    if(stars) reviewToUpdate.stars = stars
    await reviewToUpdate.save()
   return res.json(reviewToUpdate)
})

router.delete('/:reviewId',requireAuth,async(req,res)=>{
  const review = await Review.findByPk(req.params.reviewId)

  if(!review){
    res.status(404)
    res.json({
      "message": "Review couldn't be found",
      "statusCode": 404
    })
  }
await review.destroy()
res.json({
  "message": "Successfully deleted",
  "statusCode": 200
})
})



module.exports = router
