import React from 'react';
import { useNavigate } from 'react-router-dom';

const QuickSearchItem = ({ quicksearchitemData }) => {
  const history = useNavigate();

  const handleNavigate = (meal_type) => {
    const locationId = sessionStorage.getItem('location_id');
    if (locationId) {
      history.push(`/filter?mealtype=${meal_type}&location_id=${locationId}`);
    } else {
      history.push(`/filter?mealtype=${meal_type}`);
    }
  };

  const { name, content, meal_type } = quicksearchitemData;

  return (
    <div>
      <div className="boxContainer" onClick={() => handleNavigate(meal_type)}>
        <div className="boxes">
          <div className="boxContent">
            <img
              src="https://b.zmtcdn.com/data/dish_photos/2d6/e461836ea875040690229d755faa72d6.jpg?output-format=webp"
              alt="idly"
              className="qsImage"
            />
            <h4 className="itemHeading">{name}</h4>
            <p className="itemDescription">{content}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickSearchItem;
