import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Styles/Wallpaper.css'

const Wallpaper = ({ locationsData }) => {
  const [locations, setLocations] = useState([]);
  const [inputText, setInputText] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const history = useNavigate(); 

  useEffect(() => {
    sessionStorage.clear();
  }, []);

  const optionChanged = (e) => {
    const locationValue = e.target.value;
    sessionStorage.setItem('location_id', locationValue);
    axios({
      method: 'GET',
      url: `http://localhost:3002/api/restaurant/getRestaurants/${locationValue}`,
      headers: { 'Content-Type': 'application/json' }
    })
      .then((response) => {
        setLocations(response.data.data);
        console.log(response.data.data);
      })
      .catch((err) => console.log(err));
  };

  const handleSearch = (eve) => {
    let inputText = eve.target.value;

    const filteredSuggestions = locations?.restaurants?.filter((item) =>
      item.name.toLowerCase().includes(inputText.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
    setInputText(inputText);
  };

  const showSuggestions = () => {
    if (!inputText || !suggestions || suggestions.length === 0) {
      return null;
    }
    return (
      <ul>
        {suggestions.map((item, index) => (
          <li
            key={index}
            onClick={() => selectingRestaurant(item)}
          >{`${item.name} - ${item.locality}, ${item.city}`}</li>
        ))}
      </ul>
    );
  };

  const selectingRestaurant = (resObj) => {
    history(`/details?restaurant=${resObj._id}`);
  };

  return (
    <div>
      <img  className="homeImage"
        src="https://b.zmtcdn.com/web_assets/81f3ff974d82520780078ba1cfbd453a1583259680.png"
        alt="Zomato Website"
       
      />
      <div className="topSection">
        <div className="logo">Zomato</div>
        <div className="headerText">Discover the best food & drinks in Salem</div>
        <div className="searchOptions">
          <span>
            <select className="locationBox" onChange={optionChanged}>
              <option>Select city</option>
              <option>Salem</option>
              <option>chennai</option>
              <option>coimbatore</option>
              <option>Erode</option>
              {locationsData.map((item, i) => (
                <option key={i} value={item.location_id}>{`${item.name}, ${item.city}`}</option>
              ))}
            </select>
          </span>
          <span className="searchBox">
            <i className="bi bi-search searchIcon"></i>
            <input
              type="text"
              className="searchInput"
              placeholder="Search for Restaurants"
              onChange={handleSearch}
              
            />
            {showSuggestions()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Wallpaper;
