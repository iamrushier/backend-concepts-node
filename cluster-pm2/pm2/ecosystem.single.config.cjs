// ./pm2/ecosystem.single.config.cjs
module.exports = {
  apps: [
    {
      name: "single-instance",
      script: "dist/server.js",
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
        PORT: 4000,
      },
    },
  ],
};
