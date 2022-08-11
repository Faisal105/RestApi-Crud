const json = require('body-parser');
const express = require('express');
const router = express.Router();
const restController = require('../controllers/restController');
router.get('/tasks', restController.allTask);

router.get('/tasks/:taskId', restController.singleTask);

router.post('/addTask', restController.addTask);
router.put('/updateTask', restController.updateTask);

router.get('/', (req, res) => {});
router.delete('/tasks/:taskId', restController.deleteTask);
module.exports = router;
