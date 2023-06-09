import { createContext, useRef, useState } from "react";

const MapContext = createContext();

export default MapContext

export function MapController({ children }) {
  const ref = useRef();
  const [map, setMap] = useState();
  const [bounds, setBounds] = useState(new window.google.maps.LatLngBounds());
  const infowindow = new window.google.maps.InfoWindow();

  return (
    <MapContext.Provider value={{ map, setMap, bounds, setBounds, infowindow }}>
    <div ref={ref} id="map" >
      {/* everything inside of this provider is a child of MapContext */}
      {children}
      </div>
    </MapContext.Provider>
  )
}
