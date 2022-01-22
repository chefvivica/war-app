const express = require('express');
const routes = require('./routes');
const app = express();
const port = 9090
const db = require('./db/models')
app.use(routes);




db.sequelize.authenticate()
    .then(() => {
        console.log('db connected. Sequelize is ready to use.')
        app.listen(port, () => console.log(`listening ${port}`))
    })
    .catch((err) => {
        console.log('db connection failed');
        console.error(err);
    })

module.exports = app
