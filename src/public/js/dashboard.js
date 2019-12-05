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
    html += `<div>
        <div class="data-group">Machine</div>
        <div class="data-item ml-2">Uptime: ${result.machine.uptime}</div>
        <div class="data-item ml-2">Hostname: ${result.machine.hostname}</div>
        <div class="data-item ml-2">Plarform: ${result.machine.platform + '-' + result.machine.arch}</div>
        <div class="data-item ml-2">CPUs: ${result.machine.cpus}</div>
    </div>`;
    let memoryPercent = result.memory.free * 100 / result.memory.total;
    html += `<div>
        <div class="data-group">Memory</div>
        <div class="data-item ml-2">${result.memory.free} <span class="text-muted">MB free of</span> 
            ${result.memory.total} <span class="text-muted">MB</span></div>
        <div class="progress ml-2">
            <div class="progress-bar bg-success" role="progressbar" style="width: ${memoryPercent}%;"
                aria-valuenow="${memoryPercent}" 
                aria-valuemin="0" aria-valuemax="100">${memoryPercent.toFixed(0)}%</div>
        </div>
    </div>`;
    let diskSpacePercent = result.diskSpace.freeGb * 100 / result.diskSpace.sizeGb;
    html += `<div>
        <div class="data-group">Disk space</div>
        <div class="data-item ml-2">Disk path: ${result.diskSpace.diskPath}</div>
        <div class="data-item ml-2">${result.diskSpace.freeGb} <span class="text-muted">GB free of</span> 
            ${result.diskSpace.sizeGb} <span class="text-muted">GB</span></div>
        <div class="progress ml-2">
            <div class="progress-bar bg-success" role="progressbar" style="width: ${diskSpacePercent}%;"
                aria-valuenow="${diskSpacePercent}" 
                aria-valuemin="0" aria-valuemax="100">${diskSpacePercent.toFixed(0)}%</div>
        </div>
    </div>`;
    html += `<div>
        <div class="data-group">App</div>
        <div class="data-item ml-2">Status: ${result.status}</div>
        <div class="data-item ml-2">Uptime: ${result.uptime}</div>
        <div class="data-item ml-2">Version: ${result.version}</div>
        <div class="data-item ml-2">Memory usage: ${result.memoryUsage} MB</div>
        <div class="data-item ml-2">Environment: ${result.environment}</div>
    </div>`;
    return html;
}

getHealth();
