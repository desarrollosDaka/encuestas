module.exports = {
  apps : [{
    name   : "DAKA_ENCUESTAS",
    script : "./index.js",
    max_memory_restart: '300M',
    env_production: {
       NODE_ENV: "production",
       PORT: 4000,
       DB_SERVER:process.env.DB_SERVER,
       DB_NAME:process.env.DB_NAME,
       DB_USER:process.env.DB_USER,
       DB_PASSWORD:process.env.DB_PASSWORD,
       DB_PORT:process.env.DB_PORT
    }
  }]
}