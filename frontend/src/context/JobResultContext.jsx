import { createContext, useState } from "react";

const JobResultContext = createContext();

export default JobResultContext

export function JobResultController({ children }) {
  const [jobResult, setJobResult] = useState();
  // const [jobMarkerList, setJobMarkerList] = useState([]);
  return (
    // <JobResultContext.Provider value={{ jobResult, setJobResult, jobMarkerList, setJobMarkerList }}>
    <JobResultContext.Provider value={{ jobResult, setJobResult }}>
      {/* everything inside of this provider is a child of JobResultContext */}
      {children}
    </JobResultContext.Provider>
  )
}
