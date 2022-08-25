const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

router.get("/", (req, res) => {
	Tag.findAll({
		include: [
			{
				model: Product,
				required: true,
				through: { model: ProductTag, attributes: [] },
			},
		],
		limit: 100,
	})
		.then((allTags) => res.status(202).json(allTags))
		.catch((err) => res.status(400).json(err));
});

router.get("/:id", (req, res) => {
	Tag.findOne({
		where: { id: req.params.id },
		include: [
			{
				model: Product,
				required: true,
				through: { model: ProductTag, attributes: [] },
			},
		],
	})
		.then((tagId) => res.status(202).json(tagId))
		.catch((err) => {
			console.log(err);
			res.status(400).send(err);
		});
});

router.post("/", (req, res) => {
	Tag.create(req.body)
		.then((newTag) => {
			res.status(200).json(newTag);
		})
		.catch((err) => {
			console.log(err);
			res.status(400).json(err);
		});
});

router.put("/:id", (req, res) => {
	Tag.update(req.body, {
		where: {
			id: req.params.id,
		},
	})
		.then(() => {
			res.status(200).json(req.body);
		})
		.catch((err) => {
			res.status(400).json(err);
		});
});

router.delete("/:id", (req, res) => {
	Tag.findOne({ where: { id: req.body.id } })
		.then((tagName) => {
			Tag.destroy({ where: { id: req.body.id } });
			return tagName;
		})
		.then((tagName) => res.status(200).json(tagName))
		.catch((err) => {
			res.status(400).json(err);
		});
});

module.exports = router;