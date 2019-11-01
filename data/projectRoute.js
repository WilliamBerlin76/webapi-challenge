const express = require('express');

const router = express.Router();

const Projects = require('./helpers/projectModel.js');
const Actions = require('./helpers/actionModel.js');

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
router.get('/:id/actions', (req, res) => {
    const ProjectId = req.params.id;
    Projects.get(ProjectId)
        .then(action => {
            res.status(200).json(action)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: 'could not retrieve the actions'})
        })
})
/////////////////////// actions operations/////////////////
router.post('/:id/actions', (req, res) => {
    const body = req.body;
    
    console.log(body)
    Actions.insert(body)
        .then(action => {
            res.status(201).json(action)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: 'could not add actions'})
        })
});
router.put('/:id/actions/:id', (req, res) => {
    const changes = req.body;
    const id = req.params.id;
    Actions.update(id, changes)
        .then(action => {
            res.status(200).json(changes)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: 'could not update the action'})
        })
})
router.delete('/:id/actions/:id', (req, res) => {
    const id = req.params.id;
    Actions.remove(id)
        .then(action => {
            res.status(200).json({message: `the action with the id of ${id} was removed`})
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: 'the action could not be deleted'})
        })
});


module.exports = router;