const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Booking} = require('../../db/models');

const router = express.Router();

router.get('/current',requireAuth, async (req,res)=>{

    let bookings = await Booking.findAll({
        where:{
            userId:req.user.id
        }
    })
    if(!bookings){
        res.status(404)
        res.json({message:'user has no bookings'})
    }
    res.json(bookings)
})

router.put('/:bookingId',requireAuth,async(req,res)=>{

    const booking = await Booking.findByPk(req.params.bookingId)

    if(!booking) {
        res.status(400)
        res.json({
            "message": "Validation error",
            "statusCode": 400,
            "errors": {
              "endDate": "endDate cannot come before startDate"
            }
          })
    }

    const {startDate,endDate} = req.body

    if(startDate) booking.startDate = startDate
    if(endDate) booking.endDate = endDate

     await booking.save()
    return res.json(booking)



})

router.delete('/:bookingId',requireAuth,async(req,res)=>{
    const booking = await Booking.findByPk(req.params.bookingId)
    if(!booking){
        res.status(404)
        res.json({
            "message": "Booking couldn't be found",
            "statusCode": 404
        })
    }
    await booking.destroy()
    res.json({
        "message": "Successfully deleted",
        "statusCode": 200
      })
})

module.exports = router
