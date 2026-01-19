import React from 'react'

const About = () => {
  return (
    <div className='container'>
      <h1 style={{ marginTop: "30px" }}>About Us</h1>
      <div className="row" style={{ marginTop: "60px" }}>
        <div className="col-sm-6 mb-3 mb-sm-0">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">What is TaskTrack?</h5>
              <p className="card-text">TaskTrack is a smart task-management system designed for companies to assign, monitor, and track employee work in real time.
                It helps managers create tasks, set due dates, and monitor task progress, while employees can view assigned work and update statuses. TaskTrack reduces miscommunication and ensures organized workflow across teams.</p>
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Why we built TaskTrack</h5>
              <p className="card-text">TaskTrack was built to solve the common problem of poor tracking in workplaces where tasks often get lost, forgotten, or mismanaged.
                This system brings structure by showing everyone exactly what needs to be done, by whom, and by when. It also ensures transparency between managers and employees, making collaboration smoother.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="row" style={{ marginTop: "30px" }}>
        <div className="col-sm-6 mb-3 mb-sm-0">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">How TaskTrack works</h5>
              <p className="card-text">TaskTrack uses role-based access (Admin → Manager → Employee) to maintain security and proper workflow hierarchy.
                Admins manage company accounts, Managers assign tasks, and Employees update progress. Dynamic dashboards, status updates, due-date tracking, and project-wise task grouping make the process efficient and easy to use.</p>
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Our Mission</h5>
              <p className="card-text">Our mission is to create India’s most reliable, simple, and secure workplace task-tracking platform.
                TaskTrack aims to help companies improve productivity, reduce confusion, and empower teams with clear, organized task visibility—whether for small teams or large organizations.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
