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
    components: {
        schemas: {
            LoginDto: {
                email: "",
                password: ""
            },
            CreateRoleDto: {
                name: ""
            },
            CreateRestaurantDto: {
                name: "",
                location: "",
                photoCover: "",
                speciality: [""]
            },
            CreateUserDto:{
                username:"",
                email:"",
                password:"",
                phoneNumber:"",
                roleName:""

            }
        }
    }
    ,
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

swaggerAutogen({ openapi: '3.0.0', autoQuery: false })(outputFile, routes, doc).then(async () => {
    await import('./../server');
});