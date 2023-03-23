import React, { useEffect } from "react";
import {apiUrl,filterData} from "./data";
import  Filter  from "./Components/Filter";
import Navbar from "./Components/Navbar";
import Cards from "./Components/Cards";
import {toast} from "react-toastify"
import Spinner from "./Components/Spinner";

import { useState} from "react";
// import { FcLeave } from "react-icons/fc";
// import { useEffect } from "react";

const App = () => {

  const[courses,setCourses] = useState(null);
  const[loading,setLoading] = useState(true);
  const[category,setCategory]=useState(filterData[0].title);
  const fetchData = async()=>{
    setLoading(true);
    try{
      const response = await fetch(apiUrl);
      const output = await response.json();
      setCourses(output.data);
    }
    catch(error){
      toast.error("NetWork M Koi Dikkat h")
    }
    setLoading(false);
  }

  useEffect(()=>{
    
    fetchData();
  },[])
  
  return(
    <div className="min-h-screen flex flex-col">

      <div><Navbar/></div>
      <div className="bg-bgDark2 h-[100vh]">

        <div><Filter filterData={filterData} category={category} setCategory={setCategory}/></div>
        <div className="w-11/12 max-w-[1200px] mx-auto flex justify-center items-center min-h-[50vh] ">{
          loading ? (<Spinner/>) : (<Cards courses={courses} category={category}/>) 
          }
        </div>
      </div>

      
      
      
    </div>
  );
};

export default App;
