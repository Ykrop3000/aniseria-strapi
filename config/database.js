// // module.exports = ({ env }) => ({
// //   defaultConnection: "default",
// //   connections: {
// //     default: {
// //       connector: "bookshelf",
// //       settings: {
// //         client: "sqlite",
// //         filename: env("DATABASE_FILENAME", ".tmp/data.db"),
// //       },
// //       options: {
// //         useNullAsDefault: true,
// //       },
// //     },
// //   },
// // });
// const parse = require("pg-connection-string").parse;

// module.exports = ({ env }) => ({
//   defaultConnection: "default",
//   connections: {
//     default: {
//       connector: "bookshelf",
//       settings: {
//         client: "postgres",
//         host: env("DATABASE_HOST", "localhost"),
//         port: env.int("DATABASE_PORT", 5432),
//         database: env("DATABASE_NAME", "postgres"),
//         username: env("DATABASE_USERNAME", "postgres"),
//         password: env("DATABASE_PASSWORD", "root"),
//         schema: env("DATABASE_SCHEMA", "public"), // Not Required
//         ssl: false
//       },
//       options: {}
//     }
//   }
// });

// module.exports = ({ env }) => ({
//   defaultConnection: "default",
//   connections: {
//     default: {
//       connector: "bookshelf",
//       settings: {
//         client: "postgres",
//         host: env("DATABASE_HOST", "34.88.234.50"),
//         port: env.int("DATABASE_PORT", 5432),
//         database: env("DATABASE_NAME", "postgres"),
//         username: env("DATABASE_USERNAME", "postgres"),
//         password: env("DATABASE_PASSWORD", "rJl6yGvnMJpggBws"),
//       },
//       options: {}
//     }
//   }
// });

module.exports = ({ env }) => ({
  defaultConnection: "default",
  connections: {
    default: {
      connector: "bookshelf",
      settings: {
        client: "postgres",
        host: `34.78.210.108`,
        database: "postgres",
        username: "server",
        password: "rJl6yGvnMJpggBws",
        schema: "public",
        ssl: { rejectUnauthorized: false }
      },
      options: {}
    }
  }
});
