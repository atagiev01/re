import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCheck, faTrash } from '@fortawesome/free-solid-svg-icons';
function MultiStepFormWithProgress() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    category: '',
    title: '',
    donate: '',
    about: '',
    number: '',
  });
  const [images, setImages] = useState([]);
  const [currentImage, setCurrentImage] = useState('');
  const [isImageSelected, setIsImageSelected] = useState(false);
  const [modalOpen, setModalOpen] = useState(true);

  const totalSteps = 3;

  const handleNext = () => {
    if (step === 1 && (!formData.name || !formData.surname || !formData.number)) {
      alert('Xaiş olunur bütün xanaları doldurun.');
      return;
    }
    if (step === 2 && (!formData.category || !formData.title || !formData.donate || !formData.about)) {
      alert('Xaiş olunur bütün xanaları doldurun.');
      return;
    }
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      surname: '',
      category: '',
      title: '',
      donate: '',
      about: '',
      number: '',
    });
    setImages([]);
    setCurrentImage('');
    setIsImageSelected(false);
  };

  const handleFormSubmit = async () => {
    try {
      if (!formData.name || !formData.surname || !formData.category || !formData.title || !formData.donate || !formData.about || !formData.number || images.length === 0) {
        alert('Xaiş olunur bütün xanaları doldurun və ən azı bir şəkil olsun.');
        return;
      }

      const formattedDate = new Date().toLocaleDateString('az-AZ');

      const formDataToSend = {
        title: formData.title,
        about: formData.about,
        category: formData.category,
        number: formData.number,
        donate: formData.donate,
        images: images,
        name: formData.name,
        surname: formData.surname,
        donationDate: formattedDate,
      };

      const response = await fetch('http://localhost:3004/image-gallery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataToSend),
      });

      if (response.ok) {
        resetForm();
        setStep(1);
        setModalOpen(false);
        alert('Əməliyyat uğurla tamamlandı!');
      } else {
        console.error(response.status);
        alert('Bir xəta yarandı. Təkrar sınayın.');
      }
    } catch (error) {
      console.error(error);
      alert('Bir xəta yarandı. Təkrar sınayın.');
    }
  };

  const handleInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCurrentImage(event.target.result);
        setIsImageSelected(true);
  
        // Automatically add the image to the list
        setImages([...images, event.target.result]);
        setCurrentImage('');
        setIsImageSelected(false);
      };
      reader.readAsDataURL(file);
    }
  };
  

  const handleAddImage = () => {
    if (currentImage) {
      setImages([...images, currentImage]);
      setCurrentImage('');
      setIsImageSelected(false);
    }
  };

  const handleRemoveImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };


  const handleModalClose = () => {
    const cont = document.querySelector(".modalBackground");
      cont.remove();
      window.location.reload();
  };
  
  

  return (
    <div className="modalBackground"  >
      <div className="modalContainer">
          <button class="btn-close position-absolute top-0 end-0 m-4" onClick={handleModalClose}></button>
        <div className="progress-bar">
          
          Mərhələ {step} / {totalSteps}
          <div className="progress my-3" style={{ width: `${(step / totalSteps) * 100}%` }}></div>
          
        </div>

        <div className="form-container">
          {step === 1 && (
            <div className="step-container">
              <h2>Sizinlə əlaqə yaratmağımız üçün</h2>
              <input
                type="text"
                placeholder="Adınız"i
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <input
                type="text"
                placeholder="Soyadınız"
                required
                value={formData.surname}
                onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
              />
              <input
                type="text"
                placeholder="Sizinlə necə əlaqə quracağıq"
                required
                value={formData.number}
                onChange={(e) => setFormData({...formData, number: e.target.value })}/>
              <div className="d-flex gap-2">
                <button onClick={handleNext}>İrəli</button>
              </div>
            </div>
          )}

     

{step === 2 && (
  <div className="step-container">
    <h2>Əşya haqqında</h2>
    <select
    className='text-uppercase'
      value={formData.category}
      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
    >
      <option value="" disabled>Kateqoriya</option>
      <option value="paltar">Paltar</option>
      <option value="əşya">Əşya</option>
      <option value="texniki">Texniki</option>
    </select>
    <input
      type="text"
      placeholder="Başlıq"
      required
      value={formData.title}
      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
    />
    <input
      type="text"
      placeholder="İanə"
      required
      value={formData.donate}
      onChange={(e) => setFormData({ ...formData, donate: e.target.value })}
    />
    <textarea
      type="text"
      className='w-100 p-2'
      placeholder="Haqqında"
      rows={5}
      required
      value={formData.about}
      onChange={(e) => setFormData({ ...formData, about: e.target.value })}
    />
    <div>
      <p>{formData.donationDate}</p>
    </div>
    <div className="d-flex gap-2">
      <button onClick={handlePrev}>Əvvəl</button>
      <button onClick={handleNext}>İrəli</button>
    </div>
  </div>
)}



{step === 3 && (
            <div className="step-container">
              <h2>Əşyanın şəklini və ya şəkillərini əlavə edin !</h2>
              <div className={`image-upload-container ${images.length > 0 ? 'dashed-border' : ''}`}>
                {images.map((image, index) => (
                  <div key={index} className="image-preview">
                    <img src={image} alt={`Şəkil ${index + 1}`} />
                    <button className='mx-2' onClick={() => handleRemoveImage(index)}><FontAwesomeIcon icon={faTrash}/></button>
                  </div>
                ))}
              </div>
              <div className="image-upload">
                <div className="custom-file-input">
                  <input
                    type="file"
                    id="file"
                    className="input-file"
                    onChange={handleInputChange}
                    accept=".jpg, .jpeg, .png"
                  />
                  <label htmlFor="file">
                    <FontAwesomeIcon icon={faPlus} />
                  </label>
                </div>
              </div>
              <div className="d-flex gap-2">
                <button onClick={handlePrev}>Əvvəl</button>
                <button onClick={handleFormSubmit}>Təsdiq</button>
              </div>
            </div>
          )}
        </div>
        
      </div>

    </div>
  );
}

export default MultiStepFormWithProgress;
