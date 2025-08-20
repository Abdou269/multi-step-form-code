import { useContext } from "react";
import { context } from "../context/context";

// eslint-disable-next-line react/prop-types
export default function Step({number, title, formRef}){
    const {step, setStep, targetRef} = useContext(context);

    return (
        <div className="flex items-center gap-3 h-fit">
            <div 
                onClick={() => {
                    if (step === 1) {
                        targetRef.current = number;
                        formRef.current.requestSubmit();
                    } else {
                        setStep(number);
                    }
                }}
                className={`cursor-pointer rounded-full border-[1px] border-white ${step == number && 'bg-[#bfe2fd] text-black' } px-3 py-1 font-bold`}
            >
                {number}
            </div>
            <div className="hidden sm:inline h-fit">
                <h3 className="text-[12px] text-[#9699ab]">step {number}</h3>
                <h2 className="text-[14px] font-[500]">{title}</h2>
            </div>
        </div>
    )
}