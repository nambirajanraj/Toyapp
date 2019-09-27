import React , {Component} from 'react';
import {Card , CardImg , CardText , CardBody, CardTitle ,Button} from 'reactstrap';
class Cards extends Component {
    constructor(props){
        super(props);
        this.state = {
            displayform : false 
        }
        this.deletetoy = this.deletetoy.bind(this);
    }

    displayform = () => {
        this.setState({
           displayform : !this.state.displayform
        })
     }
     updateData = (event) =>
     {
          event.preventDefault();
         var data = new FormData(event.target);
             
          console.log(data.get('name'));
          
          fetch ('http://localhost:8000/toy',{
           method : "PUT",
           mode : "cors",
           headers : {
               "Content-Type" : "application/json"
           },
           body : JSON.stringify({"name" : data.get('name') , "rating" : data.get("rating")})
       }).then(() => { this.props.parent.fetchtoys();
              
       });
   
       
      
     }
    render(){

        if(this.state.displayform)
        { var updateform =(
        
         <div className = "Updateform">
        
             <input type= "text" className = "form-control col-md-4 float-left " name="rating"></input>
             <input type= "hidden" name="name" value = {this.props.toy.name}></input>
             <button type= "submit" className = "btn btn-primary"> ok</button> 
             <br></br>
            
         </div>)}
     
         
        
        
        
        return (
            <div className = "col-md-3 mt-5">
            <Card style={{ width: '18rem' }}>
            <CardImg variant="top" src="" />
            <CardBody>
                <CardTitle>{this.props.toy.name}</CardTitle>
                <CardText>
                 Featured  : {this.props.toy.featured} <br></br> 
                 Rating : { this.props.toy.rating}
                </CardText>
                <form onSubmit = {this.updateData}>
                   {updateform}
                 </form>
                <Button variant="primary" className ="float-left"  onClick={this.displayform}>Update</Button>
                <Button className = "float-right" onClick = { () => {this.deletetoy(this.props.toy.id)}}>Delete</Button>
                
            </CardBody>
            </Card>
            </div>
        )
    }

    
    

    deletetoy = (id) =>
    {
       fetch ('http://localhost:8000/toy',{
           method : "DELETE",
           mode : "cors",
           headers : {
               "Content-Type" : "application/json"
           },
           body : JSON.stringify({"id" : id})
       }).then(() => { this.props.parent.fetchtoys();
              
       });

       
    


    }
}

export default Cards;