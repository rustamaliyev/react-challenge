import React from 'react';



class Navbar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            users: [],
            displayNone: true

           
        }
       
    }

    showMobileNav(){
        this.setState({displayNone: !this.state.displayNone})
     }

     render(){
     //toggle for mobile navigation    
     let show_class = this.state.displayNone ? "hide" : "show";
     return (   
    
    <nav>
    <div className="container">
       <div className="flex-grid-thirds">
               <div className="col-2">
                   <div className="menu-left">
                       <a href="#"><i className="fas fa-angle-left"></i>  Patients</a>
                   </div>
                   
               </div>
               <div className="col-8">
                   <span className="navbar-toggle" id="js-navbar-toggle" onClick={this.showMobileNav.bind(this)}><i className="fas fa-bars"></i></span>
                   <div className="menu">
                       <ul className={show_class} id="js-menu">
                           <li><a href="#" title="Patients" className="active">PATIENTS</a></li>
                           <li><a href="#" title="Tasks">TASKS</a></li>
                           <li><a href="#" title="Dashboard">DASHBOARD</a></li>
                       </ul>
                   </div>    
               </div>
               <div className="col-2">
                   <div className="menu-right">
                       <img className="profile-pic" src="https://image.flaticon.com/icons/png/128/149/149071.png" />    
                       <a href="#">Test User <i className="fas fa-caret-down"></i></a>
                   </div>
               </div>   
           </div>
               
       </div>   


    </nav>
        );
     }
    
    }
    export default Navbar;
