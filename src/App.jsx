import React, { useEffect, useState } from 'react'
import { BsDatabaseFillAdd } from "react-icons/bs";
import List from './List';


function App() {
  
  let [inp, setinp] = useState("")
  let [arr, setarr] = useState( localStorage.getItem("todo") ? JSON.parse(localStorage.getItem("todo")) : [])
  let [editing , setediting ] = useState( false )
  let [index, setIndex] = useState(null)
  // jb index set hota yhan to phr add pe click krty waqt condition chalti  
  
  console.log(arr);
  
  
  let onchange = (e) => {
    setinp(e.target.value)
    
  }
  
  function Add() {
    
    if (inp == "") {
      alert("fill")
      
    }
    // yhan editing ab fill ho chukka ha mean add krny pr ye condition run hogi 

    else if( editing ){
      let update = arr.map( (ele, idx)=> {
        return(
          index == idx ? { title: inp} : ele
        )
        // arr pr map chlaya or index ko idx sy match krwaya jiska match hoga wo usky title ko inp wali value assign re dy ga or is tarha na 
        // koi new div create hogi blky specific wohi index wala title upsate hoga  
      } )
      setarr(update)
      setIndex(null)
      setinp('')
      setediting(false)
      //  phr hum further conditionns ko run krty hain like nul krna inp ko empty krna or editing ko false krna jissy working normal hoja ti ha 
      
    }

    else {
      
      const list = { id: new Date().getTime().toString(), title: inp }
      setinp("")
      setarr([...arr, list])
      setediting(false)
      // console.log(list)
    }
    
  }
  
  
  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(arr))
  }, [arr])



  return (


    <div className='main h-screen py-2 relative'>
      <div className='absulote'>
        <div className="container">
          <div className="cloud front">
            <span className="left-front"></span>
            <span className="right-front"></span>
          </div>
          <span className="sun sunshine"></span>
          <span className="sun"></span>
          <div className="cloud back">
            <span className="left-back"></span>
            <span className="right-back"></span>
          </div>
        </div>
      </div>

      <h1 className='text-center font-bold text-3xl text-white tsh tracking-[2px] mt-8  flex justify-center items-center gap-3 context'>ADVANCE <div></div> TODO_LIST</h1>

      <div className='w-max mt-12 mx-auto flex justif-center items-center gap-2'>
        <div className="input-group w-[400px] ">
          <input type="text" name="text" autoComplete="off" className="input" required value={inp} onChange={onchange} />
          <label className="user-label">First Name</label>
        </div>

        <button className="shadow__btn flex justif-center items-center gap-2" onClick={Add}>
          {
            editing == false ? "ADD" : "Update"
          } 
          <BsDatabaseFillAdd />
        </button>
      </div>

      <div className='w-3/4 mx-auto mt-10 h-[400px] overflow-y-auto context custom-scrollbar'>
        <List setIndex={setIndex} arr={arr} setinp={setinp} setarr={setarr}  setediting={setediting}/>
      </div>






    </div>
  )
}

export default App