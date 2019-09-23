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
    this.fetchtoys();
  }
 
  
  Submitdata(event)
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
    })

  
   
  
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
         <Cards toy = {toy}/>
         </div>
       )
     })
  return (
    <div>
      <h1 align = "center">Greatest toy store</h1>
      
     <div className = "container mt-5">
            <form>
                <input type="text" className = "form-control" id="filter" placeholder="Search for..."  onChange={this.handleInputChange}/>
            </form>
       <div className = "mt-3">
    
       <form onSubmit = {this.Submitdata}>
      {toyform}
      </form>
      <button className = "btn btn-danger float-right" onClick={this.displayform}>Add</button>
      </div>
       <div className = "row mt-5">
      {toyCards}
      </div>
      </div>             
 
    </div>
   
  );
  
  }
}

export default App;
