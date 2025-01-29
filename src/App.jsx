import Plan from './components/plan.jsx';
import Step from './components/step';
import Info from './components/info';
import Addons from './components/addons';
import Summary from './components/summary.jsx';
import Finish from './components/finish.jsx';
import { context } from './context/context';
import { useReducer, useRef, useState } from 'react';
import { plans } from './plans/plans.js';

const data = {
    info: {},
    yearly: false,
    plan: plans[0],
    addons: [
        {name : 'Online service', desc: 'Access to multiplayer games', price: 1, selected: false},
        {name : 'Larger storage', desc: 'Extra 1TB of cloud save', price: 2, selected: false},
        {name : 'Customizable profile', desc: 'Custom theme on your profile', price: 2, selected: false}
    ]
}

export default function App(){
    const [step, setStep] = useState(1);
    const [newData, dataDispatch] = useReducer(dataReducer, data);
    const formRef = useRef();

    return (
        <context.Provider value={[step, setStep, dataDispatch, newData, data.addons]}>
            <div className='flex justify-center items-center h-full w-full sm:px-3 p-0 flex-col sm:flex-row'>
                <div className={`flex justify-center sm:h-[95%] h-[25%] sm:w-[250px] text-nowrap p-6 text-white sm:rounded-xl w-full 
                    sm:bg-[url("./assets/bg-sidebar-desktop.svg")] bg-[url("./assets/bg-sidebar-mobile.svg")] bg-cover rounded-none`}>
                    <div className='flex sm:flex-col gap-6 uppercase h-fit'>
                        <Step number={1} title={"your info"} active={step}></Step>
                        <Step number={2} title={"select plan"} active={step}></Step>
                        <Step number={3} title={"add-ons"} active={step}></Step>
                        <Step number={4} title={"summary"} active={step}></Step>
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
                                            formRef.current.requestSubmit();
                                        }
                                        else {
                                            setStep(step + 1);
                                            step == 4 && localStorage.setItem("User-Data", JSON.stringify(newData));
                                        }
                                    }}
                                    className={`${step == 4 ? 'bg-[#473dff]' : 'bg-[#02295a]'} text-white p-2 px-5 rounded-[8px] hover:bg-[#011f45]`}
                                >
                                    {step < 4 ? "Next Step" : "confirm"}
                                </button>
                            </div>
                        )
                    }
                </div>
            </div>
        </context.Provider>
    )
}

function dataReducer(data, action){
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