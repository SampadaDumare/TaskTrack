const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProjectsSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    startDate:{
        type: Date,
        required: true
    },
    endDate:{
        type: Date,
        required: true
    }
})
const Project = mongoose.model('project', ProjectsSchema); 
Project.createIndexes();
module.exports = mongoose.model('Project', ProjectsSchema);