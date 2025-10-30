import React from 'react';
import TourCard from '../../Shared/TourCard';
import { Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import tours from '../../assets/data/tours';

const FeaturedToursList = () => {
  const featuredTours = tours.filter(tour => tour.featured);

  return (
    <>
      {featuredTours.map((tour) => (
        <Col lg="3" md="6" sm="6" className="mb-4" key={tour.id}>
          <TourCard tour={tour} />
        </Col>
      ))}
      <div className="viall__btn text-center mt-4">
        <Link to="/tours" className="btn primary__btn">
          View All Tours
        </Link>
      </div>
    </>
  );
};

export default FeaturedToursList;
