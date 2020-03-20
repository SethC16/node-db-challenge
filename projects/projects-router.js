const express = require('express');

const Projects = require('./projects-model');

const router = express.Router();

router.get('/', (req, res) => {
    Projects.projects()
        .then(projects => {
            res.status(200).json(projects);
        })
        .catch(error => {
            res.status(500).json({ message: 'Failed to get projects.'});
        })
});

router.post('/', (req, res) => {
    const projectData = req.body;

    Projects.addProject(projectData)
        .then(project => {
            res.status(201).json(project);
        })
        .catch(error => {
            res.status(500).json({ message: 'Failed to create new project.'});
        })
});

router.get('/:id/tasks/', (req, res) => {
    Projects.task(req.params.id)
        .then(tasks => {
            res.status(200).json(tasks);
        })
        .catch(error => {
            res.status(500).json({ message: 'Failed to get task.'});
        })
});

router.post('/:id/tasks/', (req, res) => {
    Projects.findById(req.params.id)
        .then(task => {
            if(task) {
                Projects.addTask(req.body, req.params.id)
                    .then(task => {
                        res.status(201).json(task);
                    })
            } else {
                res.status(404).json({ message: 'Could not find the task with given id.'})
            }
        })
        .catch(error => {
            res.status(500).json({ message: 'Failed to create new task.'})
        })
});

router.get('/resources', (req, res) => {
    Projects.resources()
        .then(resources => {
            res.status(200).json(resources)
        })
        .catch(error => {
            res.status(500).json({ message: 'Could not get resources.'})
        })
})

router.post('/resources', (req, res) => {
    Projects.addResource(req.body)
        .then(resources => {
            res.status(201).json(resources)
        })
        .catch(error => {
            res.status(500).json({ message: 'Failed to create resource.'})
        })
})

module.exports = router;