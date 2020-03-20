const db = require('../data/data-config')

module.exports = {
    addResource,
    resources,
    addProject,
    projects,
    addTask,
    task,
    findById
}

function addResource(resources) {
    return db('resources').insert(resources);
}

function resources() {
    return db('resources');
}

function addProject(projects) {
    return db('projects').insert(projects);
}

function projects() {
    return db('projects');
}

function addTask(task) {
    return db('tasks').insert(task);
}

function task(id) {
    return db('projects')
        .select('*')
            .join('tasks', 'tasks.projects_id', 'projects.id')
            .where({ projects_id: id });
}

function findById(id) {
    return db('projects')
        .where({ id })
        .first();
}