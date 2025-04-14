import { useState } from "react";
import { useAuth } from "../store/auth";

const defaultContactFormData = {
  email: "",
  message: "",
};

export const Contact = () => {
  const [user, setUser] = useState(defaultContactFormData);

  const { userData } = useAuth();

  const [userExist, setUserExist] = useState(true);

  if(userData && userExist){
    setUser({
      email : userData.email,
      message : "",
    });
    setUserExist(false);
  }

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://d1a64x3q3ktxtv.cloudfront.net/api/auth/contactUs",{
        method : "POST",
        headers : {
          "Content-Type" : "application/json",
        },
        body : JSON.stringify(user),
      });

      if(response.ok){
        alert("Your Response is successfully submitted")
      }
    } catch (error) {
      console.log("error while contacting : " + error)
    }
  };

  return (
    <>
    
    <section className="contact-section" >

        <div className="container grid grid-two-cols">
            <div className="contact-image">
               
               <img src="/images/support.png" alt="contactimage" height={400} width={400} />

            </div>

            <div className="contact-content">
                <form onSubmit={handleSubmit}>
                  <div>
                  <label htmlFor="email">email</label>
                  <input type="text" name="email" placeholder="email" value={user.email} onChange={handleInput} />
                  </div>

                  <div>
                    <label htmlFor="message">message</label>
                    <input type="text" name="message" placeholder="message" value={user.message} onChange={handleInput} />
                  </div>
                  <br />

                  <button className="btn btn-submit">
                    Submit
                  </button>


                 
                 
                </form>

            </div>

        </div>

    </section>
    
    </>
  );
};
