import Hapi from '@hapi/hapi';
import {routes} from  './routes.js'

const init = async () => {
    const server = Hapi.server({
        port: 9000,
        host: 'localhost',
        routes: {
            cors: {
                origin: ['http://notesapp-v1.dicodingacademy.com'],
                additionalHeaders: ['Access-Control-Allow-Origin', 'Access-Control-Allow-Credentials', 'Access-Control-Allow-Headers', 'Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
                headers: ['Authorization', 'Content-Type'],
                exposedHeaders: ['X-Request-Id'],
                credentials: true
            },
            payload: {
                parse: true,
                output: 'data',
            }
        }
    });
    
    // Inisiasi routes
    server.route(routes);

    // Mulai server
    await server.start();
    console.log('Server running on %s', server.info.uri);
    
    return server; 
};

// Panggil fungsi init
init().catch(err => {
    console.error(err);
});
