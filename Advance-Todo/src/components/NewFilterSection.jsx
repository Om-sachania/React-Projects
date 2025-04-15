// import React from 'react'
// import { useState } from 'react'

// const NewFilterSection = () => {
//     const [group,setGroup] = useState([
//         {
//             id:Date.now(),
//             childrens:{
//                 childGroup : [],
//                 childItems : []
//             },
//             items:[],
//             selectedCategory:'',
//             subCategory:'',
//             data:''
//         }
//     ]);
//     // const [inputField , setInputField] = useState({});
//     const subCategoriesObject = {
//         Fruits : ['Apple','Orange','Banana'],
//         Cars : ['BMW','Audi','Mercedes']
//     }

//     function handleAddGroup(groupId){
//         console.log('Group Added!!!',groupId);
//         // const selectedGroup = group.find((currGroup)=>currGroup.id == groupId);
//         // const newGroup = {id:Date.now(),items:[],selectedCategory:'',subCategory:'',data:''}
//         // setGroup((prev)=>{
//         //     return prev.map((currGroup)=>{
//         //         return currGroup.id == groupId ? {...currGroup,selectedCategory:'',subCategory:'',data:'',items : [...currGroup.items,newGroup]} : currGroup
//         //     })
//         // })
//         // setGroup((prev)=>[...prev,{id:Date.now(),items:[],selectedCategory:'',subCategory:'',data:''}]);
//         setGroup((prev) => [
//             ...prev, // Spread the existing groups
//             {
//               ...prev[0], // Copy the first group (or any specific group) in the array
//               childrens: {
//                 ...prev[0].childrens, // Copy the childrens object
//                 childGroup: [
//                   ...prev[0].childrens.childGroup, // Keep existing child groups
//                   {
//                     id: Date.now(), // New child group with a new ID
//                     childrens: {
//                         childGroup: [], // New child groups inside this new child
//                         childItems: [], // New child items inside this new child
//                     },
//                     items: [],
//                     selectedCategory: '',
//                     subCategory: '',
//                     data: '',
//                   },
//                 ],
//               },
//             },
//           ]);

//         localStorage.setItem('Group',JSON.stringify(group));
//     }

//     function handleInputChange(id,e){
//         const {name,value} = e.target
//         // console.log('Name : ',name);
//         // console.log('Value : ',value)
//         const groupIndex = group.findIndex(group => group.id === id);
//         const updatedGroups = [...group];
//         updatedGroups[groupIndex] = { ...updatedGroups[groupIndex],[name]:value};
//         setGroup(updatedGroups);
//     }

//     function handleAddCondition(id){
//         // console.log('Id : ',id);
//         const selectedGroup = group.find((currGroup) => currGroup.id === id);
//         const { selectedCategory, subCategory, data } = selectedGroup;
//         console.log(selectedGroup);

//         if (selectedCategory && subCategory && data.trim()) {
//           // New item to be added
//             const newItem = {
//                 selectedCategory,
//                 subCategory,
//                 data,
//                 itemID: Date.now(),
//             };

//         setGroup((prev) => {
//             return prev.map((currGroup) => {
//             // Check if this is the group we're modifying
//             if (currGroup.id === id) {
//             // Return a new group object with updated childItems
//                 return {
//                     ...currGroup, // Spread the existing group
//                     childrens: {
//                         ...currGroup.childrens, // Spread the existing childrens object
//                         childItems: [
//                             ...currGroup.childrens.childItems, // Preserve the previous items
//                             newItem, // Add the new item to childItems
//                         ],
//                     },
//                     selectedCategory:'',
//                     subCategory:'',
//                     data:''
//                 };
//             }
//             return currGroup; // For other groups, return them unchanged
//             });
//         });

//     // Save updated group to localStorage after the state has been updated
//     // localStorage.setItem('Group', JSON.stringify(group));
//     } 
//     else {
//         alert('Please Fill All Fields');
//     }
//         // console.log(selectedGroup)
//     }

//     function handleDeleteItem(id,itemID){
//         console.log(id)
//         const selectedGroup = group.find((currGroup)=>currGroup.id == id);
//         console.log(selectedGroup);

//         const updatedItems = selectedGroup.items.filter((currGroup)=>currGroup.itemID!==itemID);
//         setGroup((prev)=>{
//             return prev.map((currGroup)=>{
//                 return currGroup.id == id ? {...currGroup,selectedCategory:'',subCategory:'',data:'',items : updatedItems} : currGroup
//             })
//         });
//         localStorage.setItem('Group',JSON.stringify(group))
//     }

