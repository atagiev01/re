import Modal from "./Modal/ModalDonate";
import React, { useState , useEffect } from "react";


export const Info = () => {
    const [modalOpen, setModalOpen] = useState(false);
    
    
    const closeModalOnEsc = (event) => {
      if (event.key === "Escape") {
        setModalOpen(false);
      }
    };
    useEffect(() => {
      if (modalOpen) {
        window.addEventListener("keydown", closeModalOnEsc);
      } else {
        window.removeEventListener("keydown", closeModalOnEsc);
      }
      return () => {
        window.removeEventListener("keydown", closeModalOnEsc);
      };
    }, [modalOpen]);
    
  return (
    <>
      <section id="info" className="px-0 bg-container info">
        <div className="container py-4">
          <div className="row align-items-center pt-20">
            <div className="col-lg-9 col-md-12">
              <div className="row d-flex justify-center">
                <h1 className="header-title mb-6">Əşyalar</h1>
              </div>
              <div>
                <p>İanələr üçün bir tranzaksiya limiti ölkədaxili kart əməliyyatlarında məhdudiyyətsiz sayda olmaqla 10 000 AZN, xarici bank kartları ilə edilən əməliyyatlarda isə ayda 2 dəfə 1000 AZN təşkil edir.</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-12">
              <div className="row flex-md-row gap-3">
                <div className="col-12">
                    <button className="openModalBtn w-100 border-0 p-lg-4 br-25 btn-87"  onClick={() => {setModalOpen(true);}}>İanə et</button>
                    {modalOpen && <Modal setOpenModal={setModalOpen} />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


    </>
  );
};