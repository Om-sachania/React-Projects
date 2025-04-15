import React from 'react'
import { useState } from 'react';
import '../App.css'

const UpdatedFilter = () => {
    const [group,setGroup] = useState([
        {
            id:Date.now(),
            items:[
                {
                    itemId : Date.now(),
                    selectedCategory:'',
                    subCategory:'',
                    data:''
                }
            ],
            childGroup : [

            ]
        }
    ]);
    // const [inputField , setInputField] = useState({});
    const subCategoriesObject = {
        Fruits : ['Apple','Orange','Banana'],
        Cars : ['BMW','Audi','Mercedes']
    }

    function handleInputChange(groupId, itemId, e) {
        const { name, value } = e.target;
        setGroup(prev => prev.map(currGroup => {
            if (currGroup.id === groupId) {
                return {
                    ...currGroup,
                    items: currGroup.items.map(currItem => {
                        if (currItem.itemId === itemId) {
                            return { ...currItem, [name]: value };
                        }
                        return currItem;
                    })
                };
            }
            return currGroup;
        }));
    }

    function handleAddCondition(groupId,e){
        const selectedGroup = group.find((currGroup)=>currGroup.id == groupId);
        // console.log(selectedGroup);
        const newItem = {
            itemId : Date.now(),
            selectedCategory:'',
            subCategory:'',
            data:''
        }
        setGroup((prev)=>{
            return prev.map((currGroup)=>{
                return currGroup.id == groupId ? {...currGroup,items:[...currGroup.items,newItem]} : currGroup
            })
        })
    }

    function handleDeleteItem(groupId,itemId){
        // console.log('Group ID : ',groupId);
        // console.log('Item ID : ',itemId);
        let selectedGroup = group.find((currGroup)=>currGroup.id == groupId);
        let updatedItems = selectedGroup.items.filter((currItem)=>currItem.itemId !== itemId);
        // console.log(selectedGroup.items);

        setGroup((prev)=>{
            return prev.map((currGroup)=>{
                return currGroup.id == groupId ? {...currGroup,items : updatedItems} : currGroup
            })
        })
    }

    function handleAddGroup(){
        // const newGroup = {}
        setGroup((prev)=>{
            return [...prev,
                {
                    id:Date.now(),
                    items:[
                        {
                            itemId : Date.now(),
                            selectedCategory:'',
                            subCategory:'',
                            data:''
                        }
                    ]
                }
            ]
        })
    }

    function handleRemoveGroup(groupId){
        console.log(groupId);
        setGroup((prev)=>{
            return prev.filter((currGroup)=>currGroup.id !== groupId);
        })
    }

    // console.log(group)
    return (
        <div className='container'>
            {group.map((currGroup,index)=>{
                return (
                    <div key={currGroup.id} className='mainDiv'>
                        <div className="navBar">
                            <button onClick={(e)=>handleAddCondition(currGroup.id,e)}>Add Condition</button>
                            <button onClick={()=>handleAddGroup(currGroup.id)}>Add Group</button>
                            {
                                index>0 && <button onClick={()=>handleRemoveGroup(currGroup.id)}>Remove Group</button>
                            }
                        </div>
                        {
                            currGroup.items.map((currItem)=>(
                                <div className="section-1" key={currItem.itemId}>
                                    <select name="selectedCategory" id="selectedCategory" value={currItem.selectedCategory} onChange={(e)=>handleInputChange(currGroup.id,currItem.itemId,e)}> 
                                        <option value="">Select Category</option>
                                        <option value="Fruits">Fruits</option>
                                        <option value="Cars">Cars</option>
                                    </select>
                                    <select name="subCategory" id="subCategory" value={currItem.subCategory} onChange={(e)=>handleInputChange(currGroup.id,currItem.itemId,e)}>
                                        <option value="">Select Sub-Category</option>
                                            {currItem.selectedCategory && subCategoriesObject[currItem.selectedCategory].map((item)=>{
                                                return <option value={item} key={item}>{item}</option>
                                            })}
                                    </select>
                                    <input type="text" name='data' placeholder='Enter Value' value={currItem.data} onChange={(e)=>handleInputChange(currGroup.id,currItem.itemId,e)}/>
                                    <button onClick={()=>handleDeleteItem(currGroup.id,currItem.itemId)}>Delete</button>
                                </div>
                            ))
                        }
                    </div>
                )
            })}
        </div>
    )
}

export default UpdatedFilter