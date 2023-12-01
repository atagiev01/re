import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';

const ProductGallery = () => {

  
  const [images, setImages] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    
    fetch(`http://localhost:3004/image-gallery?id=${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        if (data && data.length > 0) {
          const selectedData = data[0];
          const imageArray = selectedData.images.map((image) => ({ image, active: false }));
          imageArray[0].active = true;
          setImages(imageArray);
        }
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [id]);

  const changeImage = (index) => {
    const newImages = [...images];
    newImages[activeIndex].active = false;
    newImages[index].active = true;
    setActiveIndex(index);
    setImages(newImages);
  };

  if (loading) {
    return <p>Yüklənir...</p>;
  }
  
  if (error) {
    return <p>Xəta: {error.message}</p>;
  }
  const prevImage = () => {
    const newIndex = activeIndex - 1 < 0 ? images.length - 1 : activeIndex - 1;
    changeImage(newIndex);
  };

  const nextImage = () => {
    const newIndex = activeIndex + 1 >= images.length ? 0 : activeIndex + 1;
    changeImage(newIndex);
  }

  const activeImage = images.find((image) => image.active);

  return (
    <div className="row shadow-5 more-image">
      <div className="col-2 scroll-overflow">
        <div className="row mx-0 gap-1">
          {images.map((image, index) => (
            <div
              className={`col-lg-12 p-0 rounded ${image.active ? 'active border border-dark overflow-hidden cursor-pointer' : ''}`}
              key={index}
            >
              <img
                src={image.image}
                alt={`Gallery ${index + 1}`}
                className="w-100"
                onClick={() => changeImage(index)}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="col-10 mb-1 p-0 position-relative">
        <div className="lightbox rounded">
          <img src={activeImage.image} alt="" className="active w-100" />
        </div>
        <div className="d-flex justify-content-between btn-flex px-2">
          <button className="btn bg-black text-white rounded-2" onClick={prevImage}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <button className="btn bg-black text-white rounded-2" onClick={nextImage}>
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductGallery;
