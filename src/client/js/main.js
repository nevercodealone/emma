(function($) {
    "use strict";

    // Options for Message
    //----------------------------------------------
    var options = {
        'btn-loading': '<i class="fa fa-spinner fa-pulse"></i>',
        'btn-success': '<i class="fa fa-check"></i>',
        'btn-error': '<i class="fa fa-remove"></i>',
        'msg-success': 'Alles ok! Redirecting...',
        'msg-error': 'Falsche Eingaben!',
        'useAJAX': true,
    };

    // Login Form
    //----------------------------------------------
    // Validation
    $("#login-form").validate({
        rules: {
            email: "required",
            password: "required",
        },
        errorClass: "form-invalid"
    });

    // Form Submission
    $("#login-form").submit(function() {
        remove_loading($(this));

        if(options['useAJAX'] == true)
        {
            // Dummy AJAX request (Replace this with your AJAX code)
            // If you don't want to use AJAX, remove this
            doLogin($(this));

            // Cancel the normal submission.
            // If you don't want to use AJAX, remove this
            return false;
        }
    });

    // Loading
    //----------------------------------------------
    function remove_loading($form)
    {
        $form.find('[type=submit]').removeClass('error success');
        $form.find('.login-form-main-message').removeClass('show error success').html('');
    }

    function form_loading($form)
    {
        $form.find('[type=submit]').addClass('clicked').html(options['btn-loading']);
    }

    function form_success($form)
    {
        $form.find('[type=submit]').addClass('success').html(options['btn-success']);
        $form.find('.login-form-main-message').addClass('show success').html(options['msg-success']);
    }

    function form_failed($form)
    {
        $form.find('[type=submit]').addClass('error').html(options['btn-error']);
        $form.find('.login-form-main-message').addClass('show error').html(options['msg-error']);
    }

    function doLogin($form)
    {
        if($form.valid())
        {
            form_loading($form);

            $.ajax({
                type: 'POST',
                url: '/login/',
                data: $form.serialize(),   // I WANT TO ADD EXTRA DATA + SERIALIZE DATA
                success: function(data){
                    if(data.success) {
                        form_success($form)
                    } else {
                        form_failed($form)
                    }
                    console.log('ajax:', data);
                }
            });

        }
    }

})(jQuery);