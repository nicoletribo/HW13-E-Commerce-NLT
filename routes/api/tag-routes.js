const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try {
    const tagInfo = await Tag.findAll({
      // be sure to include its associated Product data
      include: [{
        model: Product,
        through: ProductTag
      }]
    })
    if (!tagInfo) {
      res.status(404).json({ message: 'Unable to find tags' });
    }
    res.status(200).json(tagInfo);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    // find a single tag by its `id`
    const tagInfo = await Tag.findByPk(req.params.id, { 
      // be sure to include its associated Product data
      include: [{
      model: Product,
      through: ProductTag
    }]
   });
    if (!tagInfo) {
      res.status(404).json({ message: 'Unable to find a tag' })
    }
    res.status(200).json(tagInfo)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  try {
    // CREATE a new tag
    const tagInfo = await Tag.create(req.body, {
      where: {
        id: req.body.id,
        tag_name: req.body.tag_name
      }
    })
    if (!tagInfo) {
      res.status(404).json({ message: 'Unable to create a new tag.' })
    }
    res.status(200).json(tagInfo);
  } catch (err) {
    res.status(500).json(err)
  }
});

router.put('/:id', async (req, res) => {
  try {
    // UPDATE a tag's name by its `id` value
    const tagInfo = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      }
    });
    if (!tagInfo) {
      res.status(404).json({ message: 'Unable to update, could not find a tag with that id.' });
    }
    res.status(200).json(tagInfo);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.delete('/:id', async (req, res) => {
  try {
    // delete on tag by its `id` value
    const tagInfo = await Tag.destroy({
      where: {
        id: req.params.id
      }
    })
    if (!tagInfo) {
      res.status(404).json({message: 'Unable to delete, could not find a tag with that id.'});
    }
    res.status(200).json(tagInfo);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
