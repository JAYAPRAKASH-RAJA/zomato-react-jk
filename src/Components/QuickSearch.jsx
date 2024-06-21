import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/home.css';
import QuickSearchItem from '../Components/QuickSearchItem';
import lunchImg from '../Assets/foods.jpg';
import pizza from '../Assets/pizza.jpg';
import  car2 from '../Assets/car2.jpg';
import chicken from '../Assets/4.png';
import chicken1 from '../Assets/1.png';
import chicken2 from '../Assets/5.png';

const QuickSearch = ({ quicksearchData }) => {
  const navigate = useNavigate();

  if (!quicksearchData || !Array.isArray(quicksearchData)) {
    return null;
  }

  const handleFilterClick = () => {
    navigate('/filter');
  };

  const handleDetailsClick = () => {
    navigate('/details');
  };

  return (
    <div>
      <button className='button' onClick={handleFilterClick}>Filter</button>
      <button className='button' onClick={handleDetailsClick}>Details</button>
      <div className="bottomSection">
        <h1 className="heading">Quick Search</h1>
        <h3 className="subHeading">Discover restaurants by type of meal</h3>

        

        <div className="qs-box">
          <div className="qs-box-contents">
            <img src={lunchImg} className="qs-image" />
            <h4 className="qs-item-heading">"breakfast"</h4>
            <p className="qs-item-description">"start your day with exclusive breakfast options"</p>
          </div>
        </div>
        <div className="qs-box">
          <div className="qs-box-contents">
            <img src={pizza} className="qs-image" />
            <h4 className="qs-item-heading">"breakfast"</h4>
            <p className="qs-item-description">"start your day with exclusive breakfast options"</p>
          </div>
        </div>
        <div className="qs-box">
          <div className="qs-box-contents">
            <img src={car2} className="qs-image" />
            <h4 className="qs-item-heading">"breakfast"</h4>
            <p className="qs-item-description">"start your day with exclusive breakfast options"</p>
          </div>
        </div>
        <div className="qs-box">
          <div className="qs-box-contents">
            <img src={chicken} className="qs-image" />
            <h4 className="qs-item-heading">"breakfast"</h4>
            <p className="qs-item-description">"start your day with exclusive breakfast options"</p>
          </div>
        </div>
        <div className="qs-box">
          <div className="qs-box-contents">
            <img src={chicken1} className="qs-image" />
            <h4 className="qs-item-heading">"breakfast"</h4>
            <p className="qs-item-description">"start your day with exclusive breakfast options"</p>
          </div>
        </div>
        <div className="qs-box">
          <div className="qs-box-contents">
            <img src={chicken2} className="qs-image" />
            <h4 className="qs-item-heading">"breakfast"</h4>
            <p className="qs-item-description">"start your day with exclusive breakfast options"</p>
          </div>
        </div>
        {quicksearchData.map((item, i) => (
          <QuickSearchItem quicksearchitemData={item} key={i} />
        ))}
      </div>
    </div>
  );
};

export default QuickSearch;
