import { useState } from "react";
import "./App.css";

function App() {

  const [carpetArea, setCarpetArea] = useState("");
  const [bathroom, setBathroom] = useState("");
  const [balcony, setBalcony] = useState("");
  const [parking, setParking] = useState("");
  const [floorNumber, setFloorNumber] = useState("1");

  const [location, setLocation] = useState("mumbai");
  const [status, setStatus] = useState("Ready to Move");
  const [transaction, setTransaction] = useState("Resale");
  const [furnishing, setFurnishing] = useState("Semi-Furnished");
  const [ownership, setOwnership] = useState("Freehold");

  const [price, setPrice] = useState("₹0");
  const [loading, setLoading] = useState(false);



  const predictPrice = async () => {

    setLoading(true);

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/predict",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({

            Index: 0,

            location: location,

            "Carpet Area": Number(carpetArea),

            Status: status,

            Floor: floorNumber,

            Transaction: transaction,

            Furnishing: furnishing,

            facing: "North",

            overlooking: "Garden/Park",

            Bathroom: Number(bathroom),

            Balcony: Number(balcony),

            "Car Parking": Number(parking),

            Ownership: ownership,

            "Super Area": carpetArea + " sqft"

          })

        }
      );


      const data = await response.json();

      console.log(data);


      if (data.error) {

        alert(data.error);

      } else {

        setPrice(
          "₹ " +
          Number(data.predicted_price)
          .toLocaleString()
        );

      }


    } catch (error) {

      console.log(error);

      alert("Cannot connect to Backend");

    }


    setLoading(false);

  };



  return (

    <div className="page">

      <div className="container">


        <div className="header">

          <h1>
            🏠 House Price Prediction
          </h1>

          <p className="subtitle">
            Predict house prices using Machine Learning
          </p>

        </div>



        <div className="form">


          <input
            type="number"
            placeholder="📐 Carpet Area"
            value={carpetArea}
            onChange={(e)=>setCarpetArea(e.target.value)}
          />


          <input
            type="number"
            placeholder="🛁 Bathroom"
            value={bathroom}
            onChange={(e)=>setBathroom(e.target.value)}
          />


          <input
            type="number"
            placeholder="🌅 Balcony"
            value={balcony}
            onChange={(e)=>setBalcony(e.target.value)}
          />


          <input
            type="number"
            placeholder="🚗 Car Parking"
            value={parking}
            onChange={(e)=>setParking(e.target.value)}
          />


          <input
            type="text"
            placeholder="🏢 Floor"
            value={floorNumber}
            onChange={(e)=>setFloorNumber(e.target.value)}
          />



          <select
            value={location}
            onChange={(e)=>setLocation(e.target.value)}
          >
            <option value="mumbai">Mumbai</option>
            <option value="new-delhi">New Delhi</option>
            <option value="navi-mumbai">Navi Mumbai</option>
            <option value="thane">Thane</option>
            <option value="pune">Pune</option>
            <option value="bangalore">Bangalore</option>
          </select>



          <select
            value={status}
            onChange={(e)=>setStatus(e.target.value)}
          >
            <option value="Ready to Move">
              Ready to Move
            </option>
          </select>



          <select
            value={transaction}
            onChange={(e)=>setTransaction(e.target.value)}
          >
            <option value="Resale">
              Resale
              </option>

            <option value="New Property">
              New Property
            </option>

            <option value="Rent/Lease">
              Rent/Lease
            </option>

            <option value="Other">
              Other
            </option>

          </select>



          <select
            value={furnishing}
            onChange={(e)=>setFurnishing(e.target.value)}
          >

            <option value="Semi-Furnished">
              Semi-Furnished
            </option>

            <option value="Furnished">
              Furnised
            </option>

            <option value="Unfurnished">
              Unfurnished
            </option>

          </select>



          <select
            value={ownership}
            onChange={(e)=>setOwnership(e.target.value)}
          >

            <option value="Freehold">
              Freehold
            </option>

            <option value="Leasehold">
              Leasehold
            </option>

            <option value="Co-operative Society">
              Co-operative Society
            </option>

            <option value="Power Of Attorney">
              Power Of Attorney
            </option>

          </select>



          <button
            className="predict-btn"
            onClick={predictPrice}
            disabled={loading}
          >

            {
              loading
              ? "⏳ Predicting..."
              : "🚀 Predict Price"
            }

          </button>


        </div>




        <div className="result-card">

          <h2>
            💰 Estimated House Price
          </h2>


          <div className="price">
            {price}
          </div>


          <p>
            Prediction generated using AI & Random Forest
          </p>


        </div>


      </div>

    </div>

  );

}


export default App;