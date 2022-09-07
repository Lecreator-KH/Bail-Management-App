import logo from './logo.svg';
import './App.css';
import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
mapboxgl.accessToken = 'pk.eyJ1IjoiYnJhZWRhbmsxODEiLCJhIjoiY2w3Zm55bG54MGM5bTNvczU3cnc3aHZ3dCJ9.PTMOm8axq4w9m_GaYfMp7Q';

export default function App() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(175.2878457402682);
  const [lat, setLat] = useState(-37.79309033810983);
  const [zoom, setZoom] = useState(16);
   
  useEffect(() => {
  if (map.current) return; // initialize map only once
  map.current = new mapboxgl.Map({
  container: mapContainer.current,
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [lng, lat],
  zoom: zoom
  });
  });
   
  useEffect(() => {
  if (!map.current) return; // wait for map to initialize
  map.current.on('move', () => {
  setLng(map.current.getCenter().lng.toFixed(4));
  setLat(map.current.getCenter().lat.toFixed(4));
  setZoom(map.current.getZoom().toFixed(2));
  });
  });  
   
  return (
  <div>
  <div className="sidebar">
  Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
  </div>
  <div ref={mapContainer} className="map-container" />
  </div>
  );
  }