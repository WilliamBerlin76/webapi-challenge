const express = require('express');

const router = express.Router();

const Projects = require('./helpers/projectModel.js');
const Actions = require('./helpers/actionModel')

router.get('/', (req, res) => {
    const id = req.params.id
    Projects.get(id)
        .then(project => {
            res.status(200).json(project);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: 'could not retrieve the project'})
        })
});
router.get('/:id', (req, res) => {
    const id = req.params.id
    Projects.get(id)
        .then(project => {
            res.status(200).json(project);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: 'could not retrieve the project'})
        })
});
router.post('/', (req, res) => {
    const body = req.body;
    Projects.insert(body)
        .then(project => {
            res.status(201).json(project);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: 'could not add a project'})
        })
});
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Projects.remove(id)
        .then(project => {
            res.status(200).json({message: 'the project with the given id was removed'})
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: 'could not remove the project from the database'})
        })
});
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const changes = req.body;
    Projects.update(id, changes)
        .then(project => {
            res.status(200).json(changes)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: 'could not update the project'})
        })
})



module.exports = router;