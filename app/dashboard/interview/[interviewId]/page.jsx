import { Button } from '@/components/ui/button';
import { MockInterview } from '@/utils/schema'
import { Lightbulb, WebcamIcon } from 'lucide-react';
import React, {useEffect, useState } from 'react'
import Webcam from 'react-webcam';

function Interview({params}) {


  const[interviewData , setInterviewData]= useState();
  const [webCam,setWebCam]= useState(false);

  useEffect(()=>{
    console.log(params.interviewId)
    GetInterviewDetails();
  },[])

  const GetInterviewDetails = async()=>{
    const result = await db.select().from(MockInterview).where(eq(MockInterview.mockId, params.interviewId))
    setInterviewData(result[0]);
  }


  return (
    <div className='my-10 flex '>
      <h2 className='font-bold text-2xl'>Let's Get Started</h2>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>

      <div className='flex flex-col my-5 gap-5 p-5  '>
          <div className='rounded-lg border'>
            <h2 className='text-lg'><strong>Job Role:</strong>{interviewData.jobPosition}</h2>
            <h2 className='text-lg'><strong>Job Description:</strong>{interviewData.jobDes}</h2>
            <h2 className='text-lg'><strong>Experience:</strong>{interviewData.experience}</h2>
          </div>

          <div className='p-5 border rounded-lg border-yellow-300 bg-yellow-100>'>
            <h2 className='flex items-center gap-2 text-yellow-500'><Lightbulb/><strong>Give It a Look!</strong></h2>
            <h2 className='mt-3 text-yellow-500'> It contains 5 questions for your practice.</h2>

          </div>
         

        </div>


        <div>
          {webCam? <Webcam

          onUserMedia={()=> setWebCam(true)}
          onUserMediaError={()=> setWebCam(false)}
          mirrored={true}
          style={{
            height:300,
            width:300,
          }}/>:
          <>

            <WebcamIcon className='h-72 w-48 my-7 p-10 bg-secondary rounded-lg'></WebcamIcon>
            <Button variant="ghost" onClick={()=>setWebCam(true)}>Enable Web cam and Microphone</Button> 
          </> 
          }
        </div> 
      </div>
          <div className='flex items-end justify-end' >
          <Button>Start Interview</Button>
          </div>


     

    </div>
  )
}

export default Interview