import React, {useContext, useEffect, useState} from 'react';
import userContext from '../context/userContext';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import Projectitem from './Projectitem';

const Admin = () => {
  const context = useContext(userContext);
  const {task, project,addProject,getAllProject, getAllTask, username} = context;
  const history = useHistory();
  const location = useLocation();
  const projectId = location.state?.projectId;

  useEffect(()=>{
    if(localStorage.getItem("token")){
      getAllProject();
    }else{
      history.push("/login")
    }
  },[])
    useEffect(() => {
      if (projectId) {
        getAllTask(projectId);
        console.log("Tasks fetched:", task);
      }
    }, [projectId]);

  const [projecth, setProject] = useState({name:"", description:"", startDate:"", endDate:""})
  const onClick = (e)=>{
      e.preventDefault();
      addProject(projecth.name, projecth.description, projecth.startDate, projecth.endDate);
      setProject({name:"", description:"", startDate:"", endDate:""});
  }
  const onChange=(e)=>{
    setProject({...projecth, [e.target.name]:e.target.value})
  }


  return (
    <div className='container my-3'>
      <h4>Welcome {username}</h4>
      <form className='container my-3'>
        <h2>Add New Project</h2>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name Of Project</label>
          <input type="text" className="form-control" id="name" name='name' value={projecth.name} onChange={onChange} aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input type="text" className="form-control" id="description" name='description' value={projecth.description} onChange={onChange} aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="startDate" className="form-label">Start Date</label>
          <input type="text" className="form-control" id="startDate" name='startDate' value={projecth.startDate} onChange={onChange} placeholder='YYYY/MM/DD' aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="endDate" className="form-label">End Date</label>
          <input type="text" className="form-control" id="endDate" name='endDate' value={projecth.endDate} onChange={onChange} placeholder='YYYY/MM/DD' aria-describedby="emailHelp" />
        </div>
        <button type="submit" className="btn btn-primary" onClick={onClick}>Submit</button>
      </form>
      <div className="row my-3">
        <h2>Your Projects</h2>
        {project.length === 0 && <p>No projects to display</p>}
        {project.map((projecth) => {
          return <Projectitem key={projecth._id} projecth={projecth}/>
        })}
      </div>
    </div>
  )
}

export default Admin
