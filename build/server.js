"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// ESM
const fastify_1 = __importDefault(require("fastify"));
const fastify_jwt_1 = __importDefault(require("fastify-jwt"));
const login_1 = __importDefault(require("./src/auth/login"));
const register_1 = __importDefault(require("./src/auth/register"));
const profile_1 = __importDefault(require("./src/auth/profile"));
const auth_1 = __importDefault(require("@fastify/auth"));
// -------------------------------------------------------------
// swagger
// -------------------------------------------------------------
const swagger_1 = __importDefault(require("@fastify/swagger"));
const swagger_ui_1 = __importDefault(require("@fastify/swagger-ui"));
const src_1 = __importDefault(require("./src"));
const dotenv_1 = require("dotenv");
const constants_1 = require("./src/util/constants");
const category_register_1 = require("./src/category/category.register");
// Load environment variables from .env file
(0, dotenv_1.config)();
// Define the port to listen on
const port = process.env.PORT || 3000; // Default port is 3000 if PORT is not defined in .env
const HOST = process.env.HOST || '0.0.0.0'; // Default port is 3000 if PORT is not defined in .env
const swaggerOptions = {
    swagger: {
        info: {
            title: 'My Title',
            description: 'My Description.',
            version: '1.0.0'
        },
        host: `${HOST}:${port}`,
        schemes: ['http', 'https'],
        consumes: ['application/json'],
        produces: ['application/json'],
        tags: [{ name: 'Default', description: 'Default' }]
    }
};
const swaggerUiOptions = {
    routePrefix: '/docs',
    exposeRoute: true
};
// -------------------------------------------------------------
// swagger end
// -------------------------------------------------------------
const app = (0, fastify_1.default)({
    logger: true
});
// -------------------------------------------------------------
// swagger
// -------------------------------------------------------------
if (constants_1.DebugModeSingleton.getInstance().isDebugMode() == false) {
    app.register(swagger_1.default, swaggerOptions);
    app.register(swagger_ui_1.default, swaggerUiOptions);
}
// -------------------------------------------------------------
// swagger end
// -------------------------------------------------------------
// Register the fastify-jwt plugin
app.register(fastify_jwt_1.default, { secret: 'supersecret' });
app.register(auth_1.default);
app.register(profile_1.default);
app.register(login_1.default);
app.register(register_1.default);
app.register(src_1.default);
(0, category_register_1.registerCategoryRoutes)(app);
app.get('/', async (request, reply) => {
    return { hello: 'world!!! thanks God' };
});
// Decorate Fastify instance with authentication method
app.decorate('authenticate', async function (request, reply) {
    try {
        await request.jwtVerify();
    }
    catch (err) {
        reply.send(err);
    }
});
/**
 * Run the server!
 */
const start = async () => {
    try {
        await app.listen(port, HOST); // Bind to 0.0.0.0
    }
    catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};
start();
exports.default = app;
