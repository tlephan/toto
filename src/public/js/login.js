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

function usernameOnKeyUp() {
    var username = $('#username-input').val();
    if (/\s/.test(username)) {
        $('#username-invalid-feedback').css('display', 'block');
        $('#username-invalid-feedback').html('Username cannot contain any space character');
        $('#login-button').prop('disabled', true);
    } else {
        $('#username-invalid-feedback').css('display', 'none');
        $('#login-button').prop('disabled', false);
    }
}

function passwordOnKeyUp() {
    var password = $('#password-input').val();
    if (/\s/.test(password)) {
        $('#password-invalid-feedback').css('display', 'block');
        $('#password-invalid-feedback').html('Password cannot contain any space character');
        $('#login-button').prop('disabled', true);
    } else {
        $('#password-invalid-feedback').css('display', 'none');
        $('#login-button').prop('disabled', false);
    }
}

function loginOnClick() {
    // Close alerts if there are any
    closeDangerAlert();

    // Check username is empty
    var username = $('#username-input').val();
    if (username.trim() === '') {
        $('#username-invalid-feedback').css('display', 'block');
        $('#username-invalid-feedback').html('Please enter your username');
        return;
    } else {
        $('#username-invalid-feedback').css('display', 'none');
    }

    // Check password is emtpy
    var password = $('#password-input').val();
    if (password.trim() === '') {
        $('#password-invalid-feedback').css('display', 'block');
        $('#password-invalid-feedback').html('Please enter your password');
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

function loginOnKeyDown(event) {
    if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();

        loginOnClick();
    }
}
