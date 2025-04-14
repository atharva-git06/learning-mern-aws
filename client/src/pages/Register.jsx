import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import {toast} from "react-toastify";

export const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

const { storeTokenInLS } = useAuth();
const navigate = useNavigate();

  const handleSubmit =  async (e) => {
    e.preventDefault();

        console.log('inside try of reg');
      const response = await fetch("https://d1a64x3q3ktxtv.cloudfront.net/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      console.log('after response');

     // console.log("response data : ", response);
      const res_data = await response.json();
      if(response.ok){

        console.log('before save');
        storeTokenInLS(res_data.token);
        console.log('after save');

        toast.success("registration successful");
        setUser({
            username: "",
            email: "",
            phone: "",
            password: "",
        })

        navigate("/login");

      }else{
        console.log("inside else of reg");
        toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
        console.log("some error inside register");
      }

  };

  return (
    <>
      <section>
        <main>
          <div className="section-registration">
            <div className="container grid grid-two-col">
              <div className="registration-image reg-img">
                <img
                  src="/images/register.png"
                  alt="nurse"
                  width={500}
                  height={500}
                />
              </div>

              <div className="registration-form">
                <h1 className="main-heading mb-3">Registration Form</h1>
                <br />
                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="username">username</label>
                    <input
                      type="text"
                      name="username"
                      value={user.username}
                      onChange={handleInput}
                      placeholder="username"
                    />
                  </div>
                  <div>
                    <label htmlFor="email">email</label>
                    <input
                      type="text"
                      name="email"
                      value={user.email}
                      onChange={handleInput}
                      placeholder="email"
                    />
                  </div>
                  <div>
                    <label htmlFor="username">phone</label>
                    <input
                      type="number"
                      name="phone"
                      value={user.phone}
                      onChange={handleInput}
                      placeholder="phone"
                    />
                  </div>
                  <div>
                    <label htmlFor="username">password</label>
                    <input
                      type="text"
                      name="password"
                      value={user.password}
                      onChange={handleInput}
                      placeholder="password"
                    />
                  </div>
                  <br />
                  <button type="submit" className="btn btn-submit">
                    Register Now
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};



