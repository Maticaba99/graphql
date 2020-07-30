"use strict";

require("dotenv").config();

const { makeExecutableSchema } = require("@graphql-tools/schema");
const { buildSchema } = require("graphql-tools");
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { readFileSync } = require("fs");
const { join } = require("path");
const resolvers = require("./lib/resolvers");

const app = express();
const port = process.env.port || 3000;

// Definiendo esquema

const typeDefs = readFileSync(
  join(__dirname, "lib", "schema.graphql"),
  "utf-8"
);
const schema = makeExecutableSchema({ typeDefs, resolvers });

// Config de resolvers

app.use(
  "/api",
  graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true,
  })
);
app.listen(port, () => {
  console.log(`El server esta en http://localhost:${port}/api`);
});
