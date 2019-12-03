function showDangerAlert(message) {
    $('#danger-alert-message').html(message);
    $('#danger-alert-container').css('display', 'block');
}

function closeDangerAlert() {
    $('#danger-alert-container').css('display', 'none');
}