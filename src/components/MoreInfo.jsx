import React, { useState, useEffect } from 'react';
import SwiperPhoto from './SwiperPhoto';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReplyAll } from '@fortawesome/free-solid-svg-icons';


const MoreInfo = () => {
  const { id } = useParams();
  
  console.log('ID:', id);
  const [productInfo, setProductInfo] = useState({
    title: 'Başlıq yüklənir...',
    category: 'Kateqoriya yüklənir...',
    about: 'Haqqında yüklənir...',
    number: 'Nömrə yüklənir... ',
    mail: 'Mail yüklənir...',

  });

  useEffect(() => {
    fetch(`http://localhost:3004/image-gallery/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setProductInfo({
          title: data.title,
          about: data.about,
          category: data.category,
          number: data.number,
          mail: data.mail,
          name: data.name,

        });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [id]);

  return (
    <>
      <section>
        <div className="container p-5">
         <div className="pb-5">
         <Link to="/" className='w-fit'>
            <FontAwesomeIcon className="btn btn-87 text-white p-4 m-0" icon={faReplyAll} />
         </Link>
         </div>
          <div className="row no-wrap gap--4">
            <div className="product col-lg-6 col-md-12">
              <SwiperPhoto/>
            </div>
            <div className="product-information col-lg-6 col-md-12 ">
              <div className="d-flex gap-20 flex-column">
                <div className="product-information__head-info">
                  <h3>{productInfo.title}</h3>
                </div>
                <div className="w-fit bg-danger text-white p-2 rounded-3">
                  <span>{productInfo.category}</span>
                </div>
                <div className="text-justify py-5">
                  {productInfo.about}
                </div>
                <div className="lh-lg">
                  <div className='fs-5'><span className='fw-bold'>Elanın sahibi :</span><span>{productInfo.name}</span></div>
                </div>
                <div className="lh-lg">
                  <div className='fs-5 fw-bold'>Əlaqə üçün : <a href={`tel:${productInfo.number}`}>{productInfo.number}</a></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MoreInfo;
