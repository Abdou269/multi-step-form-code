import { useContext } from "react";
import { context } from "../context/context";
import Structure from "./structure";

export default function Summary(){
    const [step, setStep,, newData] = useContext(context);
    let total = newData.yearly ? newData.plan.yearPrice : newData.plan.monthPrice ;

    return (
        <Structure title={"Finishing up"} desc={'Double-check everything looks OK before confirming'} step={step} setStep={setStep} data={newData}>
            <div className="w-full h-full">
                <div className="bg-[#f0f6ff] rounded-md p-5 pb-3">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="font-bold">{newData.plan.name} ({newData.yearly ? 'Yearly' : 'Monthly'})</h1>
                            <a onClick={()=> setStep(2)} className="text-[14px] text-[#9699ab] underline cursor-pointer">Change</a>
                        </div>
                        <p className="font-bold">${total}/{newData.yearly ? 'yr' : 'mo'}</p>
                    </div>
                    <hr className="border-[1px] m-4" />
                    <div>
                        {
                            newData.addons.map((addon, index) => 
                                {
                                    if (addon.selected) { 
                                        total += addon.price;
                                        return (
                                            <div key={index} className="flex justify-between items-center text-[14px] text-[#9699ab] my-2">
                                                <h2>{addon.name}</h2>
                                                <p>+${addon.price}/{newData.yearly ? 'yr' : 'mo'}</p>
                                            </div>
                                        )
                                    }
                                }
                            )
                        }
                    </div>
                </div>
                <div className="flex justify-between items-center px-5 py-4">
                    <p className="text-[14px] text-[#9699ab]">Total (per {newData.yearly ? 'year' : 'month'})</p>
                    <p className="text-[18px] text-[#473dff] font-bold">${total}/{newData.yearly ? 'yr' : 'mo'}</p>
                </div>
            </div>
        </Structure>
    )
}