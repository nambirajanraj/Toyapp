import React from 'react';

const Toyform = (props) =>{
   
     return (
         <div className = "Toyform">
             
             <label>Name :</label>
             <input type= "text" className = "form-control col-md-4" name="name"></input>
             <label>Featured :</label>
             <input type= "text" className = "form-control col-md-4" name= "featured"></input>
             <label>Rating :</label>
             <input type= "text" className = "form-control col-md-4" name="rating"></input><br></br>
             <select className= "form-control col-md-4" name = "category">
                <option>DC</option>
                <option>Marvel</option>
            </select>
             <button type= "submit" className = "btn btn-primary">Add new toy</button>

             
         </div>
     )
};

export default Toyform;