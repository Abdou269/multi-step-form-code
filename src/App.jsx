import Plan from './components/plan.jsx';
import Step from './components/step';
import Info from './components/info';
import Addons from './components/addons';
import Summary from './components/summary.jsx';
import Finish from './components/finish.jsx';
import { context } from './context/context';
import { useReducer, useRef, useState } from 'react';
import { plans } from './data/data.js';

const data = {
    info: {
        name: null,
        email: null,
        number: null
    },
    yearly: false,
    plan: plans[0],
    addons: [],
}

export default function App(){
    const [step, setStep] = useState(1);
    const [newData, dataDispatch] = useReducer(reducer, data);
    const targetRef = useRef();
    const formRef = useRef();

    return (
        <context.Provider value={{step, setStep, targetRef, dataDispatch, newData }}>
            <div className='flex flex-col h-full'>
                <div className='flex justify-center items-center h-full w-full sm:px-3 p-0 flex-col sm:flex-row'>
                    <div className={`flex justify-center sm:h-[95%] h-[25%] sm:w-[250px] text-nowrap p-6 text-white sm:rounded-xl w-full 
                        sm:bg-[url("./assets/bg-sidebar-desktop.svg")] bg-[url("./assets/bg-sidebar-mobile.svg")] bg-cover rounded-none`}>
                        <div className='flex sm:flex-col gap-6 uppercase h-fit'>
                            <Step formRef={formRef} number={1} title={"your info"}></Step>
                            <Step formRef={formRef} number={2} title={"select plan"}></Step>
                            <Step formRef={formRef} number={3} title={"add-ons"}></Step>
                            <Step formRef={formRef} number={4} title={"summary"}></Step>
                        </div>
                    </div>
                    <div className='flex items-center justify-center flex-col w-full h-[90%]'>
                        <div className='flex flex-col items-center justify-center h-full w-full'>
                            <div className='flex justify-center items-center h-full w-full'>
                                <div className='flex flex-col items-center sm:w-11/12 h-full w-[90%]'>
                                    {step == 1 && <Info formRef={formRef}></Info>}   
                                    {step == 2 && <Plan></Plan>}
                                    {step == 3 && <Addons></Addons>}
                                    {step == 4 && <Summary></Summary>}
                                    {step == 5 && <Finish></Finish>}
                                </div>
                            </div>
                        </div>
                        {
                            step < 5 && 
                            (
                                <div className="flex items-center justify-between sm:w-[80%] gap-2 px-4 py-4 bg-white w-full">
                                    <p className={`${step == 1 ? 'opacity-0 cursor-default' : 'cursor-pointer'} font-semibold text-[#9699ab] hover:text-black`} onClick={() => step > 1 && setStep(step - 1)}>Go Back</p>
                                    <button 
                                        onClick={() => { 
                                            if (step == 1){
                                                targetRef.current = step + 1;
                                                formRef.current.requestSubmit();
                                            }
                                            else {
                                                setStep(step + 1);
                                                step == 4 && localStorage.setItem("User-Data", JSON.stringify(newData));
                                            }
                                        }}
                                        className={`${step == 4  ? 'bg-[#473dff]' : 'bg-[#02295a]'} text-white p-2 px-5 rounded-[8px] hover:bg-[#011f45] cursor-pointer`}
                                    >
                                        {step < 4 ? "Next Step" : "confirm"}
                                    </button>
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className="attribution">
                    Challenge by <a href="https://www.frontendmentor.io/challenges/multistep-form-YVAnSdqQBJ" target="_blank">Frontend Mentor</a>. 
                    Coded by <a href="https://www.frontendmentor.io/profile/Abdou269" target="_blank">Abdou269</a>.
                </div>
            </div>
        </context.Provider>
    )
}

function reducer(data, action){
    switch (action.type){
        case "info":
            return {...data, 
                info: {
                    name: action.payload.name,
                    email: action.payload.email,
                    number: action.payload.number
                }
            }
        case "plan":
            return {...data, plan: action.payload}
        case "addons":
            return {...data, addons: action.payload}
        case "yearly":
            return {...data, yearly: action.payload}
        default :
            return data
    }
}