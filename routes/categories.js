var express = require('express');
var router = express.Router();

/* GET category listing. */
router.get('/', function(req, res, next) {
	var db = req.db;
	var collection = db.get('categorycollection');
	collection.find({},{},function(e,docs){
		res.json(docs);
	});
});

module.exports = router;