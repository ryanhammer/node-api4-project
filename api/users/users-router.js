const express = require('express');

// You will need `users-model.js` and `posts-model.js` both
const Posts = require('../users/users-model');
const Users = require('../users/users-model');

// The middleware functions also need to be required
const { validateUserId, validateUser, validatePost } = require('../middleware/middleware');

const router = express.Router();

router.get('/', (req, res) => {
  Users.get(req.query)
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "The users information could not be retrieved",
      });
    })
});

router.get('/:id', validateUserId, (req, res) => {
  res.status(200).json(req.user);
});

router.post('/', validateUser, (req, res) => {
  Users.insert(req.body)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch(error => {
      res.status(500).json({
        message: error.message,
        stack: error.stack
      });
    })
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  Users.update(req.params.id, req.body)
    .then( () => {
      return Users.getById(req.params.id)
    })
    .then( (user) => {
      res.status(201).json(user);
    })
    .catch(error => {
      res.status(500).json({
        message: error.message,
        stack: error.stack
      });
    })
});

router.delete('/:id', validateUserId, (req, res) => {
  Users.remove(req.params.id)
    .then( () => {
      res.status(200).json(req.user);
    })
    .catch(error => {
      res.status(500).json({
        message: error.message,
        stack: error.stack
      });
    })
});

router.get('/:id/posts', validateUserId, (req, res) => {
  Users.getUserPosts(req.params.id)
    .then(userPosts => {
      res.status(200).json(userPosts);
    })
    .catch(error => {
      res.status(500).json({
        message: error.message,
        stack: error.stack
      });
    })
});

router.post('/:id/posts', validatePost, validateUserId, (req, res) => {
 Posts.insert(req.body)
  .then(newPost => {
    res.status(201).json(newPost);
  })
  .catch(error => {
    res.status(500).json({
      message: error.message,
      stack: error.stack
    });
  })
});

// do not forget to export the router
module.exports = router;