import logo from "./logo.svg";
import "./App.css";
import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
mapboxgl.accessToken =
  "pk.eyJ1IjoiYnJhZWRhbmsxODEiLCJhIjoiY2w3Zm55bG54MGM5bTNvczU3cnc3aHZ3dCJ9.PTMOm8axq4w9m_GaYfMp7Q";

const data = [
  {
    "offense": "Robbery",
    "name": "NPCMark",
    coordinates: [175.2878457402682,-37.79309033810983]
  },
  {
    "offense": "test1",
    "name": "Hamilton",
    coordinates: [175.293156,-37.793451]
  }
]

export default function App() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(175.2878457402682);
  const [lat, setLat] = useState(-37.79309033810983);
  const [zoom, setZoom] = useState(16);
  const [sidePanel, setSidePanel] = useState(false)
  const [offense, setOffense] = useState('')
  const [name, setName] = useState('')

  

  function closeNav() {
    document.getElementById("mySidepanel").style.width = "0";
  }
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
    //Create default marker
    data.map((data) => {
      const marker = new mapboxgl.Marker().setLngLat(data.coordinates).addTo(map)
      marker.getElement().addEventListener('click', () => {
        setSidePanel(true) // show side panel
        setName(data.name)
        setOffense(data.offense)
        document.getElementById("mySidepanel").style.width = "400px";
      })
    });
  }, []);

  return (
    <div>
      <div ref={mapContainer} className="map-container"/>
      {
        sidePanel ? 
        <div id="mySidepanel" class="sidepanel">
          <a href="javascript:void(0)" class="closebtn" onClick={closeNav}>&times;</a>
          <a id="title" href="#">Persn On Bail</a>
          <a href="#">Name: {name}</a>
          <a href="#">Offense: {offense}</a>

        </div>
        :
        null
      }
    </div>
  );
}
