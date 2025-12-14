import React, { useState } from 'react'
import Navbar from '../../components/Navbar'
import { getDifficultyBadgeClass } from '../lib/utils'
import { useLocation } from 'react-router'
import { PROBLEMS } from '../../data/problems'
import { Link } from 'react-router'
import { ChevronLeftIcon, ChevronRightIcon, CodeIcon } from 'lucide-react'
function ProblemsPage() {
   const problem=Object.values(PROBLEMS)
   const easyProblemCount=problem.filter((p)=>p.difficulty=='Easy').length
   const mediumProblemCount=problem.filter((p)=>p.difficulty=='Medium').length
   const hardProblemCount=problem.filter((p)=>p.difficulty=='Hard').length

  return (
    <>
    <div className='min-h-screen bg-base-200'>
      <Navbar/>
      <div className='max-w-7xl mx-auto px-4 py-12 '>
    <div className='mb-8'>
    <h1 className='text-4xl font-bold mb-2'>Practice Problems</h1>
    <p className='text-base-content/70'>Sharpen your coding skills with these curated problems</p>

    </div>
    </div>
    <div className='space-y-4'>
        {problem.map(p=>(
            <Link key={p.id} to={`/problem/${p.id}`} className='card bg-base-100 hover:scale-[1.01] transition-transform'>
                <div className='card-body'>
                <div className='flex items-center justify-between gap-4'>

                <div className='flex-1'>
                <div className='flex items-center gap-3 mb-2'>
                <div className='size-12  rounded-lg bg-primary/10 flex items-center justify-center'>
                <CodeIcon className='size-6 text-primary'/>

                </div>
                <div className='flex-1 items-center gap-2 mb-1'>
                <h2 className='text-xl font-bold'>{p.title}</h2>
                <span className={`badge ${getDifficultyBadgeClass(p.difficulty)}`}>
                  {p.difficulty}
                </span>

                </div>
                <p className='text-sm text-base-content/60'>{p.category}</p>

                </div>
                <p className='text-base-content/80 mb-3'>{p.description.text}</p>

                </div>
                <div className='flex items-center text-primary gap-2'>
                  <span className='font-medium'>Solve</span>
                  <ChevronRightIcon className='size-5'/>
                </div>
         

                </div>
    

                </div>
            </Link>
        ))}
    </div>
      <div className='card mt-12 bg-base-100 shadow-lg'>
        <div className='stats stats-vertical lg:stats-horizontal'>
          <div className='stat'>
            <div className='stat-title'>Total Problem</div>
            <div className='stat-value'>{problem.length}</div>

          </div>
          <div className='stat'>
            <div className='stat-title'>Easy</div>
            <div className='stat-value text-success'>{easyProblemCount}</div>

          </div>
          <div className='stat'>
            <div className='stat-title'>Medium</div>
            <div className='stat-value text-warning'>{mediumProblemCount}</div>

          </div>
          <div className='stat'>
            <div className='stat-title'>Hard</div>
            <div className='stat-value text-error'>{hardProblemCount}</div>

          </div>
        </div>

    </div>

    

    </div>
    
    </>
  )
}

export default ProblemsPage