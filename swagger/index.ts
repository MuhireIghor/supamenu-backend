import swaggerAutogen from "swagger-autogen";
const doc = {
    info: {
        version: '1.0.0',
        title: 'NE Preparation MS API',
        description: ''
    },
    host: 'localhost:4000',
    basePath: '/api/v1',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
        {
            name: 'User',
            description: 'Authentication endpoints'
        },
        {
            name: 'Roles',
            description: 'Roles endpoints'
        },
        {
            name: 'Restaurants',
            description: 'Restaurants endpoints'
        },
        {
            name: 'Auth',
            description: 'Auth endpoints'
        },
    ],
    securityDefinitions: {
        bearerAuth: {
            type: 'apiKey',
            name: 'Authorization',
            in: 'header'
        }
    },
    definitions: {}
}

const outputFile = './swagger/doc/swagger.json';
const routes = ['./routes/index.ts'];

swaggerAutogen()(outputFile, routes, doc).then(async () => {
    await import('./../server');
});