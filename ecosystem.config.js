module.exports = {
  apps: [
    {
      name: "next-app",
      script: "npm",
      args: "start",
      cwd: "/root/next-studyo",
      env: {
        NODE_ENV: "production",
        PORT: 3000
      }
    }
  ]
}