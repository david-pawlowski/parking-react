import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [spots, setSpots] = React.useState([]);
  return (
    <div className="App">
      <header className="App-header">
        <h1>Parking Lot</h1>
      </header>
      <main>
        <Parking spots={spots} />
        <AddParkingSpotForm spots={spots} onSetSpots={setSpots} />
      </main>
    </div>
  );
}

function AddParkingSpotForm({ spots, onSetSpots }) {
  const [spotName, setSpotName] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    if (spotName === "") return;

    onSetSpots((spots) => [...spots, spotName]);
    setSpotName("");
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Spot Number"
        value={spotName}
        onChange={(e) => setSpotName(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function Parking({ spots }) {
  return (
    <div className="parking">
      {spots.map((spot) => (
        <ParkingSpot key={spot} number={spot} />
      ))}
    </div>
  );
}

function ParkingSpot({ number }) {
  const [isSpotTaken, setIsSpotTaken] = useState(false);
  return (
    <button
      className={isSpotTaken ? "taken" : "square"}
      onClick={() => setIsSpotTaken(!isSpotTaken)}
    >
      {number}
    </button>
  );
}
