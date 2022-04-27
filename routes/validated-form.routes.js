const router = require("express").Router()
const mongoose = require('mongoose')

const Thing = require('../models/Thing.model')
const { formatError } = require("../utils")



// Validated form (render)
router.get("/formulario", (req, res, next) => res.render("validated-form"))

// Validated form (handle)
router.post('/formulario', (req, res, next) => {

  const { name, email, imageUrl, rating, code } = req.body

  Thing
    .create({ name, email, imageUrl, rating, code })
    .then(createdThing => res.json(createdThing))
    .catch(error => {
      error instanceof mongoose.Error.ValidationError ? res.render('validated-form', { errorMessage: formatError(error) }) : next(error)
    })
})

module.exports = router