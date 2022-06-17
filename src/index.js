const express = require('express');
const morgan = require('morgan');
const path = require('path')
const app = express();

const {mongoose} = require('./database')

//Settings
app.set('port', process.env.PORT || 3000);
 
//Middlewares
app.use(morgan('dev'));
app.use(express.json());

//Routes
app.use('/api/tasks', require('./routes/routes'));

//Static files
app.use(express.static(path.join(__dirname, 'public')));

//Starting server
app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);
});