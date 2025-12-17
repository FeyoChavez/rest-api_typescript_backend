import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerUiOptions } from "swagger-ui-express";

const options : swaggerJSDoc.Options = {
    swaggerDefinition: {
        openapi: '3.0.2',
        tags: [
            {
                name: 'Products',
                description: 'API operations related to products'
            }
        ],
        info: {
            title: 'REST API Node.js / Express / TypeScript',
            version: '1.0.0',
            description: "API Docs for Products"
        }
    },

    apis: ['./src/router.ts']
}

const swaggerSpec = swaggerJSDoc(options)

const swaggerUiOptions: SwaggerUiOptions = {
  customCss: `
    /* Oculta el logo SVG original de Swagger */
    .topbar-wrapper .link svg {
      display: none !important;
    }

    /* Inserta tu logo personalizado */
    .topbar-wrapper .link::before {
      content: "";
      display: inline-block;
      background: url('https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/26a1.svg') no-repeat center;
      background-size: contain;
      width: 120px;
      height: 60px;
    }

    /* Cambia el color del header */
    .swagger-ui .topbar {
      background-color: #2b3b45 !important;
    }
  `,
  customSiteTitle: 'Documentación REST API - Express / TypeScript',
  customfavIcon: 'https://www.svgrepo.com/show/512247/settings-gear.svg'
};

export default swaggerSpec

export {
    swaggerUiOptions
}