import React, { useState, useEffect, useCallback, useMemo } from 'react';
import './Cards.css';

const Cards = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const checkScreenSize = useCallback(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    let timeout;
    return () => {
      clearTimeout(timeout);
      timeout = setTimeout(handleResize, 100);
    };
  }, []);

  useEffect(() => {
    const resizeHandler = checkScreenSize();
    resizeHandler();
    window.addEventListener('resize', resizeHandler);
    return () => window.removeEventListener('resize', resizeHandler);
  }, [checkScreenSize]);

     const cardsData = useMemo(() => [
    {
      id: 1,
      title: "Рынок «Дордой»",
      link: "https://www.dordoi.net/",
      imageUrl: "/img/dordoimarketlogo.png",
      mobileImageUrl: "/img/dordoimarketlogo.png",
      description: "Крупнейший торговый рынок в Центральной Азии, предлагающий широкий ассортимент товаров оптом и в розницу.",
      color: "#03A9F4"
    },
    {
      id: 2,
      title: "Дордой Плаза",
      imageUrl: "https://static.tildacdn.one/tild6263-3832-4239-a137-323934346431/__.png",
      mobileImageUrl: "https://static.tildacdn.one/tild6263-3832-4239-a137-323934346431/__.png",
      link: "./plaza",
      description: "Магазины, рестораны, кафе и офисные помещения — важное место для шопинга и отдыха в городе.",
      color: "#009688"
    },
    {
      id: 3,
      title: "Университет",
      link: "./university",
      imageUrl: "https://i.ibb.co/zW1FcC6h/images-1-removebg-preview.png",
      mobileImageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSXfrFBx8usjrJX539FzYp-1H1lml9n6Og-Q&s",
      description: "Ведущий вуз с современными программами обучения, готовящий специалистов для различных отраслей.",
      color: "#FF3E7F"
    },
    {
      id: 4,
      title: "«Дордой Моторс» рынок",
      link: "https://www.dordoi.net/",
      imageUrl: "/img/motorsmarketlogo.png",
      mobileImageUrl: "/img/dordoimarketlogo.png",
      description: "Специализированный рынок автозапчастей и аксессуаров, предлагающий товары для всех типов автомобилей.",
      color: "#03A9F4"
    },
    {
      id: 5,
      title: "Футбольный клуб «Дордой»",
      link: "./football",
      imageUrl: "https://upload.wikimedia.org/wikipedia/ru/0/01/%D0%A4%D0%9A_%D0%94%D0%BE%D1%80%D0%B4%D0%BE%D0%B9.png",
      mobileImageUrl: "https://upload.wikimedia.org/wikipedia/ru/0/01/%D0%A4%D0%9A_%D0%94%D0%BE%D1%80%D0%B4%D0%BE%D0%B9.png",
      description: "Многократный чемпион и обладатель национального кубка, регулярно участвует в международных турнирах.",
      color: "#03A9F4"
    },
    {
      id: 6,
      title: "«Аламедин» рынок",
      link: "https://www.dordoi.net/",
      imageUrl: "/img/alamedinmarketlogo.png",
      mobileImageUrl: "/img/alamedinmarketlogo.png",
      description: "Популярный рынок с разнообразными товарами, включая одежду, продукты и бытовые изделия.",
      color: "#03A9F4"
    },
  ], []);

  const mobileCardsData = useMemo(() => {
    return [...cardsData, ...cardsData.map(card => ({...card, id: card.id + cardsData.length}))];
  }, [cardsData]);

  const Card = React.memo(({ card, isMobile }) => (
    <a
      href={card.link}
      className={`card ${isMobile ? 'mobile-card' : ''}`}
      style={{ textDecoration: 'none' }}
    >
      <div className="img-box">
        <img
          src={isMobile && card.mobileImageUrl ? card.mobileImageUrl : card.imageUrl}
          alt={card.title}
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="content">
        <h2>{card.title}</h2>
        <p>{card.description}</p>
        {!isMobile && <a href={card.link} className="content-link">Подробнее</a>}
      </div>
    </a>
  ));

    return (
      <div className={`card-container ${isMobile ? 'mobile' : 'desktop-marquee'}`}>
        {isMobile ? (
          /* Мобильная версия без изменений */
        ) : (
          <div className="desktop-marquee-inner">
            {/* Дублируем карточки для бесшовной анимации */}
            {[...cardsData, ...cardsData].map((card, index) => (
              <Card 
                key={`desktop-${card.id}-${index}`} 
                card={card} 
                isMobile={false} 
              />
            ))}
          </div>
        )}
      </div>
    );
};

export default Cards;