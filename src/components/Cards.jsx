import React, { useState, useEffect } from 'react';
import CardWithDate from './Card';
import ProductGallery from './SwiperPhoto';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

function Cards() {
  const [filteredCategory, setFilteredCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  useEffect(() => {
    try {
      fetch('http://localhost:3004/image-gallery')
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((fetchedData) => {
          console.log('Fetched data:', fetchedData);
          const dataWithId = fetchedData.map((item, index) => ({
            ...item,
            id: item.id,
          }));
          const sortedData = dataWithId.sort((a, b) => new Date(b.donationDate) - new Date(a.donationDate));
          setData(sortedData);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    } catch (error) {
      console.error('Error:', error);
    }
  }, []);

  const handleCardClick = (id) => {
    setSelectedId(id);
  };

  const filteredData = data.filter((item) => (
    ((!filteredCategory || item.category === filteredCategory) &&
      (!searchTerm || item.title.toLowerCase().includes(searchTerm.toLowerCase())))
  ));

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleCategoryChange = (category) => {
    setFilteredCategory(category);
    setCurrentPage(1);
  };

  return (
    <div className="container py-4">
   <div className="row justify-content-end">
       <div className="col-lg-3 col-md-12 pb-4">
        <input
          type="search"
          className="form-control"
          placeholder='Axtar'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="col-lg-3 col-md-12 pb-4">
        <select
          className="form-control text-capitalize" 
          value={filteredCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
        >
          <option value="">Bütün kateqoriya </option>
          {Array.from(new Set(data.map(item => item.category))).map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>
      </div>
   </div>
      {currentItems.length > 0 ? (
        <>
          <div className="row row-cols-1 row-cols-xs-2 row-cols-sm-2 row-cols-lg-3 g-3">
            {currentItems.map((item) => (
              <CardWithDate
                key={item.id}
                item={item}
                isSelected={item.id === selectedId}
                onClick={() => handleCardClick(item.id)}
                id={item.id}
              />
            ))}
          </div>
          <div className="d-flex justify-content-center mt-4">
            {Array.from({ length: Math.ceil(filteredData.length / itemsPerPage) }).map((_, index) => (
              <button
                key={index}
                className={`btn py-2 mx-1 ${currentPage === index + 1 ? 'btn-87 text-white m-0' : 'btn-light'}`}
                onClick={() => paginate(index + 1)}>
                {index + 1}
              </button>
            ))}
          </div>
        </>
      ) : (
        <div className='position-relative h-100vh'>
          <div className="position-absolute top-50 start-50 translate-middle">
            <div className="spinner-border" role="status"></div>
          </div>
        </div>
      )}
      {selectedId && <ProductGallery id={selectedId} />}
    </div>
  );
}

export default Cards;
