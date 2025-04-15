import React from "react";

const NestedCheckboxes = ({ data,checkedData,setCheckedData }) => {
    // console.log(data);
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
    const handleChange = (isChecked,item)=>{
        setCheckedData((prev)=>{
            let newState = {...prev,[item?.id]: isChecked};

            const updateCheck = (item)=>{
                item?.children?.forEach((subItem)=>{
                    // console.log(subItem);
                    newState[subItem?.id]=isChecked;
                    subItem?.children && updateCheck(subItem)
                })
            }
            // console.log(item);
            updateCheck(item);

            const verifyParentCheck = (item)=>{
                if(!item.children) return newState[item.id] || false;

                const allChildrenChecked = item.children.every((subItem)=>verifyParentCheck(subItem));
                newState[item.id] = allChildrenChecked;
                return allChildrenChecked
            }
            checkBoxData.forEach((item)=>verifyParentCheck(item))   
            return newState
        })
    }
  return (
    <div>
      {data?.map((item) => (
        <div key={item?.id} className="pl-6">
          <input type="checkbox" checked={checkedData[item?.id] || false} onChange={(e)=>handleChange(e.target.checked,item)}/>
          <span className="pl-1">{item?.name}</span>
          {item?.children && <NestedCheckboxes data={item?.children} checkedData={checkedData} setCheckedData={setCheckedData}/>}
        </div>
      ))}
    </div>
  );
};

export default NestedCheckboxes;
