import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import axios from 'axios'
mapboxgl.accessToken = 'pk.eyJ1Ijoicmx0anFkbDExMzgiLCJhIjoiY2t6ZHVrOXFxMDZpODJ2cDJidHh2cmZ6aCJ9.N39L45pDFuKBS5OuX0GBXg';

import { io } from "socket.io-client";
const myRoute = []
let MyLocation = []

const st = new Date();
const strr = `${String(st.getHours()).padStart(2,"0")}:${String(st.getMinutes()).padStart(2,"0")}`

const socket = io('/',{query: `auth_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJpYXQiOjE2NTM4NDUwMzAsImV4cCI6MTY1MzkzMTQzMH0.3ca61UCmrQ5M0SSwca6GXCbbcLuFvf5dJKekcSTmUKk` });
function MapBoxContainer() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const marker = useRef(null);
  const [lng, setLng] = useState(126.8897066635111);
  const [lat, setLat] = useState(37.58177478814842);
  const [zoom, setZoom] = useState(15);
  const [list, setList] = useState([])
  const [isStart, setIsStart] = useState(false)
  useEffect(()=>{
    MyLocation = [lng,lat]
  },[lng, lat])
  
  useEffect(() => {
    if(map.current) return;
    else{
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style:'mapbox://styles/rltjqdl1138/cl25usjg3000g14npgelzphe2',
        doubleClickZoom: false,
        center:   [lng, lat],
        zoom:     zoom
      });
      map.current.on('load', ()=>{
        axios.get('/v1/route')
          .then( ({data}) => Object.keys(data).map( e => loadSource(String(e), data[e])));
        
        marker.current = new mapboxgl.Marker()
          .setLngLat([lng,lat])
          .addTo(map.current);
      });

      map.current.on('click', ({lngLat})=>{
        const {lng, lat} = lngLat
        setLng(lng);
        setLat(lat);
        marker.current.setLngLat(lngLat)
      });
      
      
      socket.on("connect",()=>{
        
        socket.on('move', ({lng, lat, id}) => {
          const last = myRoute[myRoute.length-1];
          if(!last || last[0] !== lng || last[1] !== lat ){
            myRoute.push([lng, lat]);
            setList(myRoute);

            let source = map.current.getSource(String(id))
            if(!source){
              loadSource(String(id), [[lng,lat]]);
            }else{
              source.setData({
                type: "FeatureCollection",
                features: [{
                  type: "Feature",
                  geometry: {type:'LineString', coordinates:[...myRoute]}
                }]
              });
            }
          }
        });
      })
    }
  })
  
  function loadSource(userId, data){
    if(data.features && TIMES[userId]){
      const coords = data.features[0].geometry.coordinates;
      const last = coords[coords.length-1];
      new mapboxgl.Popup({closeOnClick:false})
        .setLngLat(last)
        .setHTML(`<div>${userId}) ${TIMES[userId]}</div>`)
        .addTo(map.current)

    }
      
    map.current.addSource(userId, { type: 'geojson', data } )
    map.current.addLayer({
      id: `line_${userId}`,
      type: 'line',
      source: `${userId}`,
      layout: { 'line-join': 'round', 'line-cap': 'round' },
      paint: { 'line-color': COLORS[userId],'line-width': 8 }
    });
    
  }
  console.log(isStart)
    
  return (
    <div>
      <div style={{width:"100%", height: window.innerHeight-70}} ref={mapContainer} className="map-container" />
      <div style={{position:'fixed', bottom:10, right:10}}>
        <button className='btn btn-primary' onClick={()=>{
          
          if(!isStart) socket.emit("start")
          else socket.emit("end")
          const now = new Date();
          const str = `${String(now.getHours()).padStart(2,"0")}:${String(now.getMinutes()).padStart(2,"0")}`
          if(isStart){
            new mapboxgl.Popup({closeOnClick:false})
            .setLngLat(myRoute[myRoute.length-1])
            .setHTML(`<div>me)${strr} ~ ${str}</div>`)
            .addTo(map.current)
          }
          
          setInterval(()=>{
            const [lng, lat] = MyLocation;          
            map.current.setCenter([lng,lat])
            socket.emit("move", {lng, lat});
          },5000);

          setIsStart(!isStart)
          
        }}>{ isStart ? "종료하기":"시작하기"}</button>
      </div>
    </div>
  );
  
}
const TIMES = {
  '1':'06:19 ~ 06:25',
  '2':'22:30 ~ 23:02'
}
const COLORS = {
  '1':'#8f8',
  '2':'#88f',
  '3':'#88f'
}



export default MapBoxContainer;