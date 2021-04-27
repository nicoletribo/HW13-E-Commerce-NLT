const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
  // find all categories
const categoryInfo = await Category.findAll({
  // be sure to include its associated Products
  include:[Product]
});
res.status(200).json(categoryInfo);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    // find one category by its `id` value
    const categoryInfo = await Category.findByPk(req.params.id, {
      // be sure to include its associated Products
      include: [Product]
    });
    res.status(200).json(categoryInfo);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
     // CREATE a new category
    const newCategory = await Category.create(req.body)
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    // UPDATE a category by its `id` value
    const categoryInfo = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!categoryInfo[0]) {
      res.status(404).json({message: 'No category found with the given ID'})
    }
    res.status(200).json(categoryInfo);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    // DELETE a category by its `id` value
    const categoryInfo = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!categoryInfo) {
      res.status(404).json({message: 'No category found with the given ID'})
    }
    res.status(200).json(categoryInfo);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
