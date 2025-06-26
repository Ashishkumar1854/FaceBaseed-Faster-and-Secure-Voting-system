module.exports = {
  mongodb: {
    // Connection string to your local MongoDB instance
    connectionString: "mongodb://127.0.0.1:27017/myDatabase",
  },
  site: {
    baseUrl: "/",
    cookieSecret: "cookiesecret",
    sessionSecret: "sessionsecret",
    port: 8081,
    host: "0.0.0.0",
  },
  useBasicAuth: true,
  basicAuth: {
    username: "admin",
    password: "admin",
  },
};
