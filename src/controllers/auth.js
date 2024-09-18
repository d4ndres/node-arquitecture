const { response } = require('express')
const bcrypt = require('bcryptjs')
const Usuario = require('../models/Usuario')
const {generateJWT} = require('../helpers/jws')


const crearUsuario = async (req, res = response) => {
  const { email } = req.body

  try {
    let usuario = await Usuario.findOne({ email })

    if (usuario) {
      return res.status(400).json({
        ok: false,
        msg: 'Un usuario ya existe con ese correo'
      })
    }

    usuario = new Usuario(req.body)
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(usuario.password, salt)

    await usuario.save()

    // generar JWT
    const token = await generateJWT( usuario.id, usuario.name )

    res.status(201).json({
      ok: true,
      msg: 'creado',
      uid: usuario.id,
      name: usuario.name,
      token
    })

  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      smg: 'Comunicarse con el admin'
    })
  }

}





const loginUsuario = async (req, res = response) => {
  const { email, password } = req.body

  try {
    let usuario = await Usuario.findOne({ email })

    if ( !usuario) {
      return res.status(400).json({
        ok: false,
        msg: 'Usuario no existente'
      })
    }

    // Confirmamos el password
    const validPassword = bcrypt.compareSync( password, usuario.password )
    if ( !validPassword ) {
      return res.status(400).json({
        ok: false,
        msg: 'Password incorrecta'
      })
    }

    // Generar nuestro JWT
    const token = await generateJWT( usuario.id, usuario.name )

    res.status(200).json({
      ok: true,
      msg: 'login',
      uid: usuario.id,
      name: usuario.name,
      token
    })


  } catch (error) {
    console.log(error)
  }

}




const revalidarToken = async (req, res = response) => {

  const uid = req.uid
  const name = req.name

  const token = await generateJWT( uid, name )


  res.status(200).json({
    ok: true,
    msg: 'renew',
    token
  })
}


module.exports = {
  crearUsuario,
  loginUsuario,
  revalidarToken
}