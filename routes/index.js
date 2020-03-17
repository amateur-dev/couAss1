const routes = require('express').Router();

const dishRouter = require('./dishRouter');
const leaderRouter = require('./leaderRouter');
const promotionRouter = require('./promotionRouter');

routes.get('/', (req, res)=>{
    res.status(200,{"Content-Type":"text/html"});
    res.end("<html>Thank you for visting the landing page.  Please visit the following links for individual pages:" + "<br>"
    + "<a href=/dishes>dishes</a> <br>"
    + "<a href=/leader>leader</a> <br>"
    + "<a href=/promotion>promotion</a> <br>" );
    
});
routes.use('/dishes', dishRouter);
routes.use('/leaders', leaderRouter);
routes.use('/promotions', promotionRouter);

module.exports = routes;