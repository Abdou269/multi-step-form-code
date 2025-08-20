/* eslint-disable react/prop-types */
import { useContext, useEffect, useReducer, useState } from "react";
import { context } from "../context/context";

function reducer(state, action){
    switch (action.type){
        case 'Name' : 
            return {...state, name : action.payload}
        case 'Email Address' :
            return {...state, email : action.payload}
        case 'Phone Number' :
            return {...state, number : action.payload}
        case 'error' :
            return {...state, error : action.payload}
        default :
            return state;
    }
}

export default function Info({ formRef }){
    const {setStep, targetRef, dataDispatch, newData} = useContext(context);
    const [newInfo, dispatch] = useReducer(reducer, {
        name : newData.info.name || null,
        email : newData.info.email || null,
        number : newData.info.number || null,
        error : []
    });
    const oldInfo = newData.info;

    return (
        <form ref={formRef} onSubmit={
                e => { 
                    e.preventDefault();
                    check(newInfo, dispatch);
                    if (newInfo.name && newInfo.email && newInfo.number){
                        setStep(targetRef.current);
                        dataDispatch({type: 'info', payload: newInfo}); 
                    }
                }
            }
            className="flex flex-col sm:justify-center sm:h-[85%] sm:w-[80%] bg-white rounded-xl sm:p-0 px-6 py-4 h-fit w-[90%] max-[640px]:absolute max-[640px]:top-[42%] max-[640px]:translate-y-[-50%]"
        >
            <div className="flex flex-col gap-5">
                <div>
                    <h1 className="text-[24px] font-bold">Personal info</h1>
                    <p className="text-[#9699ab] normal-case text-[13px]">Please provide your name, email address, and phone number.</p>
                </div>
                <div className="flex flex-col gap-6">
                    <Form id="Name" placeholder={"Stephan King"} error={newInfo.error} oldValue={oldInfo.name} dispatch={dispatch}></Form>
                    <Form id="Email Address" placeholder={"stephanking@lorem.com"} error={newInfo.error} oldValue={oldInfo.email} dispatch={dispatch}></Form>
                    <Form id="Phone Number" placeholder={"+1 234 567 890"} error={newInfo.error} oldValue={oldInfo.number} dispatch={dispatch}></Form>
                </div>
            </div>
        </form>
    )
}

function Form({id, placeholder, error, oldValue, dispatch}){
    const [value, setValue] = useState(oldValue || '');

    return (
        <div className="flex flex-col">
            <div className="flex justify-between items-center">
                <label htmlFor={id} className="font-semibold text-[13px] py-1">{id}</label>
                {
                    error.includes(id) &&
                    <p className="text-[13px] font-semibold text-[#ed3548]">This field is required</p>
                }
            </div>
            <input
                id={id}
                value={value}
                onChange={e => {
                    setValue(e.target.value);
                    dispatch({type : id, payload : e.target.value});
                    dispatch({type : 'error', payload : error.filter(e => e != id)});
                }}
                type={id === 'Email Address' ? 'email' : id === 'Phone Number' ? 'tel' : 'text'}
                className={`w-full font-medium text-sm border-[1px] border-[#d6d9e6] outline-none focus:border-[#473dff] p-2 px-3 rounded-md ${error.includes(id) && 'border-[#ed3548]'}`}
                placeholder={`e.g. ${placeholder}`}
            />
        </div>
    )
}

function check(newInfo, dispatch){
    let errors = new Set();

    !newInfo.name && errors.add('Name');
    !newInfo.email && errors.add('Email Address');
    !newInfo.number && errors.add('Phone Number');
    
    dispatch({type: 'error', payload: Array.from(errors)});
}