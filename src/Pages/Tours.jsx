import React from "react";
import CommonSection from "../Shared/CommonSection";
import "../styles/Tour.css";
import TourCard from "./../Shared/TourCard";
import SearchBar from "../Shared/SearchBar";
import Newsletter from "../Shared/Newsletter";
import { Container, Row, Col } from "reactstrap";
import tours from '../assets/data/tours';

const Tours = () => {
  return (
    <div>
      <CommonSection title={"All Tours"} />
      <section>
        <Container>
          <Row>
            <SearchBar />
          </Row>
        </Container>
      </section>
      <section className="pt-0">
        <Container>
          <Row>
            {tours?.map((tour) => (
              <Col lg="3" md="6" sm="6" className="mb-4" key={tour.id}>
                <TourCard tour={tour} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>
      <Newsletter />
    </div>
  );
};

export default Tours;
