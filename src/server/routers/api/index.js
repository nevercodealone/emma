const express = require('express');
const axios = require('axios');

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

module.exports = apiRouter;
