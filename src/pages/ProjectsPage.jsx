import React from 'react'
import ProjectsLanding from '../components/projects/ProjectsLanding'
import Navbar from '../components/layout/Navbar'
import ContactLayout from '../components/layout/ContactLayout'

const ProjectsPage = () => {
  return (
    <div className="w-full h-full bg-slate-200">
      <Navbar />
      <section className="min-h-fit w-full ">
        <ProjectsLanding />
      </section>
      <section className="h-screen w-full">
        <ContactLayout />
      </section>
    </div>  )
}

export default ProjectsPage