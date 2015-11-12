var express = require('express');
var router = express.Router();

/* GET API listings. */
router.get('/:collection/:itemId?', function(req, res, next) {
	var db = req.db;
	var key = req.params.collection;
	if ( (key === 'products') || (key === 'categories') ) {
		var findObj = {};
		var collection = [];
		if (key === 'products') {
			collection = db.get('productcollection');
			var categoryId = req.params.itemId;
			//console.log('categoryId='+categoryId);
			if (typeof categoryId !== 'undefined') {
				findObj = {"categories":parseInt(categoryId, 10)};
			}
		} else {
			collection = db.get('categorycollection');
		}
		collection.find(findObj,{},function(e,docs){
			res.json(docs);
		});
	}
});

module.exports = router;