function logout() {
    showOverlaySpinner();
    $.ajax({
        url: '/auth/logout',
        type: 'post',
        success: function(result) {
            // Redirect to default login page
            closeOverlaySpinner();
            window.location = '/login?type=logout';
        },
        error: function(request, msg, error) {
            //window.location = '/admin/login?type=logout';
            console.error(`Logout failed, ${error}`);
            closeOverlaySpinner();
        }
    });
}

function confirmLogout() {
    $('#logoutConfirmModal').modal('show');
}