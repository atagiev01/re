import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Donate(props) {
  const { cards, onDelete } = props;
  const [selectedStatus, setSelectedStatus] = useState('Təsdiqləndi');
  const handleDelete = (id) => {
    onDelete(id);
  };

  const handleConfirm = (card) => {
    card.status = selectedStatus; 
    fetch('http://localhost:3004/donated', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(card),
    })
      .then((response) => {
        if (response.ok) {
          handleDelete(card.id);
        } else {
          console.error('Xəta baş verdi: ' + response.status);
        }
      })
      .catch((error) => {
        console.error('HTTP istəyi göndərilmədi: ' + error);
      });
  };

  return (
    <section>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12">
            <div className="table-responsive">
              <table className="table table-bordered mb-0 my-5">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Ad</th>
                    <th scope="col">Soyad</th>
                    <th scope="col">Mail</th>
                    <th scope="col">Əlaqə</th>
                    <th scope="col">Ianə</th>
                    <th scope="col">Status</th>
                    <th scope="col">Əməliyyatlar</th>
                    <th scope="col">Ətraflı</th>
                  </tr>
                </thead>
                <tbody>
                  {cards && cards.map((card) => (
                    <tr key={card.id}>
                      <td>{card.id}</td>
                      <td>{card.name}</td>
                      <td>{card.surname}</td>
                      <td>{card.mail}</td>
                      <td>{card.link}</td>
                      <td>{card.donate}</td>
                      <td>
                        <select
                          value={selectedStatus}
                          onChange={(e) => setSelectedStatus(e.target.value)}>
                          <option value="Təsdiqləndi">Təsdiq </option>
                          <option value="Ləğv edildi">Ləğv </option>
                        </select>
                      </td>
                      <td className='d-flex justify-content-between gap-3 '>
                        <button className="btn-30 btn-green-30" onClick={() => handleConfirm(card)}>Təsdiq Et</button>
                        <button className="btn-30 btn-red-30" onClick={() => handleDelete(card.id)}>Sil</button>
                      </td>
                      <td>
                        <Link to={`/modal/${card.id}`} className="btn-30 btn-outline-success w-100">Ətraflı</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
