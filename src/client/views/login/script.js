
$(document).ready(function() {

  $('.loginform button').on('click', function(e) {

    // e.stopPropagation();
    e.preventDefault();

    console.log('click')

    var e = $('#email').val();
    var p = $('#password').val();

    console.log(p);

    $.ajax({
      url : "/login",
      type: "POST",
      data : {
        email: e,
        password: p
      },
      success: function(data)
      {
          console.log(data);
          if (data.token) {
            createCookie('token', data.token, 1);
            window.location = '/translator';
          }

      },
      error: function ()
      {
        console.log('error');
      }
    })

  })


})
