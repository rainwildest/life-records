export default {
  development: {
    client: "pg",
    connection: {
      host: "localhost",
      user: "postgres",
      password: "",
      database: "life-portrayal"
    },
    seeds: {
      directory: "./db/seeds"
    }
  }
};
