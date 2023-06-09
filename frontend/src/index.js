import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { UserController } from './context/UserContext';
import { JobResultController } from './context/JobResultContext';
import { MapController } from './context/MapContext';
import { Wrapper } from "@googlemaps/react-wrapper";
import Map from './components/Map';
import LoadingPage from './pages/LoadingPage';
import ErrorPage from './pages/ErrorPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY;
const Status = {
  LOADING: 'LOADING',
  FAILURE: 'FAILURE',
  SUCCESS: 'SUCCESS',
}

const render = (status) => {
  // eslint-disable-next-line default-case
  switch (status) {
    case Status.LOADING:
      // return <Spinner />;
      return <LoadingPage />
    case Status.FAILURE:
      // return <ErrorComponent />;
      return <ErrorPage />
    case Status.SUCCESS:
      return <Map />;
  }
};
root.render(
  // <React.StrictMode>
    <UserController>
      <BrowserRouter>
        <Wrapper apiKey={GOOGLE_MAPS_API_KEY} render={render}>
          <MapController>
            <JobResultController>
              <App />
            </JobResultController>
          </MapController>
        </Wrapper>
      </BrowserRouter>
    </UserController>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
