// ./pm2/ecosystem.config.cjs
module.exports = {
  apps: [
    {
      name: "clustered-app",
      script: "dist/server.js",
      instances: "max",
      exec_mode: "cluster",
      env: {
        NODE_ENV: "production",
        PORT: 4000,
      },
      max_memory_restart: "500M",
      min_uptime: "10s",
      max_restarts: 10,
    },
  ],
};
