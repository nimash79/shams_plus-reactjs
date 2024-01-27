import { useState } from "react";

const Register4 = ({ model, setModel }) => {
  const [image1, setImage1] = useState();
  const [image2, setImage2] = useState();
  const changeBirthCertificate = (event) => {
    setImage1(URL.createObjectURL(event.target.files[0]));
    model.birthCertificate = event.target.files[0];
    setModel(model);
  };
  const changeIdCard = (event) => {
    setImage2(URL.createObjectURL(event.target.files[0]));
    model.idCard = event.target.files[0];
    setModel(model);
  };
  return (
    <div className="register-form-3">
      <div className="register-image-input">
        <div>
          <p>بارگذاری شناسنامه</p>
          <label for="birth-certificate">+ افزودن</label>
          <input
            type="file"
            id="birth-certificate"
            accept="image/png, image/jpeg, image/jpg"
            onChange={changeBirthCertificate}
          />
        </div>
        <div>
          <div className="image-container">
            <span>پیش نمایش</span>
            <img src={image1} />
          </div>
        </div>
      </div>
      <div className="register-image-input">
        <div>
          <p>بارگذاری کارت ملی</p>
          <label for="id-card">+ افزودن</label>
          <input
            type="file"
            id="id-card"
            accept="image/png, image/jpeg, image/jpg"
            onChange={changeIdCard}
          />
        </div>
        <div>
          <div className="image-container">
            <span>پیش نمایش</span>
            <img src={image2} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register4;
