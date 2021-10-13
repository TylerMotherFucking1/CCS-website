import React from "react"
import Config from "../utils/Config"
import { Link } from "react-router-dom"

class Navbar extends React.Component {
    render() {
        return (
            <nav className="navbar">
                <div className="container-fluid">
                    <div className="navbar-header">
                        {/* dynamic nav bar items */}
                        {Config.TopNavBarItem.map(
                            (item )=>
                            <Link key={item.index} className="navbar-brand" to={item.url}>
                                <i>{item.image}</i>
                                <span>{item.title} </span>
                            </Link>
                        )}
                    
                    </div>

                </div>
            </nav>
        )
    }
}

export default Navbar