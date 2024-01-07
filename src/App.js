import React, { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  // const [spots, setSpots] = React.useState([]);
  return (
    <div className="App">
      <header className="App-header">
        <h1>Parking Lot</h1>
      </header>
      <main>
        <ParkingList />
        <ParkingSpotList />
        {/* <AddParkingSpotForm spots={spots} onSetSpots={setSpots} /> */}
      </main>
    </div>
  );
}

// function AddParkingSpotForm({ spots, onSetSpots }) {
//   const [spotName, setSpotName] = useState("");

//   function handleSubmit(event) {
//     event.preventDefault();
//     if (spotName === "") return;

//     onSetSpots((spots) => [...spots, spotName]);
//     setSpotName("");
//   }

//   return (
//     <form className="form" onSubmit={handleSubmit}>
//       <input
//         type="text"
//         placeholder="Spot Number"
//         value={spotName}
//         onChange={(e) => setSpotName(e.target.value)}
//       />
//       <button>Add</button>
//     </form>
//   );
// }
function ParkingList() {
  const [parkings, setParkings] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8000/parkings/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setParkings(data.results);
      });
  }, []);
  return (
    <div className="parking-list">
      {parkings.map((parking) => (
        <Parking key={parking.id} name={parking.name} />
      ))}
    </div>
  );
}

function Parking({ name }) {
  return (
    <div className="parking">
      <h3>{name}</h3>
    </div>
  );
}

function ParkingSpotList() {
  const [spots, setSpots] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8000/spots/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setSpots(data.results);
      });
  }, []);
  return (
    <div className="parking">
      {spots.map((spot) => (
        <ParkingSpot key={spot.number} number={spot.number} />
      ))}
    </div>
  );
}

function ParkingSpot({ number }) {
  const [isSpotTaken, setIsSpotTaken] = useState(false);
  return (
    <button
      className={`parking-spot ${isSpotTaken ? "taken" : "free"}`}
      onClick={() => setIsSpotTaken(!isSpotTaken)}
    >
      {number}
    </button>
  );
}
