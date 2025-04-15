import React from 'react'
import { useState } from 'react'

const NewFilterSection = () => {
    const [group,setGroup] = useState([
        {
            id:Date.now(),
            items:[],
            selectedCategory:'',
            subCategory:'',
            data:''
        }
    ]);
    // const [inputField , setInputField] = useState({});
    const subCategoriesObject = {
        Fruits : ['Apple','Orange','Banana'],
        Cars : ['BMW','Audi','Mercedes']
    }

    function handleAddGroup(groupId){
        console.log('Group Added!!!',groupId);
        // const selectedGroup = group.find((currGroup)=>currGroup.id == groupId);
        // const newGroup = {id:Date.now(),items:[],selectedCategory:'',subCategory:'',data:''}
        // setGroup((prev)=>{
        //     return prev.map((currGroup)=>{
        //         return currGroup.id == groupId ? {...currGroup,selectedCategory:'',subCategory:'',data:'',items : [...currGroup.items,newGroup]} : currGroup
        //     })
        // })
        setGroup((prev)=>[...prev,{id:Date.now(),items:[],selectedCategory:'',subCategory:'',data:''}]);

        localStorage.setItem('Group',JSON.stringify(group));
    }

    function handleInputChange(id,e){
        const {name,value} = e.target
        // console.log('Name : ',name);
        // console.log('Value : ',value)
        const groupIndex = group.findIndex(group => group.id === id);
        const updatedGroups = [...group];
        updatedGroups[groupIndex] = { ...updatedGroups[groupIndex],[name]:value};
        setGroup(updatedGroups);
    }

    function handleAddCondition(id){
        // console.log('Id : ',id);
        const selectedGroup = group.find((currGroup)=>currGroup.id == id)
        const {selectedCategory,subCategory,data} = selectedGroup;
        if(selectedCategory && subCategory && data.trim()){
            const newItem = {
                selectedCategory,
                subCategory,
                data,
                itemID : Date.now()
            };
    
            setGroup((prev)=>{
                return prev.map((currGroup)=>{
                    return currGroup.id == id ? {...currGroup,selectedCategory:'',subCategory:'',data:'',items : [...currGroup.items,newItem]} : currGroup
                })
            });
            localStorage.setItem('Group',JSON.stringify(group))
        }
        else{
            alert('Please Fill All Fields')
        }
        // console.log(selectedGroup)
    }

    function handleDeleteItem(id,itemID){
        console.log(id)
        const selectedGroup = group.find((currGroup)=>currGroup.id == id);
        console.log(selectedGroup);

        const updatedItems = selectedGroup.items.filter((currGroup)=>currGroup.itemID!==itemID);
        setGroup((prev)=>{
            return prev.map((currGroup)=>{
                return currGroup.id == id ? {...currGroup,selectedCategory:'',subCategory:'',data:'',items : updatedItems} : currGroup
            })
        });
        localStorage.setItem('Group',JSON.stringify(group))
    }

    function handleRemoveGroup(groupId){
        console.log(groupId);
        let updatedGroup = group.filter((currGroup)=>currGroup.id !== groupId);
        console.log(updatedGroup)
        setGroup(updatedGroup)
        localStorage.setItem('Group',JSON.stringify(updatedGroup))
    }
    // console.log(group)
    return (
        <>
            <div className='container'>
                {group.map((currGroup,index)=>{
                    return (
                        <div key={currGroup.id}>
                            <div className="navBar">
                                <button onClick={(e)=>handleAddCondition(currGroup.id,e)}>Add Condition</button>
                                <button onClick={()=>handleAddGroup(currGroup.id)}>Add Group</button>
                                {
                                    index>0 && <button onClick={()=>handleRemoveGroup(currGroup.id)}>Remove Group</button>
                                }
                            </div>
                            <div className="section-1">
                                <select name="selectedCategory" id="selectedCategory" value={currGroup.selectedCategory} onChange={(e)=>handleInputChange(currGroup.id,e)}> 
                                    <option value="">Select Category</option>
                                    <option value="Fruits">Fruits</option>
                                    <option value="Cars">Cars</option>
                                </select>
                                <select name="subCategory" id="subCategory" value={currGroup.subCategory} onChange={(e)=>handleInputChange(currGroup.id,e)}>
                                    <option value="">Select Sub-Category</option>
                                        {currGroup.selectedCategory && subCategoriesObject[currGroup.selectedCategory].map((item)=>{
                                            return <option value={item} key={item}>{item}</option>
                                        })}
                                </select>
                                <input type="text" name='data' placeholder='Enter Value' value={currGroup.data} onChange={(e)=>handleInputChange(currGroup.id,e)}/>
                            </div>
                            {currGroup.items.length>0 && (
                                <table>
                                    <tbody>
                                        {currGroup.items.map((selectedGroup)=>(
                                            <tr key={selectedGroup.id}>
                                                <td><input type="text" value={selectedGroup.selectedCategory} readOnly/></td>
                                                <td><input type="text" value={selectedGroup.subCategory} readOnly/></td>
                                                <td><input type="text" value={selectedGroup.data} readOnly/></td>
                                                <td><button onClick={()=>handleDeleteItem(currGroup.id,selectedGroup.itemID)}>Delete</button></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default NewFilterSection