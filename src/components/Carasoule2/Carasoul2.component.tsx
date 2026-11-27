// src/Carousel.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MockData } from '../Cards/Cards.models';
import { EColor } from '../../styles/Colors/Colors';
import './Carasoul2.css'; // Adjusted path if necessary

interface CarouselProps {
  data: MockData;
  index: number;
  isDownload?: boolean;
}

function Carasoul2({ data, index, isDownload }: CarouselProps) {
  return (
    <div className="container-fluid">
      {index === 0 && !isDownload && (
        <div className="row">
          <div className="col-md-6" data-aos="zoom-in">
            <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
              <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                {/* Add more buttons for additional slides if needed */}
              </div>
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img src={data.image} className="d-block" style={{ borderRadius: '15px', width:"60%" }} alt="Carousel 1" />
                </div>
                {/* <div className="carousel-item">
                  <img src={shareCars} className="d-block w-100" style={{ borderRadius: '15px' }} alt="Carousel 2" />
                </div> */}
                {/* Add more carousel items for additional images */}
              </div>
              {/* <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button> */}
            </div>
          </div>
          <div className="col-md-5 d-flex align-items-center" data-aos="zoom-in">
            <div className="carousel-description p-4 border rounded" style={{ backgroundColor: "white", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
              <h3 style={{ color: '#000066' }}>{data.title}</h3>
              <p style={{ color: EColor.LIGHTGREEN }}>
                {data.content}
              </p>
            </div>
          </div>
        </div>
      )}

{index === 1 && !isDownload && (
        <div className="row" id="container2">
          <div className="col-md-5  align-items-center" data-aos="zoom-in">
            <div className="carousel-description p-4 border rounded" style={{ backgroundColor: "white", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
              <h3 style={{ color: '#000066' }}>{data.title}</h3>
              <p style={{ color: EColor.LIGHTGREEN }}>
                {data.content}
              </p>
            </div>
          </div>
          <div className="col-md-5" data-aos="zoom-in">
            <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
              <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                {/* Add more buttons for additional slides if needed */}
              </div>
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img src={data.image} className="d-block"style={{ borderRadius: '15px', width:"60%" }} alt="Carousel 1" />
                </div>
                {/* <div className="carousel-item">
                  <img src={shareCars} className="d-block w-100" style={{ borderRadius: '15px' }} alt="Carousel 2" />
                </div> */}
                {/* Add more carousel items for additional images */}
              </div>
              {/* <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button> */}
            </div>
          </div>
        </div>
      )}

      {/* Add more index conditions for additional sections */}

      {index === 2 && !isDownload && (
        <div className="row">
          <div className="col-md-5" data-aos="zoom-in">
            <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
              <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                {/* Add more buttons for additional slides if needed */}
              </div>
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img  src={data.image} className="d-block"style={{ borderRadius: '15px', width:"60%" }} alt="Carousel 1" />
                </div>
                {/* <div className="carousel-item">
                  <img src={shareCars} className="d-block w-100" style={{ borderRadius: '15px' }} alt="Carousel 2" />
                </div> */}
                {/* Add more carousel items for additional images */}
              </div>
              {/* <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button> */}
            </div>
          </div>
          <div className="col-md-5 d-flex align-items-center" data-aos="zoom-in">
            <div className="carousel-description p-4 border rounded" style={{ backgroundColor: "white", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
              <h3 style={{ color: '#000066' }}>{data.title}</h3>
              <p style={{ color: EColor.LIGHTGREEN }}>
                {data.content}
              </p>
            </div>
          </div>
        </div>
      )}
{index === 3 && !isDownload && (
        <div className="row" id="container4">
          <div className="col-md-5 d-flex align-items-center" data-aos="zoom-in">
            <div className="carousel-description p-4 border rounded" style={{ backgroundColor: "white", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
              <h3 style={{ color: '#000066' }}>{data.title}</h3>
              <p style={{ color: EColor.LIGHTGREEN }}>
                {data.content}
              </p>
            </div>
          </div>
          <div className="col-md-5" data-aos="zoom-in">
            <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
              <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                {/* Add more buttons for additional slides if needed */}
              </div>
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img  src={data.image} className="d-block"style={{ borderRadius: '15px', width:"60%" }}alt="Carousel 1" />
                </div>
                {/* <div className="carousel-item">
                  <img src={shareCars} className="d-block w-100" style={{ borderRadius: '15px' }} alt="Carousel 2" />
                </div> */}
                {/* Add more carousel items for additional images */}
              </div>
              {/* <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>  */}
            </div>
          </div>
        </div>
      )}
  

    </div>
  );
}

export default Carasoul2;





