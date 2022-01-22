module.exports = {
    environment: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 8080,
    db: {
        username: 'chefvivica',
        password: '123',
        database: 'war_app',
        host: 'localhost'
    }
}
