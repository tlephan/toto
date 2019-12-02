module.exports = {
    apps: [
        {
            name: 'toto',
            script: 'npm start',
            exec_mode: 'fork',

            instances: 1,
            autorestart: true,
            watch: false,
            max_memory_restart: '1G',
            env: {
                NODE_ENV: 'development'
            },
            env_staging: {
                NODE_ENV: 'staging'
            },
            env_production: {
                NODE_ENV: 'production'
            }
        }
    ]
};
