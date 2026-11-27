// import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import ban from "../../assets/Images/For website 2_022224.jpg.jpeg";
// import { MockData } from "../Cards/Cards.models";
// import "./Carasoul.css";

// interface CarouselProps {
//   data: MockData;
//   index: number;
//   isDownload?: boolean;
// }

// function Carousel({ data, index, isDownload }: CarouselProps) {
//   return (
//     <div className="container-fluid">
//       {/* ✅ Only First Row (index === 0) */}
//       {index === 0 && !isDownload && (
//         <div className="row">
//           {/* ---- Left Side: Text ---- */}
//           <div className="col-md-6 d-flex align-items-center" data-aos="zoom-in">
//             {/* <div className="carousel-description p-4"> */}
//             <div className="carousel-description p-5 shadow-lg rounded-4 bg-white">
//               <h3 className="carsoulBoxHeading">{data.title}</h3>
//               <p className="carsoulBoxContent">{data.content}</p>
//               <a className="btn-custom-outline" href="/Services">
//                 Explore Services
//               </a>
//             </div>
//           </div>

//           {/* ---- Right Side: Image ---- */}
//           {/* <div className="col-md-6" data-aos="zoom-in">
//             <div
//               id="carouselExampleIndicators"
//               className="carousel slide"
//               data-bs-ride="carousel"
//             >
//               <div className="carousel-inner">
//                 <div className="carousel-item active">
//                   <div className="animated-image-container-fluid">
//                     <img src={} alt="Banner" className="animated-image" />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div> */}

//           {/* ---- Right Side: Image ---- */}
// <div className="col-md-6" data-aos="zoom-in">
//   <div
//     id="carouselExampleIndicators"
//     className="carousel slide"
//     data-bs-ride="carousel"
//   >
//     <div className="carousel-inner">
//       <div className="carousel-item active">
//         <div className="animated-image-container-fluid">
//           <img
//             src={require("../../assets/Images/For website 2_022224.jpg.jpeg")}
//             alt="Banner"
//             className="animated-image  img-fluid rounded-4 shadow-lg"
//           />
//         </div>
//       </div>
//     </div>
//   </div>
// </div>

//         </div>
//       )}

//       {/* ❌ Commented other rows */}
//       {/*
//       {index === 1 && !isDownload && ( ... )}
//       {index === 2 && !isDownload && ( ... )}
//       {isDownload && index === 0 && ( ... )}
//       */}
//     </div>
//   );
// }

// export default Carousel;





import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { MockData } from "../Cards/Cards.models";   // ← Added this import
import "./Carasoul.css";

interface CarouselProps {
  data: MockData;
  index: number;
  isDownload?: boolean;
}

function Carousel({ data, index, isDownload }: CarouselProps) {
  return (
    <div>
      {index === 0 && !isDownload && (
        <div className="row carousel-row">
          {/* ---- Left Side: Text ---- */}
          <div className="col-md-6 d-flex align-items-center" data-aos="zoom-in">
            <div className="carousel-description p-4 ">
              <h3 className="carsoulBoxHeading">{data.title}</h3>
              <p className="carsoulBoxContent">{data.content}</p>
              <a className="btn-custom-outline" href="/Services">
                Explore Services
              </a>
            </div>
          </div>

          {/* ---- Right Side: Image ---- */}
          <div className="col-md-6" data-aos="zoom-in">
            <div
              id="carouselExampleIndicators"
              className="carousel slide"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <div className="animated-image-container-fluid">
                    <img
                      src={require("../../assets/Images/For website 2_022224.jpg.jpeg")}
                      alt="Banner"
                      className="animated-image"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Carousel;