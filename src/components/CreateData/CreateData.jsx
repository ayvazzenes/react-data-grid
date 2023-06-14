import React, { useState } from "react";
import "./CreateData.css";

const CreateData = ({ onSave }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (e, setInput) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (input1 === "" || input2 === "" || input3 === "") {
      setError("Lütfen tüm alanları doldurun.");
      return;
    }

    onSave({
      media_link: input1,
      media_name: input2,
      media_description: input3,
    });

    // Formu sıfırla
    setInput1("");
    setInput2("");
    setInput3("");
    // Hata mesajını sıfırla
    setError("");
    // Popup'ı kapat
    setShowPopup(false);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      <button className="btn-primary" onClick={() => setShowPopup(true)}>
        <span>+</span>
        <span>Yeni Hesap Ekle</span>
      </button>

      {showPopup && (
        <div className={`popup ${showPopup ? "" : "fadeOut"}`}>
          <div className="popup-header">
            <button className="close-button" onClick={closePopup}>
              X
            </button>
          </div>
          <form className="popup-content" onSubmit={handleSubmit}>
            <label>Sosyal Medya Linki:</label>
            <input
              type="text"
              value={input1}
              onChange={(e) => handleInputChange(e, setInput1)}
            />
            <label>Sosyal Medya Adı:</label>
            <input
              type="text"
              value={input2}
              onChange={(e) => handleInputChange(e, setInput2)}
            />
            <label>Açıklama:</label>
            <input
              type="text"
              value={input3}
              onChange={(e) => handleInputChange(e, setInput3)}
            />
            {error && <p className="error">{error}</p>}
            <div className="buttons">
              <button className="btn-secondary" onClick={closePopup}>
                Vazgeç
              </button>
              <button type="submit" className="btn-primary">
                Kaydet
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default CreateData;
