import React , {Component }from 'react';
import './App.css';
import Toyform from './form';
import Cards from './card';

class App extends Component {

  constructor(props){
    super(props);
   
    this.state ={
  
      toyData: [] , 
      ftoyData : [],
      name :"" ,
      featured : "",
      rating : "",
      query : "",
      refresh : ""
    };

    this.Submitdata = this.Submitdata.bind(this);
  }

  handleInputChange = (event) => {
    this.setState({
        query: event.target.value
    },
    this.filterArray
   );
  }

  displayform = () => {
     this.setState({
        displayform : !this.state.displayform
     })
  }

  fetchtoys(){
    console.log("fetch called");
    console.log(this);
    fetch('http://localhost:8000/toys')
    .then(res => res.json())
     .then((data => {
      
       this.setState({toyData : data , ftoyData : data})
      
     }));
     
  }

  filterArray = () => {
    let searchString = this.state.query;
    let responseData =[];
    let t  = this.state.toyData;



    if(searchString.length > 0){
        // console.log(responseData[i].name);
        let j = 0;
        for(let i=0 ; i< t.length ; i++)
        {
             
           if(t[i].name.includes(searchString))
            {
              responseData[j] = t[i];
              j++;
            }
        }
       console.log(responseData);
      
      
    this.setState({
      ftoyData : responseData
      }, () =>{
        console.log(this.state.ftoyData);
      });
         
    }
    else {
      this.setState({
        ftoyData : t
        }, () =>{
          console.log(this.state.ftoyData);
        });
    }


}

  
  componentDidMount()
  {
    this.fetchtoys();
  }

  componentDidUpdate()
  {
    
  }
 
  
  Submitdata =(event)=>
  {
       event.preventDefault();
      var data = new FormData(event.target);
       
       console.log(data.get('name'));

       fetch ('http://localhost:8000/toy',{
        method : "POST",
        mode : "cors",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({"name" : data.get('name') , "featured" : data.get("featured") , "rating" : data.get("rating")})
    }).then(() => { this.fetchtoys()
      
    });

  
   
  
  }
 
  render(){
   
    if(this.state.displayform)
        { var toyform =(
           <div>
             <Toyform/>
           </div>
        )
        }
     let toyCards  = this.state.ftoyData.map(toy => {
       return (
         <div className = "col-md-4">
         <Cards toy = {toy} parent = {this}/>
         </div>
       )
     })
  return (
    <div className  = "container">
        <div className = "text-center header mt-3">Greatest Toys Store</div>
        <div className = "text-center headerdesc"> This is a collection of the largest and the baddest toys </div>
        <div className = "mt-2 pt-2">
          <input placeholder = "What are you looking for?" onChange={this.handleInputChange} className ="form-control form-control-sm col-md-3 float-left  m-2" ></input>
          <select className= "form-control form-control-sm float-left col-md-2 m-2" >
                <option>Featured</option>
                <option>Rating</option>
            </select><br></br><br></br>
            <label > Filter by Brand :  </label><br></br>
            <label className="checkbox-inline p-2"><input  type="checkbox" value=""/> DC Comics</label>
            <label className="checkbox-inline p-2"><input  type="checkbox" value=""/> Marvel</label>
          <button className="btn btn-danger float-right" onClick={this.displayform}>Add</button>
        </div>

        <div className = "mt-3">
      
      <form onSubmit = {this.Submitdata}>
     {toyform}
     </form>
     </div>
      <div className = "row mt-5">
     {toyCards}
     </div>
     </div>      
     
   
  );
  
  }
}

export default App;
