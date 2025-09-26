import React, { useEffect, useRef, useState } from "react";
import GetAllProducts from "../../contextApi/GetAllProducts";
import { Link } from "react-router-dom";

const Gallery = () => {
  const [products] = GetAllProducts();
  const trackRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(null); // store index instead of image

  // Duplicate array for seamless loop
  const duplicated = [...products, ...products];

  // Dynamically set animation speed & width
  useEffect(() => {
    if (trackRef.current && products.length > 0) {
      const trackWidth = trackRef.current.scrollWidth;
      const speed = trackWidth / 50; // bigger = slower
      trackRef.current.style.setProperty("--track-width", `${trackWidth}px`);
      trackRef.current.style.setProperty("--scroll-speed", `${speed}s`);
    }
  }, [products]);

  // Close popup on ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setCurrentIndex(null);
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  });

  // Navigation functions
  const goNext = () => {
    setCurrentIndex((prev) =>
      prev === duplicated.length - 1 ? 0 : prev + 1
    );
  };
  const goPrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? duplicated.length - 1 : prev - 1
    );
  };

  return (
    <section className="section__container bg-primary-light">
      <div className="flex justify-center items-center" data-aos='fade-left'>
        <h1 className="section__header border-b-2 border-gray-700 inline-block">
          Our Gallery
        </h1>
      </div>

      <div className="gallery-wrapper mt-5 w-full h-[400px]">
        <div
          className="gallery-track"
          ref={trackRef}
          onMouseEnter={() =>
            trackRef.current.style.setProperty("animation-play-state", "paused")
          }
          onMouseLeave={() =>
            trackRef.current.style.setProperty("animation-play-state", "running")
          }
        >
          {duplicated.map((product, index) => (
            <div key={index} className="gallery-item" data-aos='zoom-in-up'>
              <img
                src={product?.image}
                alt="gallery"
                className="bg-white"
                onClick={() => setCurrentIndex(index)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Full-screen popup */}
      {currentIndex !== null && (
        <div className="popup-overlay" onClick={() => setCurrentIndex(null)}>
          <button
            className="popup-close"
            onClick={() => setCurrentIndex(null)}
          >
            &times;
          </button>

          {/* Left arrow */}
          <button
            className="popup-arrow left"
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
          >
            {"<"}
          </button>

          {/* Image */}
          <div className="popup-image">
          <img
            src={duplicated[currentIndex]?.image}
            alt="full view"
            className="w-full h-full bg-white"
            onClick={(e) => e.stopPropagation()} // prevent close
          />
          </div>

          {/* Right arrow */}
          <button
            className="popup-arrow right"
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
          >
            {">"}
          </button>

          {/* View item button */}
          <Link
            to={`/shop/c/${duplicated[currentIndex]?._id}`}
            className="px-4 text-sm py-2 uppercase tracking-wider rounded-md bg-white text-gray-700 mt-2"
            onClick={(e) => e.stopPropagation()}
          >
            View Item
          </Link>
        </div>
      )}
    </section>
  );
};

export default Gallery;
