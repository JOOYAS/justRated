const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')
const cookieParser = require('cookie-parser')

const userRoutes = require('./routes/user_router');
const movieRoutes = require('./routes/movies_router');
const reviewRoutes = require('./routes/reviews_router');
const personRoutes = require('./routes/person_router');
const favouritesRoutes = require('./routes/favourites_router');
const watchlistRoutes = require('./routes/watchlist_router');
const authRoutes = require('./routes/auth_router');
const dbConnect = require('./config/db_connection');

const PORT = process.env.PORT;
// const allowedOrigins = {
//     development: //"http://localhost:5173",
//     production: process.env.FRONTEND_URL
// };
app.use(cors())
// app.use(cors({
//     origin: allowedOrigins[process.env.NODE_ENV],
//     credentials: true
// }));
app.use(cookieParser())
app.use(express.json())

app.all('{*splat}', (req, res, next) => {
    console.log(`>Request:, ${req.method}->  ${req.path}`);
    next();
});




//routes

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/movies', movieRoutes);
app.use('/reviews', reviewRoutes);
//app.use('/favourites', favouritesRoutes);  // no need
app.use('/watchlist', watchlistRoutes);
app.use('/person', personRoutes);
app.get('/', (req, res) => {
    res.send(`API is working, choose /user -or- /movies`)
});
//for invalid routes
app.use((req, res) => {
    res.status(404).json({ error: "Route/Path didn't exist" })
})

dbConnect();
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
})

