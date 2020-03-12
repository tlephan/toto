function disableLoginComponents() {
    // Disable and animation for login button
    let html = `<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
            Log in`;
    $('#login-button').html(html);
    $('#login-button').prop('disabled', true);
    $('#username-input').prop('disables', true);
    $('#password-input').prop('disables', true);
}

function enableLoginComponents() {
    let html = `Log in`;
    $('#login-button').html(html);
    $('#login-button').prop('disabled', false);
    $('#username-input').prop('disables', false);
    $('#password-input').prop('disables', false);
}

function loginOnClick() {
    // Close alerts if there are any
    closeDangerAlert();

    var username = $('#username-input').val();
    if (username.trim() === '') {
        $('#username-invalid-feedback').css('display', 'block');
        return;
    } else {
        $('#username-invalid-feedback').css('display', 'none');
    }

    var password = $('#password-input').val();
    if (password.trim() === '') {
        $('#password-invalid-feedback').css('display', 'block');
        return;
    } else {
        $('#password-invalid-feedback').css('display', 'none');
    }

    disableLoginComponents();

    let data = {
        username: username,
        password: password,
        isDashboard: true
    };
    $.ajax({
        url: '/api/auth/local',
        type: 'post',
        data: data,
        headers: {
            contentType: 'application/json'
        },
        dataType: 'json',
        success: function(result) {
            enableLoginComponents();
            window.location = '/dashboard';
        },
        error: function(request, msg, error) {
            enableLoginComponents();
            console.error(`Login failed, ${error}`);
            if (error === 'Bad Request') {
                showDangerAlert('Incorrect username or password');
            } else {
                console.error(`Login failed, ${error}`);
                showDangerAlert(`Login failed, an error happened`);
            }
        }
    });
}

function loginOnKeyPress(event) {
    if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();

        loginOnClick();
    }
}
