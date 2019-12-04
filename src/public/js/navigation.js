function logout() {
    showOverlaySpinner();
    $.ajax({
        url: '/auth/adminLogout',
        type: 'get',
        success: function(result) {
            // Redirect to default login page
            sessionStorage.removeItem('user');
            closeOverlaySpinner();
            window.location = '/admin/login?type=logout';
        },
        error: function(request, msg, error) {
            //window.location = '/admin/login?type=logout';
            console.error(`Login failed, ${error}`);
            closeOverlaySpinner();
        }
    });
}

function confirmLogout() {
    $('#logoutConfirmModal').modal('show');
}