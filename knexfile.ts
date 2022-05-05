const isDev = process.env.NODE_ENV === "development";

export default {
  development: {
    client: "pg",
    connection: {
      host: "localhost",
      user: "postgres",
      password: "",
      database: `life-portrayal${isDev ? "-dev" : ""}`
    },
    seeds: {
      directory: "./db/seeds"
    }
  }
};
