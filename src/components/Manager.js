import React, { useContext, useEffect } from 'react'
import Projectitem from './Projectitem'
import userContext from '../context/userContext'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Manager = () => {
  const context = useContext(userContext);
  const {project, getAllProject} = context;
  const history = useHistory();
  const name = localStorage.getItem("username");

  useEffect(()=>{
    if(localStorage.getItem("token")){
      getAllProject();
    }else{
      history.push("/login")
    }
  }, [])

  return (
    <div className='container my-3'>
      <h4>Welcome {name}</h4>
      <div className="row my-3">
        <h2>All Projects</h2>
        {project.length === 0 && <p>No projects to display</p>}
        {project.map((projecth) => {
          return <Projectitem key={projecth._id} projecth={projecth} />
        })}
      </div>
    </div>
  )
}

export default Manager
