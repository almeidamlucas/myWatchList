import React from 'react'
import { NavLink } from 'react-router-dom'
import './styles.css'

function Menu () {
    return (
        <header>
            <nav>
                <div className="app-logo">
                    <h1>MY  WATCH LIST</h1>
                    <i className="fa fa-film"></i>
                </div>

                <div className="nav-items">
                    <ul>
                        <li><NavLink to="/film-list" className="menuOption" activeClassName="selectedTab">Film List</NavLink></li>
                        <li><NavLink to="/watch-list" className="menuOption" activeClassName="selectedTab">Watch List</NavLink></li>
                    </ul>
                </div>
            </nav>
        </header>
    )
}

export default Menu