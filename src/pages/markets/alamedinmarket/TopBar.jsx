import gsap from 'gsap';
import {useGSAP} from '@gsap/react';
import { FaPhone, FaMapMarkerAlt, FaClock, FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { useRef } from 'react';

const TopBar = () => {
  const topBarRef = useRef(null);

  useGSAP(() => {
    gsap.from(topBarRef.current, {
      y: -50,
      opacity:0,
      duration:0.3,
      ease:'power3.inOut',
      delay:0.3
    })
  },[])

  return (
    <div ref={topBarRef} className="bg-blue-800 text-white py-2">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-6 mb-2 md:mb-0">
          <div className="flex items-center">
            <FaPhone className="mr-2" />
            <span>+996 (312) 123-45-67</span>
          </div>
          <div className="flex items-center">
            <FaMapMarkerAlt className="mr-2" />
            <span>г. Бишкек, ул. Аламедин-1</span>
          </div>
          <div className="flex items-center">
            <FaClock className="mr-2" />
            <span>Ежедневно 8:00 - 20:00</span>
          </div>
        </div>
        <div className="flex space-x-4">
          <a href="#" className="hover:text-blue-300 transition"><FaFacebookF /></a>
          <a href="#" className="hover:text-blue-300 transition"><FaInstagram /></a>
          <a href="#" className="hover:text-blue-300 transition"><FaTwitter /></a>
          <a href="#" className="hover:text-blue-300 transition"><FaYoutube /></a>
        </div>
      </div>
    </div>
  );
};

export default TopBar;