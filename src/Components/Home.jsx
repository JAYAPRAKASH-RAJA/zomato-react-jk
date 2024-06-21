import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/home.css';
import Wallpaper from './Wallpaper';
import QuickSearch from './QuickSearch';

const Home = () => {
  const [events, setEvents] = useState([]);
  const [mealtypes, setMealtypes] = useState([]);

  useEffect(() => {
    sessionStorage.clear();

    axios({
      method: 'GET',
      url: 'http://localhost:3002/api/restaurent/getRestaurent',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => {
        setEvents(response.data.data.restaurent);
        console.log(response.data.data.restaurent);
      })
      .catch(err => console.log(err));

    axios({
      method: 'GET',
      url: 'http://localhost:3002/api/mealtype/getAllMealTypes',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => {
        setMealtypes(response.data.data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <Wallpaper locationsData={events} />
      <QuickSearch quicksearchData={mealtypes} />
    </div>
  );
};

export default Home;
