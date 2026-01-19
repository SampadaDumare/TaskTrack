import React, { useContext, useState } from "react";
import userContext from "../context/userContext";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Projectitem = (props) => {
    const context = useContext(userContext);
    const { deleteProject } = context;
    const { projecth } = props;
    const history = useHistory();
    const role = localStorage.getItem("role");

    const onClick = () => {
        history.push("/addTask", { projectId: projecth._id })
    }
    const handleTaskClick = ()=>{
        history.push("/allTasks", { projectId: projecth._id })
    }

    return (
        <div className='col-md-3'>
            <div className="card my-3">
                <div className="card-body">
                    <div className="d-flex align-items-center justify-content-between">
                        <h5 className="card-title mb-0">{projecth.name}</h5>
                    </div>
                    <p className="card-text">{projecth.description}</p>
                    <p className="card-text">Created By : {projecth.user?.name} - {projecth.user?.email}</p>

                    {/* show delete button to admin */}
                    {role === "admin" && (
                    <div>
                        <button className="btn btn-outline-success" onClick={handleTaskClick}>Tasks</button>
                        <button type="button" className="btn btn-outline-success mx-1" onClick={() => { deleteProject(projecth._id) }}>Delete</button>
                    </div>
                    )}
                    {/* show add task button to manager with some extra details */}
                    {role === "manager" && (
                        <div>
                            <p className="card-text">Start Date: {projecth.startDate.split("T")[0]}</p>
                            <p className="card-text">End Date: {projecth.endDate.split("T")[0]}</p>
                            <button type="button" className="btn btn-outline-success" onClick={onClick}>Add Task</button>
                        </div>
                    )}

                </div>
            </div>
        </div>
    )
}

export default Projectitem;