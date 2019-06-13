import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Axios from 'axios';


class App extends React.Component {

   render() {
      return(
         <Router>
         <div class="nav-bar">
            <h1>ITC-230</h1>
            <div class="nav-links">
                  <Link to="/">Home</Link>
                  -
                  <a href="/add">Update Item</a>
            </div>
         </div>
            <Route exact path = "/" component = {Home} />
            <Route path = "/add" component = {Add} />
            <Route path = "/show-detail/:inTitle" component = {Detail} />
         </Router>
      );
   }
}
export default App;


// -= Home Page =-

class Home extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         data: [],
         currentItem: null
      };
   }

   componentDidMount(){
      this.getDataFromDb();
   };

   getDataFromDb = () => {
      fetch('http://localhost:3001/api/getAll')
        .then((data) => data.json())
        .then((res) => this.setState({ data: res.data }));
  };

  showData(inData){
      this.props.history.push("/show-detail/" + inData);
  };

   render() {
      const { data } = this.state;
      return(
         <div class="main">
            <h1>Home Page</h1>
            <h2>Search for Item</h2>
            <form id="search-form" action="/detail" method="POST">
               <lable>Search: </lable>
               <input type="text" name="searchTitle"></input>
               <input type="submit" value="Search" />
            </form>
      
            <h2>All Items in List</h2>
            <h4>Items can be added, updated, and/or removed via the "Update Item" tab on the nav bar</h4>
            
            {
               data.length <= 0
               ? 'NO DB ENTRIES YET'
               : data.map((dat) => (
                  
               <div class="item-container" id={dat.title} onClick={() => this.showData(dat.title)}>
                  <p>- {dat.title} -<br />
                  {dat.content}</p>
               </div>
            ))}
         </div>
      );
   }

}

// -= Add Page =-

class Add extends React.Component {
   constructor(props) {
      super(props);
      this.updateList = this.updateList.bind(this);
      this.populateForm = this.populateForm.bind(this);
      this.titleValue = this.titleValue.bind(this);
      this.deleteDataFromDb = this.deleteDataFromDb.bind(this);
      this.state = {
         data: [],
         currentItem: null,
         titleVal: ""
      };
   }

   componentDidMount(){
      this.getDataFromDb();
   };

   getDataFromDb = () => {
      fetch('http://localhost:3001/api/getAll')
        .then((data) => data.json())
        .then((res) => this.setState({ data: res.data }));
  };

  deleteDataFromDb(){
   fetch('http://localhost:3001/api/delete?title=' + this.state.titleVal)
     .then((data) => data.json())
     .then((res) => this.setState({ currentItem: res.data }))
     .then(() => window.location.reload());
  };

  populateForm(inData){
   fetch('http://localhost:3001/api/getOne?title=' + inData)
     .then((data) => data.json())
     .then((res) => this.setState({ currentItem: res.data }))
     .then(() => {
         document.getElementById("titleField").value = this.state.currentItem.title;
         document.getElementById("contentField").value = this.state.currentItem.content;
         this.setState({ titleVal: this.state.currentItem.title });
     });
  };

  titleValue(event){
     this.setState({
         titleVal: event.target.value
     })
  };

  clearForm(){
     document.getElementById("search-form").reset();
  }

  updateList(event){
      event.preventDefault();
      const data = new FormData(event.target);
      console.log(data);
      console.log(data.get('upTitle'));
      const output = {
         upTitle: data.get("upTitle"),
         upContent: data.get("upContent")
      }

      fetch("http://localhost:3001/api/update", {
         method: "POST",
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(output)
      })
      .then(() => window.location.reload());
  };

   render() {
      const { data } = this.state;
      return(
         <div class="main">
            <h1>Update Page</h1>
            <h2>Item to be added/modified/removed from the database</h2>
            <form id="search-form" onSubmit={this.updateList}>
               <lable>Title: </lable>
               <input id="titleField" type="text" name="upTitle" onChange={this.titleValue}></input>

               <lable>Content: </lable>
               <input id="contentField" type="text" name="upContent"></input>

               <input type="submit" value="Update" />
            </form>
            <input type="button" value="Delete" onClick={this.deleteDataFromDb} />
            <input type="button" value="Clear" onClick={this.clearForm} />
      
            <h2>All Items in List</h2>
            
            {
               data.length <= 0
               ? 'NO DB ENTRIES YET'
               : data.map((dat) => (
                  
               <div class="item-container" id={dat.title} onClick={() => this.populateForm(dat.title)}>
                  <p>- {dat.title} -<br />
                  {dat.content}</p>
               </div>
            ))}
         </div>
      );
   }
}

class Detail extends React.Component {
   
   constructor(props) {
      super(props);
      this.state = {
         data: []
      };
   }

   componentDidMount(){
      const { match: { params } } = this.props;
      fetch('http://localhost:3001/api/getOne?title=' + params.inTitle)
        .then((data) => data.json())
        .then((res) => this.setState({ data: res.data }));
   };


   render() {
      const { data } = this.state;
      console.log(this.state);
      return (
         <div class = "main">
            {
               data.length <= 0
               ? 'NO DB ENTRIES YET'
               :    
                  <div class="item-container" id={data.title} onClick={() => this.showData(data.title)}>
                     <p>- {data.title} -<br />
                     {data.content}</p>
                  </div>
               
            }
            
         </div>
      )
   }
}
