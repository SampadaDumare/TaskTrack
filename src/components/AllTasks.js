import React, { useContext, useEffect } from 'react'
import userContext from '../context/userContext';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import Taskitem from './Taskitem';

const AllTasks = () => {
    const context = useContext(userContext);
    const {getAllTask, task} = context;
    const location = useLocation();
    const projectId = location.state?.projectId;
    const assignTo = location.state?.assignTo;
    const createdBy = location.state?.createdBy;

    useEffect(() => {
        if (projectId) {
          getAllTask(projectId);
          console.log("Tasks fetched:", task);
        }
      }, [projectId]);

  return (
    <div className="container">
        <div className='row my-3'> 
      <h2>All Tasks Of This Project</h2>
        {task.length === 0 && <p>No tasks added yet</p>}
        {task.map((tasks) => {
          return <Taskitem key={tasks._id} tasks={tasks} projectId={projectId} assignTo={assignTo} createdBy={createdBy} />
        })}
    </div>
    </div>   
  )
}

export default AllTasks
