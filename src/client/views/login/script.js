
$(document).ready(function() {

  $('.loginform button').on('click', function(e) {

    // e.stopPropagation();
    e.preventDefault();

    console.log('click')

    var e = $('#email').val();
    var p = $('#password').val();

    console.log(p);

    $.ajax({
      url : "/auth_user",
      type: "POST",
      data : {
        email: e,
        password: p
      },
      success: function(data)
      {
          //data - response from server
          console.log(data);
          if (data.auth_token) {
            createCookie('auth_token', data.auth_token, 1);
            window.location.replace("/translations");
          }

      },
      error: function ()
      {
        console.log('error');
      }
    })

  })


})
