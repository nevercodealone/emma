
$(document).ready(function() {

  $('.ui.dropdown').dropdown();

  $('.top input').keyup(debounce(function() {
    var phrase = $(this).val();
    getTranslation(phrase);
  }, 300));

})


function getTranslation(phrase) {
  $('.output').hide();
  $('.cs-loader').fadeIn(50);

  $.ajax({
    url : "/api/translate",
    type: "POST",
    data : {phrase: phrase},
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
