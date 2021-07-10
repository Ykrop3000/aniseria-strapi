module.exports = ({ env }) => ({
  defaultConnection: "default",
  connections: {
    default: {
      connector: "bookshelf",
      settings: {
        client: "postgres",
        host: `34.77.136.70`,
        database: "postgres",
        username: "postgres",
        password: "rJl6yGvnMJpggBws",
        schema: "public",
        ssl: { rejectUnauthorized: false }
      }
    }
  }
});
