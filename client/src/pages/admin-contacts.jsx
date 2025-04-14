import { useEffect, useState } from "react";
import { toast } from "react-toastify";


export const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);

  const getAllContacts = async () => {
    try {
      const response = await fetch("https://d1a64x3q3ktxtv.cloudfront.net/api/admin/contacts", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await response.json();
      setContacts(data);
    } catch (error) {
      console.log("error fetching contacts : " + error);
    }
  };

  useEffect(() => {
    getAllContacts();
  }, []);

  const deleteContact = async (id) => {

    try {
        const response = await fetch (`https://d1a64x3q3ktxtv.cloudfront.net/api/admin/contacts/delete/${id}`,{
            method: "DELETE",
            headers : {
                Authorization  : `Bearer ${localStorage.getItem("token")}`
            }
        });
        if(response.ok){
            getAllContacts();
            toast.success("Contact Deleted Successfully");
        }else{
            toast.error("couldn't delete the contact");
        }
        
    } catch (error) {
         console.log("error deleting a contact : " + error);
    }
   
  };

  return (
    <>
      <div className="container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Message</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((currElem, index) => (
              <tr key={index}>
                <td>{currElem.username}</td>
                <td>{currElem.message}</td>

                <td>
                  <button
                    className="delete-btn"
                    onClick={() => deleteContact(currElem._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
