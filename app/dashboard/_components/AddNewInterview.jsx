"use client"
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {v4 as uuidv4} from 'uuid'
import { LoaderCircle } from 'lucide-react'
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { chatSession } from '@/utils/GeminiAIModel';


  

const AddNewInterview = () => {

    const [openDialog,setOpenDialog]=useState(false);
    const [jobPosition, setJobPosition] = useState();
    const [jobDes ,setJobDes]= useState()
    const [experience , setExperience]= useState();
    const [loading,setLoading]= useState(false);
    const [jsonResponse, setJsonResponse]= useState([]);
    const {user}= useUser();
    const router = useRouter();


    // const submitHandle=async(e)=>{

    //     setLoading(true);
    //     e.preventDefault();
    //     console.log(jobPosition, jobDes, experience)

    //     const InputPrompt = `Create a comprehensive set of 7 interview questions with answers tailored for job position: ${jobPosition}, job description: ${jobDes}, experience: ${experience} years. The questions should be a mix of theoretical knowledge, practical problem-solving, and situational judgment to evaluate the candidate comprehensively in JSON format. Ensure the questions are clear, concise, and relevant to the specified categories and the level of difficulty of the question should be based on user experience. Don't ask to write code, only ask questions related to code that can be answered verbally and ask one-line questions.`;
       
        


        
    //     const result= await chatSession.sendMessage(InputPrompt)
    //     const MockJsonResp = (result.response.text()).replace("```json","").replace("```","")

    //     console.log(JSON.parse(MockJsonResp)) ;
    //     setJsonResponse(MockJsonResp)

    //     if(MockJsonResp){
    //     const resp= await db.insert('"MockInterview"').values({
    //         mockId:uuidv4(),
    //         jsonMockResp: MockJsonResp,
    //         jobPosition:jobPosition,
    //         jobDes:jobDes,
    //         experience:experience,
    //         createdBy: user?.primaryEmailAddress?.emailAddress,
    //         createdAt:moment().format('DD/MM/YYYY'),
          

    //     }).returning(['mockId']);
       

    //     console.log("Inserted ID:",resp)
    //     if(resp){
    //         setOpenDialog(false)
    //         router.push('/dashboard/interview/'+resp[0]?.mockId)
    //     }
    
    
    // }
    // else{
    //         console.log('error')
    //     }

    //     setLoading(false);

    // }

    // const submitHandle = async (e) => {
    //     e.preventDefault();
    //     setLoading(true);
        
    //     console.log(jobPosition, jobDes, experience);
    
    //     const InputPrompt = `Create a comprehensive set of 7 interview questions with answers tailored for job position: ${jobPosition}, job description: ${jobDes}, experience: ${experience} years. The questions should be a mix of theoretical knowledge, practical problem-solving, and situational judgment to evaluate the candidate comprehensively in JSON format. Ensure the questions are clear, concise, and relevant to the specified categories and the level of difficulty of the question should be based on user experience. Don't ask to write code, only ask questions related to code that can be answered verbally and ask one-line questions.`;
    
    //     try {
    //         const result = await chatSession.sendMessage(InputPrompt);
    //         const MockJsonResp = (await result.response.text())
    //             .replace("```json", "")
    //             .replace("```", "");
    
    //         console.log("Parsed JSON Response:", JSON.parse(MockJsonResp));
    //         setJsonResponse(MockJsonResp);
    
    //         if (MockJsonResp) {
    //             // const newMockId = uuidv4();
    
    //             await db.insert('"MockInterview"').values({
    //                 // mockId: newMockId,
    //                 jsonMockResp: MockJsonResp,
    //                 jobPosition: jobPosition,
    //                 jobDes: jobDes,
    //                 experience: experience,
    //                 createdBy: user?.primaryEmailAddress?.emailAddress,
    //                 createdAt: moment().format('DD/MM/YYYY'),
    //             });
    
    //             // Now query the inserted record
    //             const insertedRecord = await db.select().from('"MockInterview"').where({ mockId: newMockId }).first();
    
    //             if (insertedRecord) {
    //                 console.log("Inserted Record:", insertedRecord);
    //                 setOpenDialog(false);
    //                 router.push('/dashboard/interview/' + insertedRecord.mockId);
    //             } else {
    //                 console.log('Error: Inserted record not found');
    //             }
    //         } else {
    //             console.log('Error: MockJsonResp is undefined or empty');
    //         }
    //     } catch (error) {
    //         console.error('Error during submission:', error);
    //     }
    
    //     setLoading(false);
    // };

    const submitHandle = async (e) => {
        setLoading(true);
        e.preventDefault();
    
        const InputPrompt = `Create a comprehensive set of 7 interview questions with answers tailored for job position: ${jobPosition}, job description: ${jobDes}, experience: ${experience} years. The questions should be a mix of theoretical knowledge, practical problem-solving, and situational judgment to evaluate the candidate comprehensively in JSON format. Ensure the questions are clear, concise, and relevant to the specified categories and the level of difficulty of the question should be based on user experience. Don't ask to write code, only ask questions related to code that can be answered verbally and ask one-line questions.`;
    
        try {
            console.log("Sending message to AI with prompt:", InputPrompt);
            const result = await chatSession.sendMessage(InputPrompt);
    
            // Check if result is valid
            if (!result || !result.response) {
                throw new Error("No valid response from AI session");
            }
    
            console.log("Raw Response Object:", result);
    
            const rawResponse = await result.response.text();
    
            console.log("Raw Text Response:", rawResponse);
    
            const cleanedResponse = rawResponse.replace("```json", "").replace("```", "").trim();
            console.log("Cleaned Response Text:", cleanedResponse);
    
            let MockJsonResp;
            try {
                MockJsonResp = JSON.parse(cleanedResponse);
                console.log("Parsed JSON Response:", MockJsonResp);
            } catch (parseError) {
                console.error("Error parsing JSON:", parseError);
                alert("There was an error processing the AI response. Please try again.");
                setLoading(false);
                return;
            }
    
            setJsonResponse(MockJsonResp);

            try {
                if (MockJsonResp) {
                    const newMockId = uuidv4();
                    
                    // Log the data to be inserted
                    console.log("Data to be inserted:", {
                        mockId: newMockId,
                        jsonMockResp: MockJsonResp,
                        jobPosition: jobPosition,
                        jobDes: jobDes,
                        experience: experience,
                        createdBy: user?.primaryEmailAddress?.emailAddress,
                        createdAt: moment().format('DD/MM/YYYY'),
                    });
            
                    // Simplify the insertion to debug
                    const insertedRecord = await db.insert(MockInterview).values({
                        mockId: newMockId,
                        // Comment out jsonMockResp to check if it causes issues
                        // jsonMockResp: MockJsonResp,
                        jobPosition: jobPosition,
                        jobDes: jobDes,
                        experience: experience,
                        createdBy: user?.primaryEmailAddress?.emailAddress,
                        createdAt: moment().format('DD/MM/YYYY'),
                    }).returning(['mockId']);
            
                    console.log("Inserted Record:", insertedRecord);
            
                    setOpenDialog(false);
                    router.push('/dashboard/interview/' + insertedRecord[0]?.mockId);
                } else {
                    console.log('Error: MockJsonResp is undefined or empty');
                    alert("The generated interview questions were empty. Please try again.");
                }
            } catch (dbError) {
                console.error("Database Insertion Error:", dbError);
                console.error("Full Error Details:", JSON.stringify(dbError, null, 2));
                alert("An error occurred during database insertion. Please try again.");
            }
            













    
        } catch (error) {
            console.error('Error during submission:', error.message);
            alert("An error occurred. Please try again.");
        }
    
        setLoading(false);
    };
    
    
    
    

  return (

    
        <div>
        <div className='p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all' onClick={()=>setOpenDialog(true)}>
            <h2 className='font-bold text-lg text-center'>+ Add New</h2>
        </div>

        <Dialog open={openDialog}>
            
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                <DialogTitle className="text-2xl">Tell us more about your Job Interview</DialogTitle>
                <DialogDescription>
                <form onSubmit={submitHandle}>
                    <div>
                        <h2 >Add Details about your Job description, role, expereince </h2>
                        <div className='mt-7 my-3'>
                            <label>Job Role/Position</label>
                            <Input onChange={(e)=>setJobPosition(e.target.value)} placeholder="Web Developer" required/>
                        </div>
                        <div className=' my-3'>
                            <label>Job Description/ Tech Stack</label>
                            <Textarea onChange={(e)=>setJobDes(e.target.value)} required/>
                        </div>
                        <div className='mt-7 my-2'>
                            <label>Experience</label>
                            <Input onChange={(e)=>setExperience(e.target.value)} placeholder="5" type="number" required/>
                        </div>
                    </div>

                    <div className='flex gap-5 justify-end'>
                        <Button  type="button" variant="ghost" onClick={()=>setOpenDialog(false)}>Cancel</Button>
                        <Button type="submit" disabled={loading}>
                            {loading?
                                <>
                                    <LoaderCircle className='animate-spin'/>Generating from AI
                                </>:'Start Interview'
                             }
                            </Button>

                    </div>
                </form>
                </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>


    </div>
    
    
  )
}

export default AddNewInterview