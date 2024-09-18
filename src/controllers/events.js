const { response } = require('express')
const Event = require('../models/Event')

const getEvents = ( req, res=response ) => {
  res.status(200).json({
    ok: true,
    msg: 'getEvents'
  })
} 




const createEvent = async ( req, res=response ) => {

  
  try {
    const event = new Event( req.body )
    event.user = req.uid
    const data = await event.save()
    
    res.status(200).json({
      ok: true,
      msg: 'createEvent',
      data
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      smg: 'Comunicarse con el admin'
    })
  }
} 



const updateEvent = ( req, res=response ) => {
  res.status(200).json({
    ok: true,
    msg: 'updateEvent'
  })
} 

const deleteEvent = ( req, res=response ) => {
  res.status(200).json({
    ok: true,
    msg: 'deleteEvent'
  })
}


module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent
}