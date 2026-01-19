const mongoose = require('mongoose');
const { Schema } = mongoose;

const TasksSchema = new Schema({
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    projectId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'project'
    },
    assignTo:{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    dueDate:{
        type: Date,
        required: true
    },
    status:{
        type: String,
        default: "TODO"
    }
})

module.exports = mongoose.model('Task', TasksSchema);