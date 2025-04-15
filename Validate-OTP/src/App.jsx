import { useState } from 'react'
import './App.css'
import NestedCheckboxes from './components/NestedCheckboxes'
// import ValidateOTP from './components/ValidateOTP'

function App() {

  // const NO_OF_OTP_DIGITS = 5
  const checkBoxData = [
    {
      id:1,
      name:"Two-Wheeler",
      children:[
        {
          id:2,
          name:"Bicycle",
          children:[
            {
              id:3,
              name:"Hercules",
            },
            {
              id:4,
              name:"Avon",
            }
          ]
        },
        {
          id:5,
          name:"Bike",
          children:[
            {
              id:6,
              name:"Kawaski",
            },
            {
              id:7,
              name:"Hero",
            }
          ]
        }
      ]
    },
    {
      id:8,
      name:'Three-Wheeler',
      children:[
        {
          id:9,
          name:'Auto-Rickshaw'
        },
        {
          id:10,
          name:'AeroPlane'
        }
      ]
    },
    {
      id:11,
      name:'Four-Wheeler',
      children:[
        {
          id:12,
          name:'Car',
          children:[
            {
              id:13,
              name:'Audi'
            },
            {
              id:14,
              name:'BMW'
            }
          ]
        },
        {
          id:15,
          name:'Bus'
        }
      ]
    }
  ]

  // console.log(checkBoxData);
  const [checkedData,setCheckedData] = useState({});
  return (
    <>
      {/* <ValidateOTP noOfDigits={NO_OF_OTP_DIGITS}/> */}
      <NestedCheckboxes data={checkBoxData} checkedData={checkedData} setCheckedData={setCheckedData}/>
    </>
  )
}

export default App
