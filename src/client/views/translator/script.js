var state = {
  presets: []
}

$(document).ready(function() {

  $('.ui.dropdown.languageselection').dropdown('set selected', 'af');

  $('.languageselection').on('change', function() {
    var phrase = $('.top input').val();

    setTimeout(function() {
      var targetLanguage = $('.menu .item.selected').data('code');
      getTranslation(phrase, targetLanguage);
    }, 10)

  })

  getPresetData(function(presets) {
    state.presets = presets;
    $('.bottom h2').text(presets[0].name);
    $('.bottom ul').empty();
    presets[0].phrases.forEach(function(phrase) {
      var phraseLi = '<li>' + phrase.text + '</li>';
      $('.bottom ul').append(phraseLi);
    })
    $('.bottom').show();
  })

  $('.top input.main').keyup(debounce(function() {
    var phrase = $(this).val();
    var targetLanguage = $('.menu .item.selected').data('code');
    getTranslation(phrase, targetLanguage);
  }, 300));

  $('.bottom ul').on('click', 'li', function(e) {
    var text = $(this).text();
    $('.top input.main').val(text);
    var targetLanguage = $('.menu .item.selected').data('code');
    getTranslation(text, targetLanguage);
  })

})

function getPresetData(callback) {
  $.ajax({
    url : "/api/presets",
    type: "GET",
    success: function(data)
    {
      if (callback) {
        callback(data);
      }
    },
    error: function ()
    {
      console.log('error');
    }
  })
}


function getTranslation(phrase, languageCode) {
  $('.output').hide();
  $('.cs-loader').fadeIn(50);


  $.ajax({
    url : "/api/translate",
    type: "GET",
    data : {phrase: phrase, language: languageCode},
    success: function(data)
    {
        //data - response from server
        console.log(data);
        updateTranslationDisplay(data);
    },
    error: function ()
    {

    }
    })
    .done(function() {
      $('.cs-loader').fadeOut(50);
      setTimeout(function() {
        $('.output').fadeIn();
      }, 50)

  })
}

function updateTranslationDisplay(data) {
  $('.content .german').text(data.german);
  $('.content .translation').text(data.translation);
}
