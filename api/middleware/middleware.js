// const Posts = require('../users/users-model');
const Users = require('../users/users-model');

function logger(req, res, next) {
  console.log(`
    ${req.method} request to ${req.baseUrl}${req.url} endpoint
  `);
  next();
}

const validateUserId = async (req, res, next) => {
  try {
    const user = await Users.getById(req.params.id);
    if (!user) {
      res.status(404).json({
        message: "user not found"
      });
    } else {
      req.user = user;
      next();
    }
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
}

function validateUser(req, res, next) {
  if (!req.body.name.trim() || req.body.name.trim().length === 0) {
    res.status(400).json({ message: "missing required name field" });
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  if (!req.body.text.trim()) {
    res.status(400).json({ message: "missing required text field" });
  } else {
    next();
  }
}

// do not forget to expose these functions to other modules
module.exports = { logger, validateUserId, validateUser, validatePost };