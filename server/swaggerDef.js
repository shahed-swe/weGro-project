const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'WeGro App Api Docs',
            version: '1.0.0',
            description: 'API documentation for your application',
        },
        components: {
            schemas: {
                User: {
                    type: 'object',
                    properties: {
                        username: {
                            type: 'string'
                        },
                        email: {
                            type: 'string'
                        },
                        password: {
                            type: 'string'
                        }
                    }
                },
                MusicTrack: {
                    type: 'object',
                    properties: {
                        title: {
                            type: 'string'
                        },
                        link: {
                            type: 'string'
                        },
                        thumbnail: {
                            type:'string'
                        },
                        artistName: {
                            type:'string'
                        },
                        duration: {
                            type: 'string'
                        }
                    }
                },
                Playlist: {
                    type: 'object',
                    properties: {
                        name: {
                            type: 'string'
                        },
                        owner: {
                            type: 'string',
                            format: 'uuid'
                        },
                        isPublic: {
                            type: 'string'
                        },
                        tracks: {
                            type: 'array',
                            items: {
                                type: 'string',
                                format: 'uuid' 
                            }
                        }
                    }
                }
            }
        }
    },
    apis: ['./routes/*.js'],
};

const specs = swaggerJsdoc(options);

module.exports = specs;
