import {useState,useEffect} from 'react'
import Navbar from './components/Navbar';
import HabitsHome from './components/HabitsHome';
import AddHabit from './components/AddHabits';
import WeekView from './components/WeekView';
import axios from "axios"
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Routes
} from "react-router-dom";


const apiUrl = 'habit';
function App() {
  // state variables to store habit details like streak and weekly status
  const [habits,setHabits] = useState([]);
  const [weekHabits,setWeekHabits] = useState([]);
  const [streak,setStreak] = useState([]);
  const addHabit = async (habit)=>{
      console.log("Onclick habit is sent out:", habit);
      let response = await axios.post("/habit/add",habit ).then(()=>{
        fetch("/habit")
        .then((response)=>{ console.log(response); return response.json()})
        .then((data)=> { console.log("Data: ",data.habits); setHabits(data.habits)})
        .catch((error)=>{ console.log(error)});
      }) 
  }

  useEffect(()=>{
      fetch("/habit")
      .then((response)=>{ console.log(response); return response.json()})
      .then((data)=> { console.log("Data: ",data.habits); setHabits(data.habits)})
      .catch((error)=>{ console.log(error)});

      fetch("/habit/getStreak")
      .then(response=> response.json())
      .then(data=> { console.log("Data: ",data.maxStreakHabit); setStreak(data.maxStreakHabit)} ) 
      .catch((error)=>{ console.log("error occured: ",error)})

      
  },[])
  useEffect(()=>{
    fetch("/habits/weekView")
      .then(response=> response.json())
      .then(data=> { console.log("Data: ",data.HabitsAfterUpdate); setWeekHabits(data.HabitsAfterUpdate)} ) 
      .catch((error)=>{ console.log("error occured: ",error)})
  },[habits])
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={ <Navbar addHabit={addHabit} />} >
            <Route path="/" element={<HabitsHome habits={habits} streak={streak} /> } />
            <Route path="/week_view" element={<WeekView  habits={weekHabits}/>} />
          </Route>
          <Route path="/week_view" element={<HabitsHome habits={habits} streak={streak} /> } />
        </Routes>
        
        
      </Router>
      
    </div>
  );
}

export default App;
