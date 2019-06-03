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
                  <a href="/about">About</a>
                  -
                  <a href="/add">Update Item</a>
                  -
                  <a href="/oops">Test 404</a>
                  -
                  <a href="/error">Test 500</a>
            </div>
         </div>
            <Route exact path = "/" component = {Home} />
            <Route path = "/about" component = {About} />
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

// -= About Page =-

class About extends React.Component {
   render() {
      return (
         <div class = "main">
            <h1>About...</h1>
         </div>
      )
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
