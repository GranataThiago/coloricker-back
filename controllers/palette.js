const Clarifai = require('clarifai');
require('dotenv').config();

const app = new Clarifai.App({
    apiKey: process.env.API_KEY
});

const handleApi = (req, res) => {
    app.models.predict('eeed0b6733a644cea07cf4c60f87ebb7', req.body.input)
    .then(data => {
        res.json(data)
    })
    .catch(err => {
        res.status(400).json("Unable to work with the image")
    })
}


const getPalettes = (req, res, db) => {
    const { id } = req.params
    console.log(req.headers)
    db('user_palettes').select('*')
        .where('user_id', '=', id)
        .then(palettes => {
            res.json(palettes)
        })
        .catch(err => {
            res.status(400).json('Error while getting user palettes')
        })
}

const addPalette = (req, res, db) => {

    const { name, colors, user_id } = req.body

    db('user_palettes')
        .insert({
            'nombre': name,
            'colors': colors,
            'user_id': user_id
        })
        .then(palette => {
            res.json(palette[0])
        })
        .catch(err => {
            res.status(400).json('Error while saving palette')
        })
}

module.exports = {
    getPalettes,
    addPalette,
    handleApi
}