//     function handleRemoveGroup(groupId){
//         console.log(groupId);
//         let updatedGroup = group.filter((currGroup)=>currGroup.id !== groupId);
//         console.log(updatedGroup)
//         setGroup(updatedGroup)
//         localStorage.setItem('Group',JSON.stringify(updatedGroup))
//     }
//     // console.log(group)
//     return (
//         <>
//             <div className='container'>
//                 {group.map((currGroup,index)=>{
//                     // console.log(currGroup)
//                     return (
//                         <div key={currGroup.id}>
//                             <div className="navBar">
//                                 <button onClick={(e)=>handleAddCondition(currGroup.id,e)}>Add Condition</button>
//                                 <button onClick={()=>handleAddGroup(currGroup.id)}>Add Group</button>
//                                 {
//                                     index>0 && <button onClick={()=>handleRemoveGroup(currGroup.id)}>Remove Group</button>
//                                 }
//                             </div>
//                             <div className="section-1">
//                                 <select name="selectedCategory" id="selectedCategory" value={currGroup.selectedCategory} onChange={(e)=>handleInputChange(currGroup.id,e)}> 
//                                     <option value="">Select Category</option>
//                                     <option value="Fruits">Fruits</option>
//                                     <option value="Cars">Cars</option>
//                                 </select>
//                                 <select name="subCategory" id="subCategory" value={currGroup.subCategory} onChange={(e)=>handleInputChange(currGroup.id,e)}>
//                                     <option value="">Select Sub-Category</option>
//                                         {currGroup.selectedCategory && subCategoriesObject[currGroup.selectedCategory].map((item)=>{
//                                             return <option value={item} key={item}>{item}</option>
//                                         })}
//                                 </select>
//                                 <input type="text" name='data' placeholder='Enter Value' value={currGroup.data} onChange={(e)=>handleInputChange(currGroup.id,e)}/>
//                             </div>
//                             {currGroup.childrens.childItems.length>0 && (
//                                 <table>
//                                     <tbody>
//                                         {currGroup.childrens.childItems.map((selectedGroup)=>(
//                                             <tr key={selectedGroup.id}>
//                                                 <td><input type="text" value={selectedGroup.selectedCategory} readOnly/></td>
//                                                 <td><input type="text" value={selectedGroup.subCategory} readOnly/></td>
//                                                 <td><input type="text" value={selectedGroup.data} readOnly/></td>
//                                                 <td><button onClick={()=>handleDeleteItem(currGroup.id,selectedGroup.itemID)}>Delete</button></td>
//                                             </tr>
//                                         ))}
//                                         {
//                                             currGroup.childrens.childGroup.length>0 && (
//                                                 currGroup.childrens.childGroup.map((currChildGroup)=>(
//                                                     <tr>
// <div key={currGroup.id}>
//                             <div className="navBar">
//                                 <button onClick={(e)=>handleAddCondition(currGroup.id,e)}>Add Condition</button>
//                                 <button onClick={()=>handleAddGroup(currGroup.id)}>Add Group</button>
//                                 {
//                                     index>0 && <button onClick={()=>handleRemoveGroup(currGroup.id)}>Remove Group</button>
//                                 }
//                             </div>
//                             <div className="section-1">
//                                 <select name="selectedCategory" id="selectedCategory" value={currGroup.selectedCategory} onChange={(e)=>handleInputChange(currGroup.id,e)}> 
//                                     <option value="">Select Category</option>
//                                     <option value="Fruits">Fruits</option>
//                                     <option value="Cars">Cars</option>
//                                 </select>
//                                 <select name="subCategory" id="subCategory" value={currGroup.subCategory} onChange={(e)=>handleInputChange(currGroup.id,e)}>
//                                     <option value="">Select Sub-Category</option>
//                                         {currChildGroup.selectedCategory && subCategoriesObject[currChildGroup.selectedCategory].map((item)=>{
//                                             return <option value={item} key={item}>{item}</option>
//                                         })}
//                                 </select>
//                                 <input type="text" name='data' placeholder='Enter Value' value={currGroup.data} onChange={(e)=>handleInputChange(currGroup.id,e)}/>
//                             </div>
//                             {/* {currGroup.items.length>0 && (
//                                 <table>
//                                     <tbody>
//                                         {currGroup.items.map((selectedGroup)=>(
//                                             <tr key={selectedGroup.id}>
//                                                 <td><input type="text" value={selectedGroup.selectedCategory} readOnly/></td>
//                                                 <td><input type="text" value={selectedGroup.subCategory} readOnly/></td>
//                                                 <td><input type="text" value={selectedGroup.data} readOnly/></td>
//                                                 <td><button onClick={()=>handleDeleteItem(currGroup.id,selectedGroup.itemID)}>Delete</button></td>
//                                             </tr>
//                                         ))}
//                                     </tbody>
//                                 </table>
//                             )} */}
//                         </div>
// </tr> 
//                                                 ))
//                                             )
//                                         }
//                                     </tbody>
//                                 </table>
//                             )}
//                         </div>
//                     )
//                 })}
//             </div>
//         </>
//     )
// }

// export default NewFilterSection



