import 'bootstrap/dist/css/bootstrap.min.css'
import {MapView} from "./components/MapView.jsx";
import {SideBar} from "./components/SideBar.jsx";
import {useState} from "react";

function App() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen)
    }

    return (
        <div className="d-flex flex-column vh-100">
            <header>
                <nav className="navbar navbar-dark bg-dark">
                    <div className="container p-1">
                        <h1 className="navbar-brand">MSC Mini Project</h1>
                    </div>
                </nav>
            </header>
            <div className="d-flex flex-grow-1">
                <aside style={{display: isSidebarOpen ? 'block' : 'none'}} className="col-2">
                    <SideBar className={"bg-warning"} style={{height:'100%'}}/>
                </aside>
                <main className="flex-grow-1">
                    <MapView className={"bg-info"} style={{height:'100%'}}/>
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