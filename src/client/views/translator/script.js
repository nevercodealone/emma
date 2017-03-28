var state = {
  presets: []
}

$(document).ready(function() {

  $('.ui.dropdown.languageselection').dropdown('set selected', 'af');

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

  $('.top input').keyup(debounce(function() {
    var phrase = $(this).val();
    getTranslation(phrase);
  }, 300));

  $('.bottom ul').on('click', 'li', function(e) {
    var text = $(this).text();
    getTranslation(text);
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


function getTranslation(phrase) {
  $('.output').hide();
  $('.cs-loader').fadeIn(50);
  var targetLanguage = $('.menu .item.selected').data('code');
  console.log(targetLanguage);

  $.ajax({
    url : "/api/translate",
    type: "GET",
    data : {phrase: phrase, language: targetLanguage},
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
