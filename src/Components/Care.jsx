import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import '../Styles/Carousel.css'
import { Carousel } from "react-responsive-carousel";

const Care = () => {
  return (
    <div>
      <Carousel showThumbs={false}>
        <div>
          <img className="image"
            src="https://thumbs.dreamstime.com/b/assorted-indian-recipes-food-various-spices-rice-wooden-table-92742528.jpg"
            alt="not Found" />
        </div>
        <div>
          <img className="image"
            src="https://thumbs.dreamstime.com/b/assorted-indian-recipes-food-various-spices-rice-wooden-table-92742528.jpg"
            alt="not Found" />
        </div>
        <div>
          <img className="image"
            src="https://thumbs.dreamstime.com/b/assorted-indian-recipes-food-various-spices-rice-wooden-table-92742528.jpg"
            alt="not Found" />
        </div>
       
      </Carousel>
    </div>
  );
}

export default Care;
