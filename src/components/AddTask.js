import React, { useContext, useState, useEffect } from 'react'
import userContext from '../context/userContext';
import { useHistory, useLocation, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import Taskitem from './Taskitem';

const AddTask = () => {
  const [tasks, setTasks] = useState({ title: "", description: "", assignTo: "", dueDate: "" });
  const context = useContext(userContext);
  const { task, getAllTask, addTask, employee, getAllEmployees } = context;
  const history = useHistory();
  const location = useLocation();
  const { projectId } = useParams();
  const assignTo = location.state?.assignTo;
  const createdBy = location.state?.createdBy;

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getAllEmployees();
    } else {
      history.push("/login")
    }
  }, [])

  useEffect(() => {
    if (projectId) {
      getAllTask(projectId);
    }
  }, [projectId]);

  useEffect(() => {
    console.log("Updated task state:", task);
  }, [task]);


  const onClick = async (e) => {
    e.preventDefault();
    if (localStorage.getItem("token")) {
      addTask(tasks.title, tasks.description, projectId, tasks.assignTo, tasks.dueDate);
      await getAllTask(projectId);
      alert("Task added suceesfully");
      setTasks({ title: "", description: "", assignTo: "", dueDate: "" })
    } else {
      history.push("/login");
    }
  }

  const onChange = (e) => {
    setTasks({ ...tasks, [e.target.name]: e.target.value })
  }
  return (
    <div className='container'>
      <form className='container my-3'>
        <h2>Add Tasks</h2>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" name='title' value={tasks.title} onChange={onChange} aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input type="text" className="form-control" id="description" name='description' value={tasks.description} onChange={onChange} aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="assignTo" className="form-label">Assigned To</label>
          <select id="assignTo" name='assignTo' value={tasks.assignTo} onChange={onChange} className="form-select">
            <option value="">Select Employee to assign task</option>
            {Array.isArray(employee) && employee.map((emp) => (
              <option key={emp._id} value={emp._id}>
                {emp.name} - {emp.email}
              </option>
            ))}

          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="dueDate" className="form-label">Due Date</label>
          <input type="text" className="form-control" id="dueDate" name='dueDate' value={tasks.dueDate} onChange={onChange} placeholder='YYYY/MM/DD' aria-describedby="emailHelp" />
        </div>
        <button type="submit" className="btn btn-primary" onClick={onClick}>Submit</button>
      </form>

      <div className="row my-3">
        <h2>All Tasks Of This Project</h2>
        {task.length === 0 && <p>No tasks added yet</p>}
        {task.map((tasks) => {
          return <Taskitem key={tasks._id} tasks={tasks} projectId={projectId} assignTo={assignTo} createdBy={createdBy} />
        })}
      </div>

    </div>
  )
}

export default AddTask
