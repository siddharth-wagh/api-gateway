const express = require('express');
const app = express();
const morgan = require('morgan');
const PORT = 3005;
const { createProxyMiddleware } = require('http-proxy-middleware');
const { rateLimit } =  require('express-rate-limit');

app.use(morgan('combined'));

const limiter = rateLimit({
	windowMs: 2 * 60 * 1000, // 15 minutes
	limit: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	
});
app.use(limiter)
app.get('/home',(req,res)=>{
    return res.json({message:"OK"});
})
const apiProxyBooking = createProxyMiddleware({
    target: 'http://localhost:3002/bookingservice',
    changeOrigin: true,
  });
//   const apiProxyFlights = createProxyMiddleware({
//     target: 'http://localhost:3000/flightservice',
//     changeOrigin: true,
//   });
//   const apiProxyAuth= createProxyMiddleware({
//     target: 'http://localhost:3000/auth',
//     changeOrigin: true,
//   });
//   const apiProxyRem= createProxyMiddleware({
//     target: 'http://localhost:3000/reminder',
//     changeOrigin: true,
//   });
const middleware = require('./authmiddleware');
//
app.use('/bookingservice',middleware,apiProxyBooking);
// app.use('/flightservice',apiProxyFlights);
// app.use('/authservice',apiProxyAuth);
// app.use('/reminderservice',apiProxyRem);

app.listen(PORT,()=>{
    console.log(`Server listening at port ${PORT}`);
})