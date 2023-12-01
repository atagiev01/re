import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Donate from './Donate';
import Donated from './Donated';
export default function Admin() {
  const [data, setData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3004/image-gallery${id ? `/${id}` : ''}`);
        if (response.ok) {
          const jsonData = await response.json();
          setData(jsonData);
        } else {
          console.error('Veri çekme hatası');
        }
      } catch (error) {
        console.error('Veri çekme hatası:', error);
      }
    };
  
    fetchData();

  }, [id]);
  
const handleDelete = async (idToDelete) => {
  try {
    const response = await fetch(`http://localhost:3004/image-gallery/${idToDelete}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: idToDelete }),
    });

    if (response.status === 204) {
      const updatedData = data.filter((item) => item.id !== idToDelete);
      setData(updatedData);
    } 
    window.location.reload();
  } catch (error) {
    console.error('Silme isteği hatası:', error);
  }
};
  return (
    <>
      <Donate
        cards={data.map((item) => ({ ...item, id: item.id }))}
        tableClassName="custom-table"
        columnNames={['id', 'Ad', 'Soyad', 'Mail', 'Nömrə', 'İanə']}
        onDelete={handleDelete}/>
      <Donated/>
    </>
  );
}
