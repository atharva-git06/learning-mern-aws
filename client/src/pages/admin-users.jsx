import { useEffect, useState } from "react";
import { useAuth } from "../store/auth"
import "../components/css/admin-user.css";
import { Link } from "react-router-dom";




export const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const { AuthorizationToken } = useAuth();

    const getAllUsers = async () => {
        try {
            const response = await fetch("https://d1a64x3q3ktxtv.cloudfront.net/api/admin/users", {
                method: "GET",
                headers: {
                   // Authorization: AuthorizationToken,
                   Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                setUsers(data);
            } else {
                console.log("Response while fetching admin users is not OK");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const deleteUser =  async (id) => {

        try {
            console.log("inside try of delete : " + id);
            const response = await fetch(`https://d1a64x3q3ktxtv.cloudfront.net/api/admin/users/delete/${id}`,{
                method:"DELETE",
                headers : {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,

                    //Authorization : AuthorizationToken,
                }
            });
            console.log("fetch completed");
            const data = await response.json();
            console.log("data after delete : " + data);
            if(response.ok){
                console.log("before get all");
             getAllUsers()
             console.log("after get all");
            }
            
        } catch (error) {
            console.log("error deleting the user : " + error);
        }
        
    }

    useEffect(() => {
        getAllUsers();
    }, []);

    return (
        <>
            <h1>Admin Users</h1>
            <div className="container">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((currElem, index) => (
                            <tr key={index}>
                                <td>{currElem.username}</td>
                                <td>{currElem.email}</td>
                                <td>{currElem.phone}</td>
                                <td>
                                  <Link to={`/admin/user/${currElem._id}/edit`} > Edit </Link>
                                </td>
                                <td>
                                    <button className="delete-btn" onClick={()=> deleteUser(currElem._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};
