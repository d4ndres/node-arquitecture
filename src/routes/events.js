// /api/events

const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events')
const { Router } = require('express')
const router = Router()
const {validarJWT} = require('../middleware/validar-jwt')
const {check} = require('express-validator')
const {validarCampos} = require('../middleware/validar-campos') 
const {isDate} = require('../helpers/isDate')
// Elevar middleware
router.use( validarJWT ) // los endpoints que se declaren después de este middleware serán afectados
// router.get('/', validarJWT, getEvents)
// router.post('/', validarJWT, createEvent)
// router.put('/:id', validarJWT, updateEvent)
// router.delete('/:id', validarJWT, deleteEvent)


// endpoints
router.get('/', getEvents )
router.post('/', [
  check('title', 'El titulo es obligatorio').not().isEmpty(),
  check('start', 'La fecha de inicio es obligatoria').custom(isDate),
  check('end', 'La fecha de cierre es obligatoria').custom(isDate),
  validarCampos 
], createEvent)
router.put('/:id', updateEvent)
router.delete('/:id', deleteEvent)


module.exports = router