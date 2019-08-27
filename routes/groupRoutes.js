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

module.exports = router;
