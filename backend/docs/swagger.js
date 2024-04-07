import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
const swaggerInit = (app) => {
  const options = {
    swaggerDefinition: {
      openapi: "3.0.0",
      info: {
        title: "My API",
        version: "1.0.0",
        description: "My REST API",
      },
      servers: [
        {
          url: "http://localhost:8000",
        },
      ],
    },
    apis: ["./api/*.js", "./docs/*.yml", "./docs/*.yaml"],
  };

  const specs = swaggerJsdoc(options);

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
};

export default swaggerInit;
