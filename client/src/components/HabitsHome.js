import React from "react";
import { useState } from "react";
import {FaListAlt } from 'react-icons/fa';

// Home page to display the details of habit with their sstreak
const HabitsHome =  ({habits,streak}) =>{
    if(streak.length >0){
        console.log("Streak from home page: ", streak);
        streak.map((s)=>{
            console.log("streak: and habit ",s.habitName)
                   
        })
       
    }
    
    return(
        <div style={{display: 'flex',flexDirection: 'column',alignItems:'center'}}>
            <h3 style={{fontSize:'3rem'}}>Your Habits</h3>
        <div style={styles.habitsContainer}>
            <div style={styles.habitContent}>        
                <div style={{textTransform:'capitalize'}}><h4 style={{fontSize:'3rem'}}>Habits </h4></div>
                <div><h4 style={{fontSize:'3rem'}}> Streak</h4></div>
            </div>
        {
            (habits.length && streak.length) < 0 ? <p>Loading..</p>: streak.map((habit)=>{
            return (<div style={styles.habitContent}> 
                       
                        <div style={{textTransform:'capitalize', fontSize:'2rem'}}>  <FaListAlt /> {habit.habitName}</div>
                        <div style={{padding:'6px', fontSize:'2rem'}}>{habit.completedCount} / {habit.totalCount} </div>
                    </div>)
            })
        }
        </div>
        </div>
    )
}

export default HabitsHome;

const styles={
    background:{
        width:'100%',
        backgroundImage:"url('https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.123rf.com%2Fstock-photo%2Fhabits.html&psig=AOvVaw3HgIkWYChTYykA_Yz67QrS&ust=1686574419501000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCKCg9ruhu_8CFQAAAAAdAAAAABAE')"
        
    },
    habitsContainer : {
        display: 'flex',
        flexDirection: 'column',
        // alignItems: 'center',
        border:'1px solid grey',
        margin:'10px',
        borderRadius:'10px',
        width:'50%',
        // justifyContent:'center'
      },
      habitContent:{
        display: 'flex',
        flexDirection: 'row',
        margin:'1rem',
        justifyContent:'space-between'
      }
}