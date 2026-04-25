import Hero from "../../../components/Hero/Hero";
import MenuSection from "../../../components/MenuSection/MenuSection";
import Footer from "../../../components/Footer/Footer";
import Testimonial from "../../../components/Testimonial/Testimonial";
import LunchMenuSection from "../../../components/LunchMenuSection/LunchMenuSection";
import DinnerMenuSection from "../../../components/DinnerMenuSection/DinnerMenuSection";
// import Contact from "../Contact/Contact";
import BookingModal from "../BookingModal/BookingModal";
import Culture from "../Culture/Culture";


const Home = () => {
  return (
    <>
      <section id="home">
        <Hero />
      </section>

      <section id="breakfast">
        <MenuSection />
      </section>

      <section id="lunch">
        <LunchMenuSection />
      </section>

      <section id="dinner">
        <DinnerMenuSection />
      </section>

      <section id="testimonial">
        <Testimonial />
      </section>

      <section id="culture">
       <Culture/>
      </section>

      {/* ✅ Booking Table SECTION */}
      <section id="bookingTbl">
        <BookingModal />
      </section>

      
    </>
  );
};

export default Home;