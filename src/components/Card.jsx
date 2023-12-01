import React from 'react';
import { Link } from 'react-router-dom';

const CardWithDate = ({ item, isSelected, id }) => {

const formatDate = (date) => {
const dateObj = new Date(date);
const year = dateObj.getFullYear().toString().padStart(4, '0');
const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
const day = dateObj.getDate().toString().padStart(2, '0');
const formattedDate = `${day}/${month}/${year}`;
return formattedDate
};
return (
<>
  <div className="col-lg-3">
    <div className={`card shadow-lg ${isSelected ? 'selected' : '' }`}>
      <div className="image-card-container" style={{ pointerEvents: 'none' }}>
        <img src={item.images[0]} alt="..." loading="lazy" style={{ pointerEvents: 'none' }} />
      </div>
      <div className="card-body py-2 d-flex flex-column justify-content-between">
        <div className='py-2'>
          <span className="float-start text-capitalize">{item.category}</span>
          <span className="float-end">{formatDate(item.donationDate)}</span>
        </div>
        <h5 className="card-title py-1">{item.title}</h5>
        <div className="my-2 d-flex justify-content-between">
          <Link to={`/modal/${id}`} className="btn text-white btn-87 w-100">Ətraflı</Link>
        </div>
      </div>
    </div>
  </div>
</>
);
};

export default CardWithDate;


// import React from 'react';
// import { Link } from 'react-router-dom';

// const CardWithDate = ({ item, isSelected, id }) => {

// const formatDate = (date) => {
// const dateObj = new Date(date);
// const year = dateObj.getFullYear().toString().padStart(4, '0');
// const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
// const day = dateObj.getDate().toString().padStart(2, '0');
// const formattedDate = `${day}/${month}/${year}`;
// return formattedDate
// };
// return (
// <>
//   <div className="col-lg-3">
//     <div className={`card shadow-lg ${isSelected ? 'selected' : '' }`}>
//       <div className="image-card-container" style={{ pointerEvents: 'none' }}>
//         <img src={item.images[0]} alt="..." loading="lazy" style={{ pointerEvents: 'none' }} />
//       </div>
//       <div className="card-body py-2 d-flex flex-column justify-content-between">
//         <div className='py-2'>
//           <span className="float-start text-capitalize">{item.category}</span>sa
//           <span className="float-end">{formatDate(item.donationDate)}</span>
//         </div>
//         <h5 className="card-title py-1">{item.title}</h5>
//         <div className="my-2 d-flex justify-content-between">
//           <Link to={`/modal/${id}`} className="btn text-white btn-87 w-100">Ətraflı</Link>
//         </div>
//       </div>
//     </div>
//   </div>
// </>
// );
// };

// export default CardWithDate;