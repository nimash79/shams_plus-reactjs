import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { SliderTimer } from "../components/main/SliderTimer";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">
      <div className="banner">
        <Swiper
          modules={[Navigation, Pagination]}
          pagination={{ clickable: true }}
          navigation
          slidesPerView={1}
          loop
        >
          <SliderTimer />
          <SwiperSlide>
            <img src="/assets/images/poster1.png" alt="slogan1" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/assets/images/poster2.png" alt="slogan2" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/assets/images/poster3.png" alt="slogan3" />
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="introduction">
        <p>
          با سلام و خوش آمدگویی به شمس+، جایی که تجربهٔ بانکداری به یک سطح جدید
          ارتقا پیدا می‌کند.
          <br />
           ما به شما فرصت می‌دهیم تا در یک محیط پویا و
          نوآورانه با ابزارهایی پیشرفته، به اهداف مالی خود برسید. اینجا اعتماد،
          امنیت، و راحتی در هر گام از مسیر شما همراه شما هستند. 
          <br />
          از راهکارهای
          پیشرفته ما برای مدیریت مالی آسان و کارآمد بهره مند شوید. از اپلیکیشن
          موبایل تا سرویس‌های بانکی آنلاین، همه چیز در اختیار شماست.
          <br />
           ما افتخار
          داریم که به عنوان یک همراه مالی، با شما در هر لحظهٔ مهم زندگیتان حضور
          داشته باشیم. با تیم متخصص و دلسوز ما همیشه در کنار شما هستیم تا بهترین
          تجربه بانکداری را برای شما ایجاد کنیم.
          <br /> خوشحالی ما در تلاش برای فراهم
          کردن خدماتی است که نه تنها نیازهای مالی شما را برآورده می‌کنند بلکه
          تجربه بانکداری را به یک تجربهٔ لذت‌بخش تبدیل می‌کنند. بپیوندید به شمس+
          و ما را در سفر مالی شما همراهی کنید. اینجا جایی است که اهداف شما
          واقعیت می‌شوند.
        </p>
        <img src="/assets/images/shamsplus_bank.jpeg" />
      </div>
      <div className="bottom-slider">
        <Swiper
          modules={[Navigation, Pagination]}
          pagination={{ clickable: true }}
          navigation
          slidesPerView={3}
          loop
        >
          <SliderTimer />
          <SwiperSlide>
            <div className="bottom-slider-item">
              <Link to="/dashboard">پنل کاربری</Link>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="bottom-slider-item">
              <Link to="/transfer">انتقال وجه</Link>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="bottom-slider-item">
              <Link to="/open-account">افتتاح حساب</Link>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="bottom-slider-item">
              <Link to="/guide"> سوالات متداول</Link>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="bottom-slider-item">
              <Link to="/about-us">درباره ما</Link>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default Home;
