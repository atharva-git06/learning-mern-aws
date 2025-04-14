import { useEffect, useState } from "react";

export const Service = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    getServices();
  }, []);

  const getServices = async () => {
    try {
      const response = await fetch("https://d1a64x3q3ktxtv.cloudfront.net/api/data/services", {
        method: "GET",
        credentials: "include"
      });
      if (response.ok) {
        const data = await response.json();
        setServices(data.msg);
        console.log("Services : " + data);
      }
    } catch (error) {
      console.log("Error fetching services" + error);
   
    }
  };

  return (
    <>
     
       

        <div className="container">
          <h1>Service</h1>
          <div className="container grid grid-three-cols">
    
    {services.map((currElem, index) => {
      const { price, description, provider, service } = currElem;
      return (
        <div className="card" key={index}>
          <div className="card-img">
            <img src="/images/login.png" alt="services" width={200} />
          </div>
          <div className="class-details">
            <div className="grid grid-two-cols">
              <p>{provider}</p>
              <p>{price}</p>
            </div>
            <h2>{service}</h2>
            <p>{description}</p>
          </div>
        </div>
      );
    })}
  </div>
        </div>
      
    </>
  );
};
