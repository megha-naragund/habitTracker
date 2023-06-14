import React, { useState } from 'react';
import Select from 'react-select';
import { FaCheck, FaTimes,FaStar } from 'react-icons/fa';
import {FiMinus} from 'react-icons/fi'
import axios from 'axios';
// to reder the drop down options to change the state of each habit
const options = [
  { value: 'done', label: <><FaCheck style={{color: "green"}}/> </> },
  { value: 'notDone', label: <><FaTimes style={{color: "red"}}/></> }
];

const WeekView =({habits})=>{
  const [selectedOption, setSelectedOption] = useState("");
  // Function to change the status of habit once change is detected 
  const handleSelectChange =( async (e,{habit,status}) => {
    // setSelectedOption(selectedOption);
    console.log("E.target value", e.value,status);
    try {
      // api call to update the habit status
      const response = await axios.post('/habit/update', {
        // Request body data
        'habit': habit.habit,
        'recordStatus': {
          'date':status.date,
          'status':e.value
        }
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  });
  
    habits.map((habit) => {
        console.log("habit info from weekView ", habit)
    })
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date();
    const headings = []; // to hold html elements of current week and date details
    const weekView =[]; // Holds current month day and date information
    const week =[]; // holds current week name
    const currentDate =[]; //holds current week dates
    const curmonth =[]; //holds current month
    // Loop to detect whether the habit exists on the mentioned date or not
    for (let i = 6; i >=0 ; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const curDate =date.getDate();
      const day = days[date.getDay()];
      const month = date.toLocaleString('default', { month: 'long' });
      console.log("day month: curDate", day, month, curDate)
      weekView.push({ 'day':day,'date':curDate, 'month':month })
      week.push(day);
      currentDate.push(curDate);
      curmonth.push(month);
      headings.push(
        <span key={i}>
          <span>{day} </span>
          {/* <br/> */}
          <span>{curDate},{month}</span>
        </span >
      );
    }
    console.log(headings);
    return (
      // to render week names as heading and corresponding habit status
      <>{habits.length === 0 ?  <>Loading...</>: 
        <div style={styles.habitWeekView}>
        <h1> Week View</h1>
          <div style={styles.habitWeekContainer}>
            <div style={styles.habitName}><h3>Habit</h3></div>
            <div style={styles.status} >
            
            {weekView.map((week)=>{
             return(
               <div style={styles.habitStatus}> 
                 <h4>{week.day} </h4>
                 <h6>{week.date}, {week.month} </h6>
               </div>)
            })}
           </div>
          </div>

            {habits.map((habit) => (
              <div key={habit.id} style={styles.habitWeekContainer}>
                <div style={styles.habitName}><span style={{textTransform: 'capitalize'}}>{habit.habit}</span></div>
                <div style={styles.status}>
                
                {habit.habitStatus.map((status)=>{
                   return ( <span style={styles.habitStatus} >
                        {/*  drop down to select and change each habit with in week */}
                        <Select 
                          options={options} 
                          defaultValue= {status.status==="done" ? { value: 'done', label: <><FaCheck style={{color: "green"}}/> </> }:status.status==="none" ? { value: 'notDone', label: <><FiMinus /> </> }: { value: 'notDone', label: <><FaTimes style={{color: "red"}}/> </> } } 
                          onChange={(e)=>{
                            handleSelectChange(e,{habit,status}) }}
                        />
                    
                    </span>)
                    }
                )}
                 </div>
              </div>
            ))}
          </div> }
        </>
)}

export default WeekView;
// Styles
const styles={
    habitWeekView : {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      },
      
      habitWeekContainer :{
        display: 'flex',
        width:'80%',
        alignItems: 'center',
        justifyContent:'center',
        border:'1px solid grey',
        margin:'1px',
        borderRadius: '10px'
        // display: 'grid',
        // gridTemplateColumns: '1fr 1fr',
        // gap: '10px',
        // fontWeight: 'bold'
      },
      
      habitWeekItem :{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '10px',
        alignItems: 'center',
        marginBottom: '10px'
      },
      habitName:{
        display: 'inline-block',
        width:'15%',
        justifyContent:'center',
        alignItems: 'center',
      },
      status:{
        display: 'inline-block',
        width:'68%'
      },
      habitStatus: {
        display: 'inline-block',
        justifyContent: 'center',
        padding :'2px',
        border: '1px solid grey',
        width:'8rem',   
        margin:'1px'
      },
      
      doneIcon : {
        color: 'green'
      },
      
      notDoneIcon : {
        color: 'red'
      }
      
}