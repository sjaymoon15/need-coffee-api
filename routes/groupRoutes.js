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

router.get('/groups/:name', async (req, res) => {
  const { name } = req.params;
  console.log('name', name);
  try {
    const group = await Group.findOne({ name })
      .populate('members')
      .populate('admins');
    if (!group) {
      res.send({ name, error: `The group does not exist` });
    }

    res.send(group);
  } catch (err) {
    return res.status(422).send({ error: `Can't find the group` });
  }
});

router.post('/groups', async (req, res) => {
  const { name, members } = req.body;
  const groupCreator = req.user;
  const existingGroup = await Group.findOne({ name });

  if (existingGroup) {
    return res.status(422).send({ error: 'Group Name is in use' });
  }

  try {
    const group = new Group({
      name,
      members
    });
    group.admins.push(groupCreator);
    // group.members.push(...members);
    await group.save();
    console.log(group);
    // group.populate('User');
    res.send(group);
  } catch (err) {
    return res.status(422).send(err.message);
  }
});
module.exports = router;
