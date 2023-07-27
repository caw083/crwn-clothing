import { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";
import {ReactComponent as CrwnLogo} from '../../assets/crown.svg';
import './navigation.scss';

const Navigation = () => {
    return (
        <Fragment>
            <div className='navigation'>
                <Link className="logo-container" to="/">
                    <CrwnLogo className="logo" />
                </Link>
                <nav className="nav-links-container">         
                    <Link to="/shop" className="nav-link">SHOP</Link>    
                    <Link to='/signin' className="nav-link">SIGN IN</Link> 
                </nav>   
            </div>
            <Outlet />
        </Fragment>
    )
}

export default Navigation;