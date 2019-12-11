function dispatchRoute() {
    let url = window.location.href.toLowerCase();
    let splits = url.split('/');
    let route = '';
    let action = '';
    if (splits.length > 4) {
        route = splits[4];
    }
    if (splits.length > 5) {
        action = splits[5];
        if (action.includes('?')) {
            action = action.split('?')[0];
        }
    }
    console.log(`Route: ${route}`);
    console.log(`Action: ${action}`);
    switch (route) {
        case 'reset-password':
            gotoResetPassword();
            break;
        case 'static': 
            gotoStaticResource();
            break;
        default:
            gotoHealth();
            break;
    }
}

dispatchRoute();
