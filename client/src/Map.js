import logo from "./logo.svg";
import "./App.css";
import React, { useRef, useEffect, useState } from "react";
import data1 from "./personsOnBail.json"
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
mapboxgl.accessToken =
  "pk.eyJ1IjoiYnJhZWRhbmsxODEiLCJhIjoiY2w3Zm55bG54MGM5bTNvczU3cnc3aHZ3dCJ9.PTMOm8axq4w9m_GaYfMp7Q";
const data = data1

export default function App() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(175.2878457402682);
  const [lat, setLat] = useState(-37.79309033810983);
  const [zoom, setZoom] = useState(16);
  const [sidePanel, setSidePanel] = useState(false)
  const [offense, setOffense] = useState('')
  const [name, setName] = useState('')
  const [mugshot, setMugshot] = useState('')
  

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
      console.log(data)

      const marker = new mapboxgl.Marker().setLngLat(data.coordinates).addTo(map)
      marker.getElement().addEventListener('click', () => {
        setSidePanel(true) // show side panel
        setName(data.name)
        setOffense(data.offense)
        setMugshot(data.photoLink)
        document.getElementById("mySidepanel").style.width = "400px";
      })
    });
  }, []);

  return (
    <div>
      <div ref={mapContainer} className="map-container"/>
      {
        sidePanel ? 
        <div id="mySidepanel" className="sidepanel">
          <a href="javascript:void(0)" className="closebtn" onClick={closeNav}>&times;</a>
          <a id="title" href="#">Persn On Bail</a>
          <a href="#">Name: {name}</a>
          <a href="#">Offense: {offense}</a>
          {/* <img src={require({mugshot})} alt="mugshot"/> */}
        </div>
        :
        null
      }
    </div>
  );
}
