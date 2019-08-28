const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middlewares/requireAuth');

const Group = mongoose.model('Group');

const router = express.Router();

router.use(requireAuth);

router.get('/groups', async (req, res) => {
  const groups = await Group.find({ userId: req.user._id });

  res.send(groups);
});

router.post('/groups', async (req, res) => {
  const { name } = req.body;
  const existingGroup = await Group.findOne({ name });

  if (existingGroup) {
    return res.status(422).send({ error: 'Group Name is in use' });
  }

  try {
    const group = new Group({
      name
    });
    await group.save();

    res.send(group);
  } catch (err) {
    return res.status(422).send(err.message);
  }
});
module.exports = router;
