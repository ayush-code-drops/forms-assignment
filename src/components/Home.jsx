import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import axios from 'axios'
import ClipLoader from "react-spinners/ClipLoader";
function Home() {
   // console.log('data',data)
 
    const [employees, setEmployees] = useState([])
    const [data, setData] = useState({
        name: "",
        age: "",
        department:"",
       address:"",
        salary: "",
        married:false,

    })
    
    //Indicators
    const [loading, setIsloading] = useState(false);
    const [error, setIsEror] = useState(false)


    
    
    const {name,age,department,address,salary,married}=data
    const handleChange = (e) => {
      //  console.log(e)
        const {id, value,checked,type} = e.target
        console.log(e.target)
        setData({
            ...data,
            [id] : type=='checkbox'?checked:value
        })
       console.log(id,value);
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(data);
             try {
                 axios.post('https://json-server-deploy-mock.herokuapp.com/employees2', data).then((res) => setEmployees([...employees, data]))
                 alert('Employee added')
           
        } catch (error) {
      setIsEror(true) 
         }
  //you can make post req or whatever and can send form data to the server from here      
}
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     let payload = {
    //         id: employees.length + 1,
    //         name: name,
            
    //         department: department,
    //         gender: gender,
    //         role: role,
    //         salary:salary
    //     }
        
    //     try {
    //         axios.post('https://json-server-deploy-mock.herokuapp.com/employees2', payload).then((res)=>setEmployees([...employees,payload]))
    //         //setEmployees([...employees,payload])
    //     } catch (error) {
    //        setIsEror(true) 
    //     }
       
    // }
    const getData = () => {
      return  axios.get("https://json-server-deploy-mock.herokuapp.com/employees2")
    }

    useEffect(() => {
        setIsloading(true)
        getData().then((res) => {
            setEmployees(res.data)
            setIsloading(false)
            console.log(res.data)
        }).catch((err) => {
          setIsEror(true)
      }) 
    },[])
 
  return (
      <div>
          <h3>Add Employee</h3>
        
          <form className={styles.form} onSubmit={handleSubmit}>
          <input id='name' onChange={(e)=>handleChange(e)} type="text" placeholder='Name' value={name} />
          <input id='age' onChange={(e)=>handleChange(e)} type="Number" placeholder='Age' value={age} />
          
          <select  onChange={(e)=>handleChange(e)} name="" id="department" value={department}>
<option value="">Select Department</option>
<option value="support">Support</option>
<option value="marketing">Marketing</option>
<option value="legal">Legal</option>
<option value="sales">Sales</option>
<option value="engineering">Enginerring</option>
              </select>
              <input id='address' onChange={(e) => handleChange(e)} type="text" placeholder='Address' value={address} />
              <input id='salary' onChange={(e)=>handleChange(e)} type="Number" placeholder='Salary' value={salary} />
              <label>
              IsMarried:
              <input id='married' onChange={(e) => handleChange(e)} type="checkbox" value={married} checked={married}/>
              </label>
              <label>
                   </label>
              {/* <input type="radio" name="style" id="WFH" />
              <input type="radio" name="style" id="Office" /> */}
             
          <input type="submit" value="Submit" />
       
      </form>
          <h3>Employees</h3>
          

          
          <ClipLoader loading={loading} size={50} color='red'/>
          <table className={styles.table}>
              <thead>
               <tr>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Department</th>
                  <th>Address</th>
                      <th>Salary</th>
                      <th>Marital Status</th>
              </tr>   
              </thead>

              <tbody>
               {employees?.map((item) => {
                  return (
                      <tr key={item.id}>
                          <td>{item.name}</td>
                          <td>{item.age}</td>
                          <td>{item.department}</td>
                          <td>{item.address}</td>
                          <td>₹{item.salary}</td>
                          <td>{item.married?'Married':'Not married'}</td>
                      </tr>
                  )
              })}   
              </tbody>
              

              
</table>
    </div>
  )
}

export default Home