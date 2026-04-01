import { Router } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const option = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Koda B6 Backend API",
            version: "1.0.0",
            description: "API Documentation for Koda B6 Backend Node.js project",
        },
        servers: [
            {
                url: "http://localhost:3000",
                description: "Development server",
            },
        ],
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
    apis: ["./src/routes/*.js", "./src/controllers/*.js"],

}

const docs = swaggerJSDoc(option)

const docsRouter = Router()

docsRouter.use("/docs", swaggerUi.serve, swaggerUi.setup(docs))

export default docsRouter;