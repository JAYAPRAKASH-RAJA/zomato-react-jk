import React, { useState, useEffect, useCallback } from "react";
import "../Styles/filter.css";
import queryString from 'query-string';
import axios from "axios";
import { useNavigate, useLocation  } from 'react-router-dom';
import  image1 from '../Assets/6.png'
// import image2 from '../Assets/2.png'

const Filter = () => {
  const [restaurents, setRestaurents] = useState([]);
  const [locations, setLocations] = useState([]);
  const [cuisine, setCuisine] = useState([]);
  const [totalPage, setTotalPage] = useState([]);
  const [page, setPage] = useState(0);

  const history =  useNavigate();
  const location = useLocation();

  const fetchRestaurants = useCallback((filterObj) => {
    axios({
      method: 'POST',
      url: 'http://localhost:3002/api/restaurent/filter',
      headers: { 'Content-Type': 'application/json' },
      data: filterObj
    }).then(response => {
      setRestaurents(response.data.data.restaurent);
      setTotalPage(new Array(response?.data?.data?.totalPage).fill("test"));
    }).catch(err => console.log(err));
  }, []);

  const fetchLocations = () => {
    axios({
      method: 'GET',
      url: 'http://localhost:3002/api/restaurent/getRestaurent/',
      headers: { 'Content-Type': 'application/json' }
    }).then(response => {
      setLocations(response.data.data.restaurent);
    }).catch(err => console.log(err));
  };

  useEffect(() => {
    const qs = queryString.parse(location.search);
    const { mealtype, location_id } = qs;

    const filterObj = {
      searchFilter: {
        mealtype_id: Number(mealtype),
        location_id: Number(location_id),
      }
    };

    fetchRestaurants(filterObj);
    fetchLocations();
  }, [location.search, fetchRestaurants]);

  const handleLocationChange = (event) => {
    const locationsData = event.target.value;
    const qs = queryString.parse(location.search);
    const { mealtype } = qs;
    history.push(`/filter?mealtype=${mealtype}&location_id=${locationsData}`);
    window.location.reload();
  };

  const handleCuisineChange = (cuisineId) => {
    const updatedCuisine = [...cuisine];
    const index = updatedCuisine.indexOf(cuisineId);
    if (index === -1) {
      updatedCuisine.push(cuisineId);
    } else {
      updatedCuisine.splice(index, 1);
    }
    setCuisine(updatedCuisine);

    const qs = queryString.parse(location.search);
    const { mealtype } = qs;

    const filterObj = {
      searchFilter: {
        mealtype_id: Number(mealtype),
        cuisine: updatedCuisine.length === 0 ? undefined : updatedCuisine
      }
    };
    fetchRestaurants(filterObj);
  };

  const handleCostChange = (lcost, hcost) => {
    const qs = queryString.parse(location.search);
    const { mealtype } = qs;

    const filterObj = {
      searchFilter: {
        mealtype_id: Number(mealtype),
        min_price: { $gt: lcost, $lt: hcost }
      }
    };

    fetchRestaurants(filterObj);
  };

  const pageNavigation = (data) => {
    history.push(`/details?restaurent=${data._id}`);
  };

  const handleSortChange = (sort) => {
    const qs = queryString.parse(location.search);
    const { mealtype } = qs;
    const sortCondition = sort === "priceLow" ? { "min_price": 1 } : { "min_price": -1 };
    const filterObj = {
      searchFilter: {
        mealtype_id: Number(mealtype)
      },
      sort: sortCondition
    };

    fetchRestaurants(filterObj);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    const qs = queryString.parse(location.search);
    const { mealtype } = qs;
    const filterObj = {
      searchFilter: {
        mealtype_id: Number(mealtype)
      },
      page: newPage
    };

    fetchRestaurants(filterObj);
  };

  return (
    <div className="head">
    <div className="top">
        
    </div>
    <div className="bdy">
        <div className="heaing">
            <h1>Breakfast place in Mumbai</h1>
        </div>
        <div className="flexe">
            <div className="mfilter">
                <div className="filter">
                    <h2>Filters</h2>
                    <h3>Select Location</h3>
                    <input
                        type="text"
                        list="location"
                        className="data"
                        placeholder="Select location"
                        // value={location}
                        // onChange={handleLocationChange}
                    />
                    <datalist id="location">
                        <option value="Salem" />
                        <option value="Chennai" />
                        <option value="Ooty" />
                        <option value="Eroad" />
                        <option value="Theni" />
                    </datalist>
                    <div className="type">
                        <h3 className="cuisine">Cuisine</h3>
                        {['North Indian', 'South Indian', 'Chinese', 'Fast Food', 'Street Food'].map(cuisine => (
                            <div key={cuisine}>
                                <input
                                    type="checkbox"
                                    value={cuisine}
                                    // onChange={handleCuisineChange}
                                /> {cuisine}
                            </div>
                        ))}
                        <div className="container">
                            <h3 className="rate">Cost for two</h3>
                            {['less than ₹500', '₹500 to ₹1000', '₹1000 to ₹1500', '₹1500 to ₹2000', '₹2000+'].map(cost => (
                                <div key={cost}>
                                    <input
                                        type="radio"
                                        name="cost"
                                        value={cost}
                                        // onChange={handleCostChange}
                                    /> {cost}
                                </div>
                            ))}
                        </div>
                        <div>
                            <h3 className="sort">Sort</h3>
                            <div className="container2">
                                <input
                                    type="radio"
                                    name="sort"
                                    value="price low to high"
                                    // onChange={handleSortChange}
                                /> Price low to high
                            </div>
                            <div>
                                <input
                                    type="radio"
                                    name="sort"
                                    value="price high to low"
                                    // onChange={handleSortChange}
                                /> Price high to low
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container3">
                {['The Big Chill Cakey', 'The Big Chill Cakey'].map((place, index) => (
                    <div className={`love${index + 1}`} key={index}>
                        <div className="item">
                            <img src={image1} alt="" height="100px" width="100px" />
                        </div>
                        <span className="hed">
                            <h2 className="had">{place}</h2>
                            <h4>FORT</h4>
                            <p className="para">Shop 1, Plot D, Vignesh Complex, Salem</p>
                        </span>
                        <div className="cost">
                            <p className="rubes">
                                CUISINES: Bakery <br />
                                COST FOR TWO: ₹700
                            </p>
                            
                        </div>
                    </div>
                ))}
            </div>
        </div>
        <div className="no">
            <div className="pg">
                <div className="num">{'<'}</div>
                <div className="num">1</div>
                <div className="num">2</div>
                <div className="num">3</div>
                <div className="num">4</div>
                <div className="num">5</div>
                <div className="num">{'>'}</div>
            </div>
        </div>
    </div>
</div>
  );
};

export default Filter;
