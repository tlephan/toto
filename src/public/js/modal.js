function showConfirmModal(message) {
    if (message === undefined || message === null) {
        message = 'Not found message';
    }

    let html = '';
    html += `<span>${message}</span>`;
    $('#confirmModalMessage').html(html);
    $('#confirmModal').modal('show');
}

function showErrorModal(message) {
    if (message === undefined || message === null) {
        message = 'An error happened';
    }

    let html = '';
    html += `<span>${message}</span>`;
    $('#errorModalMessage').html(html);
    $('#errorModal').modal('show');
}

function showWarnModal(message) {
    if (message === undefined || message === null) {
        message = 'Not found message';
    }

    let html = '';
    html += `<span>${message}</span>`;
    $('#warnModalMessage').html(html);
    $('#warnModal').modal('show');
}