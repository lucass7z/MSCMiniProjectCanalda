import 'bootstrap/dist/css/bootstrap.min.css'
import {MapView} from "./components/MapView.jsx";
import {SideBar} from "./components/SideBar.jsx";
import {useState} from "react";
import axios from 'axios';


const locationList = [
    {id: 1, name: "Hall Bat A", lat: 47.495446029974104, lng: 6.804566381084012},
    {id: 2, name: "C212", lat: 47.495754870823276, lng: 6.804892734849131},
    {id: 3, name: "Parking UFC", lat: 47.49579479287341, lng: 6.8020845008516595},
    {id: 4, name: "Arret de bus UFC", lat: 47.49572004976723, lng: 6.8038800273380655},
    {id: 5, name: "Ichem Home", lat: 47.47934241836873, lng: 6.8501573993816915},
    {id: 6, name: "Val Home", lat: 47.6423, lng: 6.8544},
    {id: 7, name: "Resto U", lat: 47.49607814802254, lng: 6.803555422159269},
    {id: 8, name: "Lucas Home", lat: 47.516778766990335, lng: 6.188673026622122},
    {id: 9, name: "Smellies", lat: 47.51437846828597, lng: 6.828913586040338},
    {id: 10, name: "CGI", lat: 47.49686583511841, lng: 6.802140947416472},
    {id: 11, name: "Forevia", lat: 47.466868771799184, lng: 6.846179284279212},
    {id: 12, name: "Enedis-Bersot", lat: 47.23921246075788, lng: 6.029989913011836},
    {id: 13, name: "Enedis-Scwhander", lat: 47.50419876612662, lng: 6.808944980585534},
]

function App() {

    const [isSidebarOpen, setIsSidebarOpen] = useState(true)

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen)
    }

    const [users, setUsers] = useState([])

    const addUser = (user) => {
        setUsers([...users, user])
    }
    const removeUser = (user) => {
        setUsers(users.filter(u => u.id !== user.id))
        setRdv(null)
    }

    const getLocationByName= (name)=>{
        return locationList.find(l => l.name === name)
    }

    const [rdv, setRdv] = useState(null)

    const makeRdv = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:5000/run-python', {
                nbUsers: users.length,
                locations : users.map(u => u.location.id)
            });
            setRdv(getLocationByName(response.data['best_location']));
        } catch (error) {
            console.error('Error executing Python code:', error);
        }
    };

    return (
        <div className="d-flex flex-column vh-100">
            <header>
                <nav className="navbar navbar-dark bg-dark">
                    <a className="navbar-brand nav-item p-2" href={"/"}>MSC Mini Project</a>
                </nav>
            </header>
            <div className="d-flex flex-grow-1">
                <aside style={{display: isSidebarOpen ? 'block' : 'none'}} className="col-2">
                    <SideBar className={"bg-warning"} style={{height:'100%'}} users={users} addUser={addUser} removeUser={removeUser} locationList={locationList} makeRdv={makeRdv}/>
                </aside>
                <main className="flex-grow-1">
                    <MapView className={"bg-info"} style={{height:'100%'}} locationList={locationList} users={users} rdv={rdv}/>
                </main>
            </div>
            <footer className="bg-dark text-white text-center py-3 mt-auto">
                <div className="container">
                    <p className="mb-0">MSC Mini Project - Mobility in Smart Cities</p>
                    <p className="mb-0">&copy; 2024 - Marchal Valentin, Mous Ichem, Lucas Cattin</p>
                </div>
            </footer>
        </div>
    )
}

export default App