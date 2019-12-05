function getCookie(name) {
    var value = '; ' + document.cookie;
    var parts = value.split('; ' + name + '=');
    if (parts.length == 2)
        return parts
            .pop()
            .split(';')
            .shift();
}

var headers = {
    ContentType: 'application/json'
};

var authHeaders = {
    ContentType: 'application/json',
    Authorization: 'Bearer ' + getCookie('totoToken')
};

async function getHealth() {
    let token = getCookie('totoToken');
    if (token === undefined || token.trim() === '') {
        console.error(`Token is undefined or empty`);
        return;
    }

    try {
        await $('#dashboardContent')
            .load('/templates/health.html')
            .promise();

        let result = await $.ajax({
            url: '/api/health',
            type: 'get',
            headers: authHeaders
        });
        console.log(result);
        setTimeout(() => {
            let html = renderHealth(result);
            $('#healthBody').html(html);
        }, 500);
    } catch (err) {
        console.error(`Get roles failed, ${err}`);
    }
}

function renderHealth(result) {
    if (result === undefined || result === null) {
        return '';
    }

    let html = '';
    html += `<div>Status: ${result.status}</div>`;
    html += `<div>Uptime: ${result.uptime}</div>`;
    html += `<div>Version: ${result.version}</div>`;
    html += `<div>Memory usage: ${result.memoryUsage}</div>`;
    html += `<div>Environment: ${result.environment}</div>`;
    html += `<div>
            <div>Machine</div>
            <div class="ml-4">Uptime: ${result.machine.uptime}</div>
            <div class="ml-4">Hostname: ${result.machine.hostname}</div>
            <div class="ml-4">Plarform: ${result.machine.platform + '-' + result.machine.arch}</div>
            <div class="ml-4">CPUs: ${result.machine.cpus}</div>
        </div>`;
    html += `<div>
        <div>Memory</div>
        <div class="ml-4">Free: ${result.memory.free} mb</div>
        <div class="ml-4">Total: ${result.memory.total} mb</div>
    </div>`;
    html += `<div>
        <div>Disk Space</div>
        <div class="ml-4">Free: ${result.diskSpace.freeGb} gb</div>
        <div class="ml-4">Size: ${result.diskSpace.sizeGb} gb</div>
    </div>`;
    return html;
}

getHealth();
