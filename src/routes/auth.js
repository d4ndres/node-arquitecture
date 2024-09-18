//* host + /api/auth
const {crearUsuario, loginUsuario, revalidarToken} = require('../controllers/auth')

// todo: auth // crear, login, renew
const { Router } = require('express')
const router = Router()


// Validator
const {check } = require('express-validator')

//my middleware
const {validarCampos} = require('../middleware/validar-campos')
const {validarJWT} = require('../middleware/validar-jwt')


router.post('/', [
  check('email', 'El email es require').isEmail(),
  check('password', 'El password es requerido').not().isEmpty(),
  validarCampos
],loginUsuario)

router.post(
  '/new', 
  [
    check('name', 'El name es require').not().isEmpty(),
    check('email', 'El email es require').isEmail(),
    check('password', 'El password debe ser de mas de 6 caracteres').isLength({min: 6}),
    validarCampos
  
  ],
  crearUsuario
)


router.get('/renew', validarJWT, revalidarToken)




module.exports = router