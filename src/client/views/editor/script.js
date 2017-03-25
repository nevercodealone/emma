var drake;

$(document).ready(function() {



    $('.ui.dropdown').dropdown();
    init();



  drake = dragula([document.querySelector('.phrases ul'), document.querySelector('.presets ul')], {
    copy: function (el, source) {
      return source === document.querySelector('.phrases ul')
    },
    accepts: function (el, target) {
      return target !== document.querySelector('.phrases ul')
    },
    removeOnSpill: function(el, target) {

    }
  });

  drake.on('drop', function(el, target, source) {
    domPhrasesToState();
  })

  drake.on('remove', function(el, container, source) {
    domPhrasesToState();
  })

  $('.phrases button').on('click', function() {
    if ($('.phrases input').val() != '') {
      addPhrase();
    }
  })

  $('.phrases input').on('keyup', function(e) {
    if (e.keyCode == 13) {
      $('.phrases button').click();
    }
  })

  $('.presets button').on('click', function() {
    if ($('.presets input').val() != '') {
      addPreset();
    }
  })

  $('.presets input').on('keyup', function(e) {
    if (e.keyCode == 13) {
      $('.presets button').click();
    }
  })

  $('.phrases ul').on('click', 'li', function(e) {
    phraseToPreset($(e.target))
  })

  $('.selectedpreset').on('click', function(e) {
    $('.presetlist').toggle();
  })

  $('.presetlist').on('click', 'li', function(e) {
    $('.selectedpreset span').text($(this).text());
    $('.selectedpreset').data('id', $(this).data('id'));
    // find preset from id
    var id = $(this).data('id');
    var preset;
    for (var i=0; i<state.presets.length; i++) {
      if (state.presets[i].id == id) {
        preset = state.presets[i];
        break;
      }
    }
    changePresetView(preset);
    $('.presetlist').hide();
  })


})



function addPhrase(txt) {
  var id = $('.phrases ul li').length + 1;
  var phrase = $('.phrases input').val();

  if (txt) phrase = txt;

  $('.phrases input').val('');

  if (!txt) {
    // if added from ui input
    state.phrases.push({
      id: id,
      text: phrase
    })
    var phraseLi = $('<li data-id="'+ id +'" class="item glow">' + phrase + '</li>');
    $('.phrases ul').prepend(phraseLi);
    setTimeout(function() {
      $(phraseLi).removeClass('glow');
    }, 1500)
  } else {
    var phraseLi = $('<li data-id="'+ id +'" class="item">' + phrase + '</li>');
    $('.phrases ul').prepend(phraseLi);
  }



}



function phraseToPreset(phraseLi) {

  var newLi = $(phraseLi).clone();
  $('.presets ul').append(newLi);
  $(newLi).addClass('glow');
  setTimeout(function() {
    $(newLi).removeClass('glow');
  }, 1500)

  domPhrasesToState();

}

function domPhrasesToState() {
  // find preset
  var presetID = $('.selectedpreset').data('id');
  var preset;
  for (var i=0; state.presets.length; i++) {
    if (state.presets[i].id == presetID) {
      preset = state.presets[i];
      break;
    }
  }

  var phrases = [];
  $('.presets ul li').each(function(index, element) {
    var id = $(element).data('id');
    var text = $(element).text();
    phrases.push({
      id: element,
      text: text
    });
  })

  preset.phrases = phrases;
}

function addPreset(preset) {
  var name;
  var id;
  // STATE
  if (!preset) {
    id = state.presets.length + 1;
    name = $('.presets input').val();
    state.presets.push({
      id: id,
      name: name,
      phrases: []
    })

    // UI
    $('.selectedpreset span').text(name);
    $('.presets input').val('');
    $('.presets ul').empty();
  } else {
    name = preset.name;
    id = preset.id;
  }

  var presetLi = '<li data-id="' + id + '">' + name + '</li>';
  $('.presetlist').append(presetLi);


}

function changePresetView(preset) {
  // display all phrases for that preset
  $('.selectedpreset').attr('data-id', preset.id);
  $('.selectedpreset span').text(preset.name);
  console.log($('.selectedpreset span'))
  console.log(preset);
  $('.presets ul').empty();
  preset.phrases.forEach(function(phrase) {
    var phraseLi = $('<li class="item">' + phrase.text + '</li>');
    $('.presets ul').append(phraseLi);
  })
}



function init() {
  // create ui from state
  console.log('initializing...')

  changePresetView(state.presets[0]);

  state.phrases.forEach(function(phrase) {
    addPhrase(phrase.text);
  })

  state.presets.forEach(function(preset) {
    addPreset(preset);
  })
}


var state = {
  phrases: [
    {
      id: 1,
      text: 'Woher kommst du?'
    },
    {
      id: 2,
      text: 'Wie lang bist du schon hier?'
    },
    {
      id: 3,
      text: 'Wie alt bist du?'
    },
    {
      id: 4,
      text: 'Was möchtest du essen?'
    },
    {
      id: 5,
      text: 'Wann möchtest du essen?'
    }
  ],
  presets: [
    {
      id: 1,
      name: 'Anmeldung',
      phrases: [

      ]
    },
    {
      id: 2,
      name: 'Essensausgabe',
      phrases: [

      ]
    }
  ]

}
