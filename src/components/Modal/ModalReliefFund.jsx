import React, { useState } from 'react';

function HelpRequestForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    needs: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestData = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      phone: formData.phone,
      email: formData.email,
      needs: formData.needs,
    };

    fetch('http://localhost:3004/assistance', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (response.ok) {
          console.log('Talep Başarıyla Gönderildi:', requestData);
          // Form gönderildikten sonra sayfayı kapat
          window.close();
        } else {
          console.error('Talep Gönderme Hatası:', response.status);
        }
      })
      .catch((error) => {
        console.error('HTTP İsteği Gönderilemedi:', error);
      });
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-4 col-md-4 col-sm-12">
          <h2>Yardım Formu</h2>
          <form onSubmit={handleSubmit} className="col-lg-12">
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">
                Ad:
              </label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">
                Soyad:
              </label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                Əlaqə Nömrəsi:
              </label>
              <input
                type="tel"
                className="form-control"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email:
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="needs" className="form-label">
                Nəyə ehtiyyacınız var?
              </label>
              <textarea
                className="form-control"
                id="needs"
                name="needs"
                value={formData.needs}
                onChange={handleInputChange}
                required
              />
            </div>

            <button to="/" type="submit" className="btn-30">
              Göndərin
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default HelpRequestForm;
