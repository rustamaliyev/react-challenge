import React from 'react';
import Collapsible from './components/Collapsible';
import Navbar from './components/Navbar'
import Subheader from './components/Subheader'
import Footer from './components/Footer'
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
                 <Navbar />
                 <Subheader />
                 
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
            <Footer />           
             

            </div>
        );
    }
}
export default App;