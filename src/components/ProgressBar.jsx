import React, { useState } from 'react';

export default function StatusConfirmation() {
  const [selectedStatus, setSelectedStatus] = useState('');
  const [idStatusMap, setIdStatusMap] = useState({}); 
  const [selectedId, setSelectedId] = useState(''); 
  const [confirmedStatus, setConfirmedStatus] = useState('');

  const handleConfirm = () => {
    if (selectedId === '' || selectedStatus === '') {
      alert('Zəhmət olmasa ID və status seçin.');
      return;
    }
    const newStatusMap = { ...idStatusMap }; 
    newStatusMap[selectedId] = selectedStatus; 
    setIdStatusMap(newStatusMap); 
    setConfirmedStatus(selectedStatus);
  };

  return (
    <div>
      <div>
        <label>ID seçin: </label>
        <select value={selectedId} onChange={(e) => setSelectedId(e.target.value)}>
          <option value="">Seçin</option>
          <option value="1">ID 1</option>
          <option value="2">ID 2</option>
          <option value="3">ID 3</option>
        </select>
      </div>
      <div>
        <label>Status seçin: </label>
        <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
          <option value="">Seçin</option>
          <option value="Təsdiqləndi">Təsdiqləndi</option>
          <option value="Gözləyir">Gözləyir</option>
          <option value="Ləğv edildi">Ləğv edildi</option>
        </select>
      </div>
      <button onClick={handleConfirm}>Təsdiq Et</button>
      {confirmedStatus && (
        <p>Təsdiq edilmiş status: {confirmedStatus}</p>
      )}
      <div>
        <p>Statuslar:</p>
        {Object.keys(idStatusMap).map((id) => (
          <p key={id}>ID {id}: {idStatusMap[id]}</p>
        ))}
      </div>
    </div>
  );
}
