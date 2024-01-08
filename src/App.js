import React, { useEffect, useState } from "react";
import "./App.css";
import Modal from "./Modal";

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Parking Reservation App</h1>
      </header>
      <main>
        <ParkingList />
      </main>
    </div>
  );
}

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
        <Parking key={parking.name} parking={parking} />
      ))}
    </div>
  );
}

function Parking({ parking }) {
  return (
    <div className="parking">
      <h3 className="parking-name">{parking.name}</h3>
      <ParkingSpotList parking={parking} />
    </div>
  );
}

function ParkingSpotList({ parking }) {
  const [spots, setSpots] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:8000/parkings/${parking.id}/spots/`, {
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
    <div className="parking-spot-list" style={{ display: "flex" }}>
      {spots.map((spot) => (
        <ParkingSpot key={spot.id} spot={spot} />
      ))}
    </div>
  );
}

function ParkingSpot({ spot }) {
  const [isSpotTaken, setIsSpotTaken] = useState(spot.occupied);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleSpotReservation() {
    setIsSpotTaken(!isSpotTaken);
    console.log(spot);
    // fetch("http://localhost:8000/spots/", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ number: number, isTaken: true }),
    // });
  }

  return (
    <div>
      <button
        className={`parking-spot ${isSpotTaken ? "taken" : "free"}`}
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        {spot.number}
      </button>
      {isModalOpen && (
        <Modal
          setIsOpen={setIsModalOpen}
          onSpotReservation={handleSpotReservation}
        />
      )}
    </div>
  );
}
