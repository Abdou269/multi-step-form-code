/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import Structure from "./structure";
import { context } from "../context/context";

const monthPrices = [1, 2, 2]
, yearPrices = [10, 20, 20];

export default function Addons(){
    const [,, dataDispatch, newData] = useContext(context);
    const [newAddons, setNewAdds] = useState(newData.addons);
    const prices = newData.yearly ? yearPrices : monthPrices;
    const toggleAddon = (title, price) => {
        setNewAdds(prev => 
            prev.map(addon => 
                addon.name === title 
                ? { ...addon, price: price, selected: !addon.selected } 
                : addon
            )
        );
    };
    useEffect(() => {
        dataDispatch({type: "addons", payload: newAddons});
    }, [dataDispatch, newAddons]);

    return (
        <Structure 
            title={'Pick add-ons'}
            desc={'Add-ons help enhance your gaming experience'} 
        >
            <div className="flex flex-col gap-4 w-full">
                {
                    newAddons.map((addon, index) => 
                        <Option
                            key={index}
                            title={addon.name} 
                            desc={addon.desc} 
                            price={prices[index]} 
                            selected={addon.selected}
                            toggleAddon={toggleAddon}
                            yearly={newData.yearly}
                        ></Option>
                    )
                }
            </div>
        </Structure>
    )
}

function Option({ toggleAddon, title, desc, price, selected, yearly }) {
    const style = 'border-2 border-[#d6d9e6] bg-white hover:bg-[#d6d9e6]'
    , clickStyle = 'border-none bg-[#473dff]'
    
    return (
        <div className="flex items-center justify-between w-full flex-wrap border-[1px] border-[#473dff] rounded-md p-3">
            <div className="flex items-center gap-5">
                <div 
                    onClick={() => toggleAddon(title, price)} 
                    className={`flex items-center justify-center h-[17px] w-[17px] ${selected ? clickStyle : style} cursor-pointer rounded-sm`}
                >
                    <div className="rounded-[1px] border-s-[2px] border-b-[2px] border-s-white border-b-white h-[6px] w-[10px] rotate-[-45deg]"></div>
                </div>
                <div className="flex flex-col leading-none text-nowrap">
                    <h1 className="font-semibold text-sm md:text-base">{title}</h1>
                    <p className="text-[#9699ab] text-xs md:text-sm">{desc}</p>
                </div>
            </div>
            <p className="text-[#473dff]">+${price}/{yearly ? 'yr' : 'mo'}</p>
        </div>
    );
}