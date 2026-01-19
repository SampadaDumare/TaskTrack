import React, { useContext, useEffect } from 'react'
import userContext from '../context/userContext'
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import Taskitem from './Taskitem';

const Employee = () => {
  const context = useContext(userContext);
  const {getAllTaskOfEmployee, task} = context;
  const location = useLocation();
  const projectId = location.state?.projectId;
  const history = useHistory();
  const name = localStorage.getItem("username");

  useEffect(()=>{
    if(localStorage.getItem("token")){
      getAllTaskOfEmployee(projectId);
    }else{
      history.push("/login");
    }
  })
  return (
    <div className='container my-3'>
      <h4>Welcome {name}</h4>
      <div className="row my-3">
        <h2 className="my-3">Your Tasks</h2>
        {task.length === 0 && <p>No tasks added yet</p>}
        {task.map((tasks) => {
          return <Taskitem key={tasks._id} tasks={tasks} projectId={projectId} />
        })}
        
      </div>
    </div>
  )
}

export default Employee
