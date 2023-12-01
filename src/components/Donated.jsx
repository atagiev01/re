import React, { useState, useEffect } from 'react';

export default function Donated() {
  const [donatedData, setDonatedData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3004/donated')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setDonatedData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const columns = [
    'Say',
    'Ad',
    'Soyad',
    'İanə',
    'Əlaqə'
  ];

  return (
    <>
      {loading ? (
        <p>Yüklənir...</p>
      ) : (
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12">
              <div className="table-responsive">
                <table className="table table-bordered mb-0 my-5">
                  <thead>
                    <tr>
                      {columns.map((column, index) => (
                        <th key={index} scope="col">
                          {column}
                        </th>
                      ))}
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {donatedData.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.surname}</td>
                        <td>{item.donate}</td>
                        <td>{item.number}</td>
                        <td>{item.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
