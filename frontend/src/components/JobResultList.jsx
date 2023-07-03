import React, { useContext, useEffect, useState } from 'react'
import { renderToString } from 'react-dom/server';
import JobResultContext from '../context/JobResultContext'
import MapContext from '../context/MapContext';
import EmptyListPage from '../pages/EmptyListPage';
import LoadingPage from '../pages/LoadingPage';
import JobCard from './JobCard';
// import Marker from './Marker';
import MarkerCard from './MarkerCard';

function createMarker(job, map, bounds, infowindow) {
  const { latitude, longitude, id } = job;
  const markerPosition = { lat: latitude, lng: longitude };
  const marker = new window.google.maps.Marker({
    id: id,
    position: markerPosition,
    map: map,
  });
  window.google.maps.event.addListener(marker, "click", (e) => {
    infowindow.setContent(renderToString(<MarkerCard job={job} />));
    infowindow.setPosition(markerPosition);
    infowindow.open({
      anchor: marker,
      map,
    }, this);
  });
  const jobLatLng = new window.google.maps.LatLng(job.latitude, job.longitude);
  bounds.extend(jobLatLng);
  map.fitBounds(bounds);

  return ({
    marker: marker,
  })
}
function JobResultList({ jobMarkerList, setJobMarkerList }) {
  // const { jobResult, jobMarkerList, setJobMarkerList } = useContext(JobResultContext);
  const { jobResult } = useContext(JobResultContext);
  const { map, bounds, infowindow } = useContext(MapContext);
  // const [jobMarkerList, setJobMarkerList] = useState([]);
  const [emptyList, toggleEmptyList] = useState(true);

  // console.log(jobMarkerList);
  useEffect(() => {
    setJobMarkerList([]);
    jobResult.results.forEach((job) => {
      if (job.latitude !== undefined && map !== undefined && bounds !== undefined) {
        const { marker } = createMarker(job, map, bounds, infowindow);
        const tempJobMarker = {
          id: job.id,
          job: job,
          marker: marker,
        };
        setJobMarkerList(current => [...current, tempJobMarker]);
        toggleEmptyList(false);
      }
    })
  }, [jobResult, bounds, setJobMarkerList, map, infowindow]);

  if (emptyList) {
    return <EmptyListPage />
  }

  const jobResultList = jobMarkerList.map((jobMarker) => {
    const { job } = jobMarker;

    if (job.latitude === undefined) {
      console.log('job.latitude is undefined');
    }
    if (map === undefined) {
      console.log('map is undefined');
    }
    if (bounds === undefined) {
      console.log('bounds is undefined');
    }

    const currentJob = jobMarkerList.find(c => c.id === job.id);
    return (
      <li
        key={job.id}
        onClick={() => {
          if (currentJob !== undefined) {
            infowindow.setContent(renderToString(<MarkerCard job={job} />));
            infowindow.setPosition(currentJob.marker.position);
            infowindow.open({
              anchor: currentJob.marker,
              map,
            }, this);
          }
        }}
      >
        <JobCard job={job} />
      </li>
    )
  });

  return (
    <ul>{jobResultList}</ul>
  )
}

export default JobResultList
