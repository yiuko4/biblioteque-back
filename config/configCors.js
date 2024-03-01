const configCors = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: false,
    allowedHeaders: 'Content-Type,X-API-Key,X-Organization-Id,Authorization',
}; 

export default configCors;