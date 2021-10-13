import React from 'react'
import usericon from 'adminbsb-materialdesign/images/user.png'
import Config from '../utils/Config'
import {Link} from 'react-router-dom'

class Sidebar extends React.Component {

    render() {
        return (
            <section>
                <aside id="leftsidebar" className="sidebar">
                    <div className="user-info">
                        <div className="image">
                            <img src={usericon} width="48" height="48" alt="User" />
                        </div>
                        <div className="info-container">
                            <div className="name"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false">
                                User
                            </div>

                        </div>
                    </div>
                    <div className="menu">
                        <div className="slimScrollDiv" style={{ position: " relative", overflow: " hidden", width: " auto"}}>
                            <ul className="list" style={{ overflow: "hidden", width: "auto" }}>
                                <li className="header">MAIN NAVIGATION</li>
                                {/* dynamic side bar items */}
                                {Config.sidebarItem.map(
                                    (item) =>
                                        <li key={item.index}
                                        className={item.index == this.props.activepage ? 
                                        "active" : ""}>
                                            <Link to={item.url} className="toggled waves-effect waves-block">
                                                <i className="material-icons">{item.icons}</i>
                                                <span>{item.title}</span>
                                            </Link>
                                        </li>
                                )}
                                <li >
                                    <Link to={Config.logoutPage} className="toggled waves-effect waves-block">
                                        <i className="material-icons">input</i>
                                        <span>Logout</span>
                                    </Link>
                                </li>
                            </ul><div className="slimScrollBar" style={{
                                background: "rgba(0, 0, 0, 0.5)",
                                width: "4px", position: "absolute", top: "0px", opacity: "0.4", display: "none",
                                borderRadius: "0px", zIndex: "99", right: "1px", height: "125px"
                            }}></div>

                            <div className="slimScrollRail" style={{
                                width: "4px", height: "100%", position: "absolute",
                                top: "0px", display: "none", borderRadius: "0px", background: "rgb(51, 51, 51)", opacity: "0.2",
                                zIndex: "90", right: "1px"
                            }}></div>
                        </div>
                    </div>
                    <div className="legal">
                        <div className="copyright">
                            © 2021 <a href="#">CCS Admin</a>.
                        </div>
                        <div className="version">
                            <b>Version: </b> 1.0.5
                        </div>
                    </div>
                </aside>
            </section>
        )
    }
}

export default Sidebar
