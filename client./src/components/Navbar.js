import React from "react"
import AddHabit from "./AddHabits";
import { Link, Outlet, useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';



const Navbar =({addHabit})=>{
    return(
        <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-dark  sticky-top" >
                <button class="navbar-toggler bg-light" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <h3 class="navbar-brand text-light" href="#"> <img width="64" height="64" src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/external-habit-lifestyles-flaticons-lineal-color-flat-icons-3.png" alt="external-habit-lifestyles-flaticons-lineal-color-flat-icons-3"/> Habit Tracker</h3>

                <div class="collapse navbar-collapse " id="navbarTogglerDemo03" >
                    <ul class="navbar-nav mr-auto mt-2 mt-lg-0 nav-fill" >
                    <li class="nav-item active">
                        <a class="nav-link  text-light" href="/">Home </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-light" href="/week_view">Habits</a>
                    </li>
                    <li class="nav-item">
                        {/* <button class="bg-dark text-light" type="button" onclick={addHabit} >
                        Add Habit
                        </button> */}
                        <AddHabit addHabit={addHabit} />

                    </li>
                    
                    </ul>
                
                </div>
        </nav>
        <>
        <Outlet />
        </>
        </div>

    )
}

export default  Navbar;