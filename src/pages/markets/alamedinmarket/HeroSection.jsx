import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const HeroSection = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const textRef = useRef(null);
  const buttonsRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline();
    
    tl.from(sectionRef.current, {
      opacity: 0,
      duration: 1,
      ease: "power2.inOut"
    })
    .from(headingRef.current, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    })
    .from(textRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.7,
      ease: "power2.out"
    }, "-=0.3")
    .from(buttonsRef.current.children, {
      y: 40,
      opacity: 0,
      stagger: 0.15,
      duration: 0.6,
      ease: "back.out(1.2)"
    }, );
  }, []);


  return (
    <section id="hero" ref={sectionRef} className="bg-gradient-to-r from-blue-800 to-blue-900 text-white">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl">
          <h1 ref={headingRef} className="text-4xl md:text-5xl font-bold mb-6">Добро пожаловать на рынок Аламедин!</h1>
          <p ref={textRef} className="text-xl mb-8 opacity-90">
            Крупнейший вещевой рынок в Бишкеке с 30-летней историей. 
            Более 1000 магазинов в 70 торговых рядах. Огромный выбор товаров 
            для дома, семьи, автомобиля и бизнеса по оптовым и розничным ценам!
          </p>
          <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4">
            <button className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105">
              Найти магазин
            </button>
            <button className="bg-transparent border-2 border-white hover:bg-white/10 text-white font-bold py-3 px-8 rounded-full transition duration-300">
              Схема рынка
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;