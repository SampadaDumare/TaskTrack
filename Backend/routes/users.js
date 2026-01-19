const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Project = require('../models/Project');
const Task = require('../models/Task');
const Users = require('../models/Users')
const fetchuser = require('../middleware/fetchuser');
const allowaccess = require('../middleware/allowaccess')



// Route1: addProject route for role=admin POST = '/api/user/addProject'. Login required
router.post('/addProject', fetchuser, allowaccess("admin"), [
    body('name', 'Enter valid name').isLength({ min: 2 }),
    body('description', 'Enter valid description').isLength({ min: 3 }),
    body('startDate', 'Start Date cant be empty').notEmpty(),
    body('endDate', 'End Date cant be empty').notEmpty(),
    body('status')
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        // create a new project 
        const { name, description, startDate, endDate, status } = req.body;
        const project = new Project({
            name, description, startDate, endDate, status, user: req.user.id
        })
        const savedProject = await project.save();
        res.json(savedProject);

    } catch (error) {
        console.error(error.message)
        return res.status(500).send("Internal server error")
    }
})

// Route2: deleteProject route for role=admin DELETE = '/api/user/deleteProject'. Login required
router.delete('/deleteProject/:id', fetchuser, allowaccess("admin"), async (req, res) => {

    try {
        // find the project by its id mensioned in parameter
        let project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ error: "Not found" })
        }

        // // dont delete project if this user did not created it
        // if (project.user.toString() !== req.user.id) {
        //     return res.status(401).json({ error: "Not allowd" })
        // }

        // delete project
        project = await Project.findByIdAndDelete(req.params.id);
        res.json({ "success": "Project deleted successfully", project: project })

    } catch (error) {
        console.error(error.message)
        return res.status(500).send("Internal server error")
    }
})

// Route3: fetchAllProject route for role=admin/manager GET = '/api/user/fetchAllProject'. Login required
router.get('/fetchAllProjects', fetchuser, allowaccess("admin", "manager"), async (req, res)=>{
    try {
        const projects = await Project.find().populate("user", "name email")
        res.json(projects);

    } catch (error) {
        console.error(error.message)
        return res.status(500).send("Internal server error")
    }
})

// Route4: addTask route for role=manager POST = '/api/user/addTask'. Login required
router.post('/addTask', fetchuser, allowaccess("manager"), [
    body('title', 'Enter valid title').isLength({min:2}),
    body('description', 'Enter valid description').isLength({min:5}),
    body('assignTo', 'assignTo cant be empty').notEmpty(),
    body('dueDate', 'Due Date cant be empty').notEmpty(),
    body('projectId', 'ProjectId cant be empty').notEmpty(),
], async (req, res)=>{

    // handle validation errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    try {
        // create new task
        const {title, description, assignTo, dueDate, projectId, status} = req.body;
        const task = new Task({
            title, description, assignTo, dueDate, status, projectId, createdBy : req.user.id
        })
        const savedTask = await task.save();
        res.json(savedTask);

    } catch (error) {
        console.error(error.message)
        return res.status(500).send("Internal server error")
    }
})

// Route5: fetchAllTaskOfProject route for role=admin/manager GET = '/api/user/fetchAllTask'. Login required
router.get('/fetchAllTaskOfProject/:projectId', fetchuser, allowaccess("admin", "manager"), async(req, res)=>{
    try {
        const tasks = await Task.find({projectId: req.params.projectId}).populate("projectId").populate("assignTo", "name email").populate("createdBy", "name email");
        res.json(tasks || []);

    } catch (error) {
        console.error(error.message)
        return res.status(500).send("Internal server error")
    }
})


// Route6: fetchAllTaskOfEmployee route for role=admin/manager/employee GET = '/api/user/fetchAllTask'. Login required
router.get('/fetchAllTaskOfEmployee/:assignTo', fetchuser, allowaccess("admin","manager", "employee"), async(req, res)=>{
    try {
        const userId = req.user.role === "employee" ? req.user.id : req.params.assignTo;

        const tasks = await Task.find({assignTo: userId}).populate("projectId").populate("assignTo", "name email").populate("createdBy", "name email");
        res.json(tasks);

    } catch (error) {
        console.error(error.message)
        return res.status(500).send("Internal server error")
    }
})

// Route7: updateStatus route for role=employee PUT = '/api/user/updateStatus
router.put('/updateStatus/:id', fetchuser, allowaccess("employee"), async(req, res)=>{
    try {
        const {status} = req.body;
        // create newstatus object 
        const newStatus = {};
        if (status) { newStatus.status = status};

        // find task by id of parms
        let task = await Task.findById(req.params.id);
        if(!task){
            res.status(404).json({error: "Not found"})
        }

        // update task status
        task = await Task.findByIdAndUpdate(req.params.id, { $set: newStatus}, {new : true});
        res.json(task);

    } catch (error) {
        console.error(error.message)
        return res.status(500).send("Internal server error")
    }
})

// Route8: fetchAllEmployees route for role=admin/manager/employee GET = '/api/user/fetchAllEmployees
router.get('/fetchAllEmployees', fetchuser, allowaccess("admin", "manager", "employee"), async(req, res)=>{
    try {
        const employees = await Users.find({ role: "employee" }).select("name email _id");
        res.json(employees);
    } catch (error) {
        console.error(error.message)
        return res.status(500).send("Internal server error")
    }
})



module.exports = router;