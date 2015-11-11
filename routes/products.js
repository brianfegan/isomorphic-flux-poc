var express = require('express');
var router = express.Router();

/* GET products listing. */
router.get('/:categoryID?', function(req, res, next) {
	var db = req.db;
	var collection = db.get('productcollection');
	var categoryID = req.params.categoryID;
	var findObj = {};
	//console.log('categoryID='+categoryID);
	if (typeof categoryID !== 'undefined') {
		findObj = {"categories":parseInt(categoryID, 10)};
	}
	collection.find(findObj,{},function(e,docs){
		res.json(docs);
	});
});

module.exports = router;