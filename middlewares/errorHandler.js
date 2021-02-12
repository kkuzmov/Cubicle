const errorHandler = function(err, req, res, next){
if(!err) return;
res.status(500).render('home', {error: err})
}
module.exports = errorHandler;