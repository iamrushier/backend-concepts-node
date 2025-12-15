// src/docs/swagger.ts
import swaggerJSDoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Sample API",
      version: "1.0.0",
      description: "API documentation using Swagger",
    },
  },
  apis: ["./src/routes/*.ts"],
});
