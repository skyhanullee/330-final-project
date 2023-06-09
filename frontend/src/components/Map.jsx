import { useRef, useEffect, useContext } from "react";
import JobResultContext from '../context/JobResultContext';
import MapContext from "../context/MapContext";

function Map() {
  const ref = useRef();
  const { jobResult } = useContext(JobResultContext);
  const { map, setMap, setBounds } = useContext(MapContext);

  // to set up map bounds when showing on screen
  let bounds = new window.google.maps.LatLngBounds();
  const zoom = 5;
  const center = {
    lat: jobResult.results[0]?.latitude || 37.0902, 
    lng: jobResult.results[0]?.longitude || -95.7129
  }

  useEffect(() => {
    setMap(new window.google.maps.Map(ref.current, {center, zoom}));
    jobResult.results.forEach((job)   => {
      if(job.latitude !== undefined && map !== undefined) {
        const jobLatLng = new window.google.maps.LatLng(job.latitude, job.longitude);
        bounds.extend(jobLatLng);
        map.fitBounds(bounds);
        setBounds(bounds);
      }
    });
  }, [jobResult]);

  return (
    <div ref={ref} id="map" />
  )
}
export default Map
