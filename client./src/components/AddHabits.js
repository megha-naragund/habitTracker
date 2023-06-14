// App.js
import React, { useState } from 'react';
// import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap'

function AddHabit({addHabit}) {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const [habit, setHabit] = React.useState({'habit':''});
const handleNameChange=(e)=>{
  console.log(e.target.name+" on change name is displayed ")
  const term = e.target.name;
  setHabit( {'habit':e.target.value});
 
  // console.log(product.term+" from product state")
}

  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Add Habit
      </Button>

      <Modal show={show} onHide={handleClose} style={{marginTop: "4rem"}}>

        <Modal.Header closeButton>
          <Modal.Title>Add new Habit</Modal.Title>
        </Modal.Header>

        {/* <Modal.Body> */}
        <form  onSubmit={(e)=> {e.preventDefault(); addHabit(habit); }}>
                    {/* <section id="descriptionContainer"> */}
                    <Modal.Body>
                        <label for="name">Name of Habit:</label><br/>
                        <input type="text" id="name" name="name" onChange={handleNameChange}  required /><br/>
                        </Modal.Body>
                        {/* <Button variant="primary" type='submit' onClick={handleClose}>AddProduct</Button> */}
            
        

        <Modal.Footer>

          <Button variant="secondary" onClick={handleClose}>Close</Button>
          {/* <Button variant="primary" onClick={handleClose}>Submit</Button> */}
          <Button variant="primary" type='submit' onClick={handleClose}>Add Habit</Button>

        </Modal.Footer>
        </form>
      </Modal>

    </div>
  );
}

export default AddHabit;




const styles={
    addProductContainer:{
        backgroundColor:'black',
        // color:'white',
        width: '60%',
        // float:'center'
        top:0,
        bottom:0,
        marginLeft:'25%',
        height: '40rem',
        width:'35rem'
    }
}