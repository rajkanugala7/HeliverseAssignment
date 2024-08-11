import Login from "./Login";
import Navbar from "./Navbar";

export default function HomePage() {
    return ( 
        <div className="home">
             <Navbar/>
            <img src="/bgHome.jpg" alt="" className="bghome" />
            
            <Login/>
        </div>
    )
}