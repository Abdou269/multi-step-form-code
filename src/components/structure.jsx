/* eslint-disable react/prop-types */
export default function Structure({title, desc, children}){
    return (
        <div className="flex flex-col items-center py-4 sm:h-[75%] sm:w-full bg-white rounded-xl w-[90%] 
        max-[640px]:absolute max-[640px]:top-[12%]">
            <div className="flex flex-col h-full w-[90%] gap-8 items-center">
                <div className="w-full">
                    <h1 className="text-[26px] font-bold mb-1">{title}</h1>
                    <p className="text-[#9699ab] normal-case text-[14px]">{desc}</p>
                </div>
                {children}
            </div>
        </div>
    )
}