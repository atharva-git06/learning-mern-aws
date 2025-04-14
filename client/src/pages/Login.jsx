import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import {toast} from "react-toastify";

export const Login = () => {
  const [user, setUser] = useState({
    email: "",
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


const {storeTokenInLS} = useAuth();
const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://d1a64x3q3ktxtv.cloudfront.net/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        const res_data = await response.json();
        setUser({ email: "", password: "" });

        storeTokenInLS(res_data.token);
        toast.success("Logged in Successfully");


        navigate("/");
      } else {
        toast.error("Invalid Credentials");
      }
    } catch (error) {
        console.log(error);
    }

  };

  return (
    <>
      <section>
        <main>
          <div className="section-login">
            <div className="container grid grid-two-cols">
              <div className="login-image reg-img">
                <img
                  src="/images/login.png"
                  alt="login"
                  width={500}
                  height={500}
                />
              </div>

              <div className="login-form">
                <h1 className="main-heading mb-3">Login Form</h1>
                <br />
                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="email">email</label>
                    <input
                      type="text"
                      name="email"
                      value={user.email}
                      onChange={handleInput}
                      placeholder="name"
                    />
                  </div>
                  <div>
                    <label htmlFor="password">password</label>
                    <input
                      type="text"
                      name="password"
                      value={user.password}
                      onChange={handleInput}
                      placeholder="password"
                    />
                  </div>
                  <br />
                  <button type="submit" className="btn-btn submit">
                    Login Now
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
