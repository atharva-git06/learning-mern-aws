import { useEffect, useState } from "react";
import {useParams } from "react-router-dom";
import { toast } from "react-toastify";

export const UpdateUser = () => {
  const params = useParams();
  const [userData, setUserData] = useState({
    username : "",
    email : "",
    phone : "",
  });

  const getUserInfo = async () => {
    try {
      const response = await fetch(
        `https://d1a64x3q3ktxtv.cloudfront.net/api/admin/users/${params.id}`,
        {
          method: "GET",
          headers: {
            Authorization: ` Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.log("error fetching particular user : " + error);
    }
}
    
    useEffect(() => {
        getUserInfo();
    },[])


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://d1a64x3q3ktxtv.cloudfront.net/api/admin/users/update/${params.id}`,{
                method:"PATCH",
                headers : {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,

                    //Authorization : AuthorizationToken,
                },
                body : JSON.stringify(userData),
            });
          
            const data = await response.json();
            console.log("data after UPDATE : " + data);
            if(response.ok){
              toast.success("User Details Updated Successfully");
              
            }
            
        } catch (error) {
            console.log("error updating the user : " + error);
        }
        
    };

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setUserData({
            ...userData,
            [name] : value,
        })

    };

    return (
      <>
        <section className="contact-section">
          <div className="contact-content">
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username">username</label>
                <input
                  type="text"
                  name="username"
                  placeholder="username"
                  value={userData.username}
                  onChange={handleInput}
                />
              </div>

              <div>
                <label htmlFor="email">email</label>
                <input
                  type="text"
                  name="email"
                  placeholder="email"
                  value={userData.email}
                  onChange={handleInput}
                />
              </div>

              <div>
                <label htmlFor="phine">phone</label>
                <input
                  type="text"
                  name="phone"
                  placeholder="phone"
                  value={userData.phone}
                  onChange={handleInput}
                />
              </div>
              <br />

              <button className="btn btn-submit">Update</button>
            </form>
          </div>
        </section>
      </>
    );
  
};
