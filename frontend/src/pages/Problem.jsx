import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { PROBLEMS } from '../../data/problems';
import Navbar from '../../components/Navbar';
import {Panel,PanelGroup, PanelResizeHandle} from 'react-resizable-panels'
import ProblemDescription from '../../components/ProblemDescription';
import CodeEditorPanel from '../../components/CodeEditorPanel';
import OutputPanel from '../../components/OutputPanel';
function Problem() {
    const {id}=useParams()
    const navigate=useNavigate()
    const[currProblemId,setCurrProblemId]=useState("two-sum");
    const [selectedLanguage,setSelectedLanguage]=useState("javascript")
     const [code, setCode] = useState(PROBLEMS[currProblemId].starterCode.javascript);
    const[output,setOutput]=useState(null)
    const[running,isRunning]=useState(false)

   const currProblem=PROBLEMS[currProblemId]
    useEffect(()=>{
     if(id && PROBLEMS[id]){
        setCurrProblemId(id);
        setCode(PROBLEMS[id].starterCode[selectedLanguage]);
        setOutput(null);
     }   
    },[id,selectedLanguage])

    useEffect(()=>{
      // update code when current problem id or selected language changes
      setCode(PROBLEMS[currProblemId].starterCode[selectedLanguage]);
    },[currProblemId, selectedLanguage]);

    const handleLanguageChange=(e)=>{

    }
    const handleProblemChange=(id)=>{
      navigate(`/problem/${id}`);
    }
    const triggerConfetti=()=>{}
    const checkIfTestsPassed=()=>{}
    const handleCodeRun=()=>{}
  return (
    <div className='h-screen w-screen flex flex-col bg-base-100'>
    <Navbar/>
    <div className='flex-1'>
    <PanelGroup direction="horizontal">
    <Panel defaultSize={40} minSize={30}>
    {/* left pannel  */}
    <ProblemDescription 
      problem={currProblem}
      currProblemId={currProblemId}
      onProblemChange={handleProblemChange}
      allProblems={Object.values(PROBLEMS)}
    />
    </Panel>
    <PanelResizeHandle className='w-2 bg-base-200 hover:bg-primary transition-col-resize'/>
    {/* Right pannel  */}
    <Panel defaultSize={60} minSize={30}>
    <PanelGroup direction='vertical'>
    <Panel defaultSize={70} minSize={30}>
        <CodeEditorPanel/>
    </Panel>
    <PanelResizeHandle className='h-2 bg-base-200 hover:bg-primary transition-colors cursor-row-resize'/>
    <Panel defaultSize={30} minSize={30}>
        <OutputPanel/>
    </Panel>

    </PanelGroup>
    <ProblemDescription
      problem={currProblem}
      currProblemId={currProblemId}
      onProblemChange={handleProblemChange}
      allProblems={Object.values(PROBLEMS)}
    />

    </Panel>
    </PanelGroup>

    </div>
    </div>
  )
}

export default Problem