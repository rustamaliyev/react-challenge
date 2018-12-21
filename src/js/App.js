import React from 'react';
import Collapsible from './Collapsible';

class App extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            users: []
           
        }
       
    }

    
    componentWillMount() {
        localStorage.getItem('users') && this.setState({
          users: JSON.parse(localStorage.getItem('users')),
            isLoading: false
        })
    }
    

    componentDidMount(){

        const date = localStorage.getItem('usersDate');
        const usersDate = date && new Date(parseInt(date));
        const now = new Date();

        const dataAge = Math.round((now - usersDate) / (1000 * 60)); // in minutes
        const tooOld = dataAge >= 5; //cache data for 5 minutes

        if(tooOld){
            this.fetchData();            
        } else {
            console.log(`Using data from localStorage that are ${dataAge} minutes old.`);
        }

    }

    fetchData(){
     
        this.setState({
            isLoading: true,
            users: []
            
        })

        fetch('http://localhost:8080/users')
        .then(response => response.json())
        .then(parsedJSON => parsedJSON.map(user => (
            {
                id: `${user.id}`,
                name: `${user.name}`,
                email: `${user.email}`,
                phone: `${user.phone}`,
                zip: `${user.zip}`,
            }
        )))
        .then(users => this.setState({
          users,
            isLoading: false
        }))
        .catch(error => console.log('parsing failed', error))
        
    }

    componentWillUpdate(nextProps, nextState) {
       
        localStorage.setItem('users', JSON.stringify(nextState.users));
        localStorage.setItem('usersDate', Date.now());
    }
    
    
    render() {
        
        const {isLoading, users} = this.state;
        return (

             <div>
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
                 <section id= "subheader">
                    <div className="container">
                        <h1>Fetching Users</h1>
                    </div>
                </section>
                <section id="main">
                <div className="container">
                 <div className="middle-content">
                <div className="middle-box">
                   <button className="btn btn-sm btn-danger" onClick={(e) => {
                        this.fetchData();    
                    }}>Refresh Cache</button>
         
                <div className={`content ${isLoading ? 'is-loading' : ''}`}>
                    <div className="panel-group">
                        {
                            !isLoading && users.length > 0 ? users.map(user => {
                                const {id, name, email, phone, zip} = user;
                                return <Collapsible key={id} title={name}>
                                    <p>Phone: {phone}</p>
                                    <p>Email: {email}</p>
                                    <p>Zip: {zip}</p>
                                </Collapsible>
                            }) : null
                        }
                    </div>
                    <div className="loader">
                        <div className="icon"></div>
                    </div>
                </div>
            </div>   
            </div>
            </div>
            </section>

            <footer>
                <div className="container">
                    <div className="copyrights">&copy; 2018 SkinIO, LLC</div>
                </div>
           </footer>   

            </div>
        );
    }
}
export default App;