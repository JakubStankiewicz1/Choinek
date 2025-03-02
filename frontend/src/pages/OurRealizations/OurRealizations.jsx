import React from 'react';
import './OurRealizations.css';
import Title from '../../components/Title/Title';
import Fotter from '../../components/Fotter/Fotter';

const OurRealizations = () => {

  const realizationsData = [
    {
      id: 1,
      image: "https://www.cottageonbunkerhill.com/wp-content/uploads/2021/12/2DB0FFB0-8D7D-4E7C-A689-B2ED7700F79E-e1639740757630.jpeg",
      title: "Choinka Jodła Kaukaska, Warszawa 2023",
      description: "Klasyczna jodła kaukaska, która stała się centralnym punktem świątecznego wystroju w eleganckim apartamencie w centrum Warszawy."
    },
    {
      id: 2,
      image: "https://thursd.com/storage/media/63003/Tallest-Christmas-Tree-in-the-world-in-Dortmund-Germany.jpg",
      title: "Choinka Świerk Srebrny, Kraków 2023",
      description: "Imponujący świerk srebrny, udekorowany złotymi bombkami i ciepłymi światełkami, rozświetlił krakowskie mieszkanie."
    },
    {
      id: 3,
      image: "https://hips.hearstapps.com/hmg-prod/images/blue-christmas-royalty-free-image-127577970-1542657638.jpg?crop=1xw:1xh;center,top&resize=980:*",
      title: "Choinka Jodła Kaukaska, Gdańsk 2023",
      description: "Nowoczesna jodła kaukaska, która idealnie wpasowała się w minimalistyczny wystrój gdańskiego loftu."
    },
    {
      id: 4,
      image: "https://metro.co.uk/wp-content/uploads/2022/11/SEI_134703872-1.jpg?quality=90&strip=all&zoom=1&resize=480%2C705",
      title: "Choinka Świerk Pospolity, Poznań 2023",
      description: "Tradycyjny świerk pospolity, udekorowany ręcznie robionymi ozdobami, wprowadził świąteczną atmosferę do poznańskiego domu."
    },
    {
      id: 5,
      image: "https://thursd.com/storage/media/79857/Galleria-Vittorio-Emanuele-Swarovski-tree.jpg",
      title: "Choinka Jodła Kaukaska, Warszawa 2023",
      description: "Luksusowa jodła kaukaska, ozdobiona kryształkami i srebrnymi łańcuchami, stała się ozdobą warszawskiej rezydencji."
    },
    {
      id: 6,
      image: "https://hips.hearstapps.com/hmg-prod/images/the-official-white-house-christmas-tree-a-fraser-fir-stands-news-photo-83900071-1543285574.jpg?crop=0.895xw:1.00xh;0.0903xw,0&resize=980:*",
      title: "Choinka Świerk Srebrny, Kraków 2023",
      description: "Elegancki świerk srebrny, który zachwycił gości podczas świątecznego przyjęcia w krakowskim domu."
    },
    {
      id: 7,
      image: "https://www.boredpanda.com/blog/wp-content/uploads/2024/12/Wroclaw-67695949646d3-jpeg__700.jpg",
      title: "Choinka Jodła Kaukaska, Gdańsk 2023",
      description: "Pachnąca jodła kaukaska, która wprowadziła świąteczny nastrój do przestronnego salonu w Gdańsku."
    },
    {
      id: 8,
      image: "https://media.nbcdfw.com/2019/09/AP_252750826130-13.jpg?quality=85&strip=all&fit=1200%2C1667",
      title: "Choinka Świerk Pospolity, Poznań 2023",
      description: "Przytulny świerk pospolity, udekorowany w stylu retro, stał się sercem rodzinnych świąt w Poznaniu."
    },
    {
      id: 9,
      image: "https://livingwiththewolf.co.uk/wp-content/uploads/2019/12/IMG_2497.jpg",
      title: "Choinka Jodła Kaukaska, Warszawa 2023",
      description: "Olśniewająca jodła kaukaska, która rozświetliła świąteczny wieczór w warszawskim domu."
    },
    {
      id: 10,
      image: "https://www.wroclawguide.com/wp-content/uploads/2024/11/IMG_1007-1-scaled.jpg",
      title: "Choinka Świerk Srebrny, Kraków 2023",
      description: "Majestatyczny świerk srebrny, który stał się główną atrakcją świątecznego spotkania w Krakowie."
    },
    {
      id: 11,
      image: "https://www.wroclawguide.com/wp-content/uploads/2024/11/IMG_0802-1-768x1024.jpg",
      title: "Choinka Jodła Kaukaska, Gdańsk 2023",
      description: "Klasyczna jodła kaukaska, która dodała uroku świątecznemu wystrojowi gdańskiego mieszkania."
    },
    {
      id: 12,
      image: "https://u.profitroom.com/2019-granohotels-pl/uploads/choinkagda2.jpg",
      title: "Choinka Świerk Pospolity, Poznań 2023",
      description: "Tradycyjny świerk pospolity, który wprowadził radosny nastrój do poznańskiego domu."
    }
  ];

  return (
    <div className="realizations">

      <div className="realizationsContainer">
      
        <Title text={"Nasze realizacje"} />

        <div className="realizationsGrid">

          {
            realizationsData.map((realization) => (
              <div key={realization.id} className="realizationGridItem">
                <img src={realization.image} alt={realization.title} className="realizationGridItemImage" />
                <div className="realizationGridItemInfo">
                  <h3>{realization.title}</h3>
                  <p>{realization.description}</p>
                </div>
              </div>
            ))
          }

        </div>

      </div>

      <Fotter />

    </div>
  );
};

export default OurRealizations;