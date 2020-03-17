
const routes = require('express').Router();

routes.route('/')
.all((req,res,next) => {
    res.status(200).setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('Will send all the leaders to you!');
})
.post((req, res, next) => {
    res.end('Will add the leader: ' + req.body.name + ' with details: ' + req.body.description);
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /leaders');
})
.delete((req, res, next) => {
    res.end('Deleting all leaders');
});

routes.route('/:dishId')
.all((req,res,next) => {
    res.status(200).setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('Will send details of the leader: ' + req.params.dishId +' to you!');
})
.post((req, res, next) => {
    res.status(403).end('POST operation not supported on /leaders/'+ req.params.dishId);
    
})
.put((req, res, next) => {
    res.write('Updating the leader: ' + req.params.dishId + '\n');
    res.end('Will update the leader: ' + req.body.name + 
        ' with details: ' + req.body.description);
})
.delete((req, res, next) => {
    res.end('Deleting leader: ' + req.params.dishId);
});



module.exports = routes;

