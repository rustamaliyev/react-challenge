import React from 'react';

const navbar = props => (
    <nav>
    <div className="container">
       <div className="flex-grid-thirds">
               <div className="col-2">
                   <div className="menu-left">
                       <a href="#"><i className="fas fa-angle-left"></i>  Patients</a>
                   </div>
                   
               </div>
               <div className="col-8">
                   <span className="navbar-toggle" id="js-navbar-toggle"><i className="fas fa-bars"></i></span>
                   <div className="menu">
                       <ul className="main-nav" id="js-menu">
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

export default navbar;