//...........................................................................................................................
import React, { useState } from 'react';

const NewFilterSection = () => {
  const [group, setGroup] = useState([
    {
      id: Date.now(),
      childrens: {
        childGroup: [],
        childItems: [],
      },
      items: [],
      selectedCategory: '',
      subCategory: '',
      data: '',
    },
  ]);

  const subCategoriesObject = {
    Fruits: ['Apple', 'Orange', 'Banana'],
    Cars: ['BMW', 'Audi', 'Mercedes'],
  };

  const handleAddGroup = (groupId) => {
    setGroup((prev) => [
      ...prev,
      {
        id: Date.now(),
        childrens: {
          childGroup: [],
          childItems: [],
        },
        items: [],
        selectedCategory: '',
        subCategory: '',
        data: '',
      },
    ]);
  };

  const handleInputChange = (id, e) => {
    const { name, value } = e.target;
    const groupIndex = group.findIndex((group) => group.id === id);
    const updatedGroups = [...group];
    updatedGroups[groupIndex] = { ...updatedGroups[groupIndex], [name]: value };
    setGroup(updatedGroups);
  };

  const handleAddCondition = (id) => {
    const selectedGroup = group.find((currGroup) => currGroup.id === id);
    const { selectedCategory, subCategory, data } = selectedGroup;

    if (selectedCategory && subCategory && data.trim()) {
      const newItem = {
        selectedCategory,
        subCategory,
        data,
        itemID: Date.now(),
      };

      setGroup((prev) =>
        prev.map((currGroup) => {
          if (currGroup.id === id) {
            return {
              ...currGroup,
              childrens: {
                ...currGroup.childrens,
                childItems: [...currGroup.childrens.childItems, newItem],
              },
              selectedCategory: '',
              subCategory: '',
              data: '',
            };
          }
          return currGroup;
        })
      );
    } else {
      alert('Please Fill All Fields');
    }
  };

  const handleDeleteItem = (id, itemID) => {
    setGroup((prev) =>
      prev.map((currGroup) => {
        if (currGroup.id === id) {
          const updatedItems = currGroup.childrens.childItems.filter(
            (item) => item.itemID !== itemID
          );
          return {
            ...currGroup,
            childrens: {
              ...currGroup.childrens,
              childItems: updatedItems,
            },
          };
        }
        return currGroup;
      })
    );
  };

  const handleRemoveGroup = (groupId) => {
    setGroup((prev) => prev.filter((currGroup) => currGroup.id !== groupId));
  };

  console.log(group)
  // Render Form for Group and Condition
  const renderGroupForm = (currGroup, index) => {
    return (
      <div key={currGroup.id}>
        <div className="navBar">
          <button onClick={() => handleAddCondition(currGroup.id)}>Add Condition</button>
          <button onClick={() => handleAddGroup(currGroup.id)}>Add Group</button>
          {index > 0 && <button onClick={() => handleRemoveGroup(currGroup.id)}>Remove Group</button>}
        </div>
        <div className="section-1">
          <select
            name="selectedCategory"
            value={currGroup.selectedCategory}
            onChange={(e) => handleInputChange(currGroup.id, e)}
          >
            <option value="">Select Category</option>
            <option value="Fruits">Fruits</option>
            <option value="Cars">Cars</option>
          </select>
          <select
            name="subCategory"
            value={currGroup.subCategory}
            onChange={(e) => handleInputChange(currGroup.id, e)}
          >
            <option value="">Select Sub-Category</option>
            {currGroup.selectedCategory &&
              subCategoriesObject[currGroup.selectedCategory].map((item) => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
          </select>
          <input
            type="text"
            name="data"
            placeholder="Enter Value"
            value={currGroup.data}
            onChange={(e) => handleInputChange(currGroup.id, e)}
          />
        </div>
        {currGroup.childrens.childItems.length > 0 && (
          <table>
            <tbody>
              {currGroup.childrens.childItems.map((selectedGroup) => (
                <tr key={selectedGroup.itemID}>
                  <td>
                    <input type="text" value={selectedGroup.selectedCategory} readOnly />
                  </td>
                  <td>
                    <input type="text" value={selectedGroup.subCategory} readOnly />
                  </td>
                  <td>
                    <input type="text" value={selectedGroup.data} readOnly />
                  </td>
                  <td>
                    <button onClick={() => handleDeleteItem(currGroup.id, selectedGroup.itemID)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {/* Render child groups inside a row */}
              {currGroup.childrens.childGroup.length > 0 && (
                currGroup.childrens.childGroup.map((currChildGroup, index) => (
                  <tr key={currChildGroup.id}>
                    <td colSpan="4">
                      {/* Recursively render child group */}
                      {renderGroupForm(currChildGroup, index)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    );
  };

  return <div className="container">{group.map(renderGroupForm)}</div>;
};

export default NewFilterSection;
