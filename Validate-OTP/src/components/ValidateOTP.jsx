import React, { useEffect, useRef, useState } from 'react'

const ValidateOTP = ({noOfDigits}) => {
    const [inputArr,setInputArr] = useState(new Array(noOfDigits).fill(""));
    const inputRef = useRef([]);

    const handleInput = (value,selectedIndex)=>{
        const newArr = [...inputArr];
        const newValue = value?.trim();
        console.log(newValue);

        if(isNaN(newValue)){
            return;
        } 
        newArr[selectedIndex] = newValue?.slice(-1);
        newValue && inputRef?.current[selectedIndex+1]?.focus()
        setInputArr(newArr);
        // console.log(value,selectedIndex)
    }
    
    const handleKeyDown = (event,selectedIndex)=>{
        // console.log(event)
        if(!event.target.value && event.key === 'Backspace'){
            // console.log(event);
            inputRef?.current[selectedIndex-1]?.focus()
        }else if(event.key==='ArrowRight'){
            console.log(inputRef?.current[selectedIndex+1]?.value)
            inputRef?.current[selectedIndex+1]?.focus()
        }else if(event.key==='ArrowLeft'){
            console.log(inputRef?.current[selectedIndex-1]?.value)
            inputRef?.current[selectedIndex-1]?.focus()
        }
        else{
            if(inputRef?.current[selectedIndex]?.value){
                console.log(inputRef?.current[selectedIndex]);
            }
            // event.target.value && handleInput(event.target.value,selectedIndex);
        }
    }
    // console.log(inputArr)
    // console.log(inputRef);
    useEffect(()=>{
        inputRef?.current[0]?.focus()
    },[])
  return (
    <div className='h-screen flex items-center justify-center'>
        <div className='h-40 w-full flex items-center justify-center gap-4'>
            {inputArr?.map((item,index)=>{
                return(
                    <input 
                    key={index} 
                    type="text" 
                    value={item} 
                    className='border-1 w-14 h-14 text-center active:border-blue-400' 
                    ref={(input)=>(inputRef.current[index] = input)}
                    onChange={(e)=>handleInput(e.target.value,index)}
                    onKeyDown={(e)=>handleKeyDown(e,index)}
                    />
                )
            })}
        </div>
    </div>
  )
}

export default ValidateOTP