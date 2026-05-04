import express from "express";
import http, { createServer } from "node:http";
import { encounterRoutes } from "./encounters/encounter.routes";
import { attachEncounterWebSocket } from "./encounters/encounter.websocket";

import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

const app = express();

// Parse JSON request bodies before requests reach any API routers.
app.use(express.json());

// Generate documentation based on express routes
const spec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Encounter API",
      version: "0.1.0",
    },
  },
  apis: ["server/**/*.routes.ts"],
});

// Serve swagger documentation
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(spec));

// Serve generated AsyncAPI WebSocket documentation.
app.use("/api/async-docs", express.static("dist/asyncapi"));

// Encounters are the only mounted API module at the moment.
app.use("/api/encounters", encounterRoutes);

const server = http.createServer(app);

// Attach live encounter updates to the same HTTP server Express uses.
attachEncounterWebSocket(server);

server.listen(3001, () => {
  console.log("API listening on http://localhost:3001");
  console.log("Swagger docs available: http://localhost:3001/api/docs");
  console.log("AsyncAPI docs available: http://localhost:3001/api/async-docs");
});
