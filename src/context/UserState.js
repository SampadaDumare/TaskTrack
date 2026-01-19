import userContext from './userContext';
import { useState } from 'react';

const UserState = (props) => {
    const host = "http://localhost:4000";
    const initialProject = [];
    const initialTask = [];
    const [project, setProject] = useState(initialProject);
    const [task, setTask] = useState(initialTask);
    const [employee, setEmployee] = useState([]);

    // get all projects
    const getAllProject = async () => {
        // API call
        const response = await fetch(`${host}/api/user/fetchAllProjects`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            }
        })
        const json = await response.json();

        setProject(json);
    }

    // get all tasks for manager and admin
    const getAllTask = async (id) => {
        // API call
        const response = await fetch(`${host}/api/user/fetchAllTaskOfProject/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            }
        })
        const json = await response.json();

        setTask(json);
    }

    // get all tasks for employee
    const getAllTaskOfEmployee = async (id) => {
        // API call
        const response = await fetch(`${host}/api/user/fetchAllTaskOfEmployee/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            }
        })
        const json = await response.json();

        setTask(json);
    }

    // add project
    const addProject = async (name, description, startDate, endDate) => {
        // API call
        const response = await fetch(`${host}/api/user/addProject`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ name, description, startDate, endDate })
        })
        const sproject = await response.json();
        setProject(project.concat(sproject));
    }

    // add project
    const addTask = async (title, description, projectId, assignTo, dueDate) => {
        // API call
        const response = await fetch(`${host}/api/user/addTask`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, projectId, assignTo, dueDate })
        })
        const json = await response.json();
        // setTask(task.concat(json));
        // Make sure we always append to an array
    setTask(prevTasks => Array.isArray(prevTasks) ? [...prevTasks, json] : [json]);
    }

    // delete project
    const deleteProject = async (id) => {
        // API call
        const response = await fetch(`${host}/api/user/deleteProject/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            }
        })
        const json = await response.json();

        console.log(`deleting a project of id ${id}`);
        const newProjects = project.filter((sproject) => sproject._id !== id);
        setProject(newProjects);
    }

    // update status of task
    const updateTaskStatus = async (id, status) => {
        // API call
        const response = await fetch(`${host}/api/user/updateStatus/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ status })
        })
        let newTask = JSON.parse(JSON.stringify(task));
        for (let i = 0; i < newTask.length; i++) {
            let element = newTask[i];
            if (element._id === id) {
                element.status = status;
                break;
            }

        }
        setTask(newTask);
    }

    // get all employees
  const getAllEmployees = async () =>{
    // API call
        const response = await fetch(`${host}/api/user/fetchAllEmployees`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            }
        })
        const json = await response.json();
        // setEmployee(json);
        setEmployee(Array.isArray(json) ? json : []);
  }

    return (
        <userContext.Provider value={{ project, task, employee, getAllProject, getAllTask, getAllTaskOfEmployee, addProject, addTask, deleteProject, updateTaskStatus, getAllEmployees }}>
            {props.children}
        </userContext.Provider>
    )
}

export default UserState;
