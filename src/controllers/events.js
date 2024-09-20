const { response } = require('express')
const Event = require('../models/Event')

const getEvents = async ( req, res=response ) => {

  try {
    const events = await Event.find().populate('user', ['name'])

    res.status(200).json({
      ok: true,
      msg: 'getEvents',
      data: events
    })

  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      smg: 'Comunicarse con el admin'
    })
  }
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



const updateEvent = async ( req, res=response ) => {
  const eventoId = req.params.id
  const uid = req.uid
  

  try {
    const event = await Event.findById( eventoId )

    if( !event ) {
      return res.status(404).json({
        ok: false,
        smg: 'Evento no existente'
      })
    }
    
    if( event.user.toString() !== uid ) {
      return res.status(401).json({
        ok: false,
        smg: 'No tiene privilegio de editar este evento'
      })
    }

    const nuevoEvento = {
      ...req.body,
      user: uid
    }

    const eventoActualizado = await Event.findByIdAndUpdate( eventoId, nuevoEvento, {new: true} )

    res.status(200).json({
      ok: true,
      msg: 'updateEvent',
      data: eventoActualizado
    })
    
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      smg: 'Comunicarse con el admin'
    })
  }


} 

const deleteEvent = async ( req, res=response ) => {
  
  
  try {
    const eventoId = req.params.id
    const uid = req.uid
    
    const event = await Event.findById( eventoId )

    if( !event ) {
      return res.status(404).json({
        ok: false,
        smg: 'Evento no existente'
      })
    }
    
    if( event.user.toString() !== uid ) {
      return res.status(401).json({
        ok: false,
        smg: 'No tiene privilegio de eliminar este evento'
      })
    }



    await Event.findByIdAndDelete( eventoId )

    res.status(200).json({
      ok: true
    })
    
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      smg: 'Comunicarse con el admin'
    })
  }
}


module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent
}