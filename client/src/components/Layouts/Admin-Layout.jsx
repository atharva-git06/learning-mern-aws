import { NavLink, Outlet } from "react-router-dom"
import { FaHome } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { IoIosContact } from "react-icons/io";

export const AdminLayout = () => {
    return (
        <>
        <header>
            <div className="container">
               <nav>
                <ul>
                <li>
                        <NavLink to="/admin">
                          <FaHome />  Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/users">
                           <FaUser /> users
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/contacts">
                           <IoIosContact/> Contacts
                        </NavLink>
                    </li>
                </ul>
               </nav>

            </div>
        </header>
        <Outlet />
        </>
    )
}