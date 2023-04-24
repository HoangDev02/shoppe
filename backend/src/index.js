const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser')
const session = require('express-session')
const methodOverride = require('method-override')
const dotenv = require('dotenv');
const app = express()
const morgan = require('morgan');
const handlebars = require('express-handlebars');

const connect = require("../src/app/connect/connect")

//router
const userRouter = require('./router/userRouter')
const categoriesRouter = require('./router/categoriesRouter')
const porductRouter = require('./router/productRouter')
const homeRouter = require('./router/homeRouter')
const cart = require('./router/cartRouter')
const port = 3000;
dotenv.config()

app.use(cookieParser())

//change text in jason
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

app.use(methodOverride('_method'))
app.use(morgan('combined'))

app.engine('hbs', 
  handlebars.engine({
  extname: '.hbs',
  helpers: {
    // sum: (a, b) => a+ b
  }
}));
  app.set('view engine', 'hbs');
  app.set('views', path.join(__dirname, 'resource', 'views'));

//router
app.use('/user', userRouter)
app.use('/category', categoriesRouter)
app.use('/product', porductRouter)
app.use('/', homeRouter)
app.use('/cart', cart)


app.listen(port, () => {
    connect()
    console.log(`Example app listening on port ${port}`)
})