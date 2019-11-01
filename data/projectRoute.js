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
router.get('/:id', validateProjectId, (req, res) => {
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
router.post('/', validateProjectBody, (req, res) => {
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
router.delete('/:id', validateProjectId, (req, res) => {
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
router.put('/:id', validateProjectId, validateProjectBody, (req, res) => {
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
router.get('/:id/actions', validateProjectId, (req, res) => {
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
router.get('/:id/actions/:id', validateActionId, (req, res) => {
    const id = req.params.id;
    Actions.get(id)
        .then(action => {
            res.status(200).json(action)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: 'unable to get the action by id'})
        })
})
router.post('/:id/actions', validateProjectId, validateActionBody, (req, res) => {
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
router.put('/:id/actions/:id', validateActionId, validateActionBody, (req, res) => {
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
router.delete('/:id/actions/:id', validateActionId, (req, res) => {
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

///////////////middleware////////////////

function validateProjectId(req, res, next) {
    const id = req.params.id;
    Projects.get(id)
        .then(project => {
            if(!project){
                return res.status(400).json({message: 'invalid project id'})
            } else {
                next();
            }
        })
        .catch(err => {
            console.log('validateProjectId', err)
            res.status(500).json({error: 'could not validate the id'})
        })
};
function validateActionId(req, res, next){
    const id = req.params.id;
    Actions.get(id)
        .then(action => {
            if(!action){
                return res.status(400).json({error: 'invalid action id'})
            } else {
                next();
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: 'could not validate the action id'})
        })
};
function validateProjectBody(req, res, next){
    const body = req.body;
    if(!body){
        res.status(400).json({message: 'missing project data'})
    } else if(!body.name || !body.description){
        res.status(400).json({message: 'missing required name or description field'})
    } else{
        next();
    }
};
function validateActionBody(req, res, next){
    const body = req.body;
    if(!body){
        res.status(400).json({message: 'missing action data'})
    } else if (!body.project_id || !body.description || !body.notes){
        res.status(400).json({message: 'missing required project_id, description, or notes data'})
    } else {
        next();
    }
}


module.exports = router;