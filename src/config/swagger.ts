import swaggerJSDoc from "swagger-jsdoc";
import dotenv from "dotenv";
import { getSwaggerServer } from "../startups/getSwaggerServer";

dotenv.config();

const swaggerServer = getSwaggerServer();

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "DevJobs API Documentation",
      version: "1.0.0",
      description: "DevJobs - Backend API",
    },
    servers: [{ url: swaggerServer }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./src/doc/*.ts", "./src/doc/*.yml"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
