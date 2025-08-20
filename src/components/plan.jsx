/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { context } from "../context/context";
import Structure from "./structure";
import {plans} from "../data/data";

export default function Plan(){
    const { dataDispatch, newData } = useContext(context);
    const [active, setActive] = useState(newData.plan);
    const yearly = newData.yearly;
    
    useEffect(() => {
        dataDispatch({type: "plan", payload: active});
    }, [active, dataDispatch])

    return (
        <Structure 
            title={'Select your plan'}
            desc={'You have the option of monthly or yearly billing.'} 
        >
            <div className="flex items-center gap-4 h-full w-full flex-col sm:flex-row">
                {
                    plans.map(plan => 
                        <Card 
                            key={plan.name}
                            plan={plan}
                            active={active.name}
                            setActive={setActive}
                            price={!yearly ? plan.monthPrice : plan.yearPrice}
                            mode={yearly}
                        >
                            <img src={plan.iconSrc} width="40" height="40" />
                        </Card>
                    )
                }
                </div>
                <div className="flex justify-center gap-8 bg-[#f0f6ff] p-2 rounded-m w-full">
                    <h1>Monthly</h1>
                    <div 
                        onClick={_=> dataDispatch({type: 'yearly', payload: !yearly})} 
                        className={`flex items-center p-1 bg-[#02295a] h-[25px] w-[50px] rounded-2xl cursor-pointer`}
                    >
                        <div className={`relative left-0 ${yearly && 'left-[62%]'} rounded-full bg-[white] h-[15px] w-[15px]`}></div>
                    </div>
                    <h1>Yearly</h1>
                </div>
        </Structure>
    )
}

function Card({plan, active, setActive, price, mode, children}){
    const style = 'border-[#473dff] bg-[#fafbff]';
    return (
        <div 
            onClick={()=> setActive(plan)}
            className={`flex sm:justify-between sm:flex-col gap-3 sm:h-[100%] sm:w-[30%] w-full hover:border-[#473dff] hover:bg-[#fafbff] border-[1px] p-3
            rounded-lg cursor-pointer ${active == plan.name ? style : 'border-[#d6d9e6]'}`}
        >
            {children}
            <div>
                <p className="font-semibold text-[#02295a]">{plan.name}</p>
                <p className="text-sm text-[#9699ab]">${price}/{mode ? 'yr' : 'mo'}</p>
                { mode && <p className="text-[#02295a] text-xs">2 months free</p> }
            </div>
        </div>
    )
}