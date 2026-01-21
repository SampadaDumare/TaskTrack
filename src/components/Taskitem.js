import React, { useContext } from 'react'
import userContext from '../context/userContext';

const Taskitem = (props) => {
    const context = useContext(userContext);
    const { updateTaskStatus } = context;
    const { tasks } = props;
    const role = localStorage.getItem("role");
    return (
        <div className='col-md-3'>
            <div className="card my-3">
                <div className="card-body">
                    <div className="d-flex align-items-center justify-content-between">
                        <h5 className="card-title mb-0">{tasks?.title || "No Title"}</h5>
                    </div>
                    <p className="card-text">{tasks.description}</p>
                    {/* <p className="card-text">{tasks.status}</p> */}
                    <p>Project Name: {tasks.projectId?.name}</p>
                    <p>Due Date: {new Date(tasks.dueDate).toLocaleDateString()}</p>
                    <div className="d-flex align-items-center justify-content-between">
                        <p>Status: {tasks.status}</p>
                        {role === "employee" && <div className="dropdown">
                            <i className="fa-solid fa-chevron-down" data-bs-toggle="dropdown" aria-expanded="false"></i>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" onClick={() => { updateTaskStatus(tasks._id, "ON HOLD") }}>ON HOLD</a></li>
                                <li><a className="dropdown-item" onClick={() => { updateTaskStatus(tasks._id, "IN PROGRESS") }}>IN PROGRESS</a></li>
                                <li><a className="dropdown-item" onClick={() => { updateTaskStatus(tasks._id, "REVIEW") }}>REVIEW</a></li>
                                <li><a className="dropdown-item" onClick={() => { updateTaskStatus(tasks._id, "COMPLETED") }}>COMPLETED</a></li>
                            </ul>
                        </div>}
                    </div>
                    {role === "manager" && <div>
                        <p>Assigned To: {tasks.assignTo?.name} - {tasks.assignTo?.email}</p>
                    </div>}
                    {role === "admin" && <div>
                        <p>Assigned To: {tasks.assignTo?.name} - {tasks.assignTo?.email}</p>
                        <p>Assigned By: {tasks.createdBy?.name} - {tasks.createdBy?.email}</p>
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default Taskitem
