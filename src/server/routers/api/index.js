const express = require('express');
const axios = require('axios');

const User = require('../../database/models/User');
const Phrase = require('../../database/models/Phrase');
const Preset = require('../../database/models/Preset');

const apiRouter = express.Router();


// -> /api routes

apiRouter.get('/translate', function(req, res) {

  const googleApiKey = process.env.googleApiKey;

  let phrase = req.query.phrase;
  let targetLn = req.query.language;
  let sourceLn = 'de';

  let phraseEncoded = encodeURIComponent(phrase);

  if (!phrase) {
    res.json({
      success: false,
      message: 'No phrase provided'
    })
  }

  if (!targetLn) {
    res.json({
      success: false,
      message: 'No target language provided'
    })
  }

  const googleEndpoint = `https://translation.googleapis.com/language/translate/v2?key=${googleApiKey}&source=${sourceLn}&target=${targetLn}&q=${phraseEncoded}`;

  axios.get(googleEndpoint)
    .then((response) =>  {
      let translatedText = response.data.data.translations[0].translatedText;

      res.json({
        success: true,
        german: phrase,
        translation: translatedText,
        language: targetLn
      })
    })
    .catch((error) => {
      console.log(error);
      res.json({
        success: false,
        message: 'Error fetching the google API'
      })
    })


})


apiRouter.post('/phrase', (req, res) => {

  // TODO: validate

  var text = 'Wie geht es Ihnen?';

  Phrase
    .forge({
      text: text
    })
    .save()
    .then(phrase => {
      return res.json({
        success: true,
        text: text
      })
    })
    .catch(err => {
      console.log(err);
    })

})

apiRouter.get('/phrases', (req, res) => {
  // return all phrases

  Phrase
    .fetchAll()
    .then(phrases => {
      return res.json(phrases.toJSON());
    })
})

apiRouter.get('/presets', (req, res) => {
  // return all presets as arrays with phrases
  Preset
    .forge()
    .fetchAll()
    .then(presets => {
      let p = presets.map(preset => preset.phrasesForClient());
      Promise.all(p)
        .then(presetsPhrases => {
          return res.json(presetsPhrases);
        })
    })
    .catch(err => {
      console.log(err);
      return res.json({
        succes: false,
        message: 'Nope!'
      })
    })
})

apiRouter.get('/presets/:id', (req, res) => {
  const { id } = req.params;

  Preset
    .forge({ id })
    .fetch()
    .then(preset => {
      preset.phrasesForClient()
        .then(phrases => {
          return res.json(phrases);
        })
    })
    .catch(err => {
      console.log(err);
      return res.json({
        succes: false,
        message: 'Nope!'
      })
    })
})

module.exports = apiRouter;
