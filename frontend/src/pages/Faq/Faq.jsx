import React, { useState } from 'react';
import './faq.css';
import Title from '../../components/Title/Title';

import Fotter from '../../components/Fotter/Fotter';

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "Jak zamówić choinkę?",
      answer: "Aby zamówić choinkę, należy dodać choinkę do koszyka, a następnie opłacić zamówienie lub zadzwonić pod numer +48 123 456 789. Każde zamówienie potwierdzamy telefonicznie."
    },
    {
      question: "Jakie są koszty dostawy?",
      answer: "Dostawa na terenie Warszawy kosztuje 50 zł, a poza miastem (do 20 km) – 60 zł."
    },
    {
      question: "Czy mogę wybrać termin dostawy?",
      answer: "Tak, podczas składania zamówienia możesz podać preferowany termin dostawy. Dostarczamy choinki w wybranych przez Ciebie przedziałach czasowych."
    },
    {
      question: "Czy wystawiacie faktury?",
      answer: "Tak, wystawiamy faktury. Możesz wybrać płatność gotówką przy odbiorze, PayU lub przelewem na podstawie faktury proforma."
    },
    {
      question: "Czy oferujecie usługi dodatkowe?",
      answer: "Tak, oferujemy obsadzenie choinki (40 zł) oraz utylizację (140 zł). Usługi można zaznaczyć w formularzu zamówienia."
    },
    {
      question: "Jakie rodzaje choinek oferujecie?",
      answer: "Oferujemy choinki najwyższej jakości, takie jak Jodła Kaukaska, Świerk Srebrny i Świerk Pospolity. Każda choinka jest starannie wyselekcjonowana."
    },
    {
      question: "Czy mogę zwrócić choinkę?",
      answer: "Zwroty są możliwe w ciągu 7 dni od dostawy, pod warunkiem że choinka jest w nienaruszonym stanie."
    },
    {
      question: "Czy dostarczacie choinki poza Warszawę?",
      answer: "Tak, dostarczamy choinki w promieniu do 20 km od Warszawy. Koszt dostawy poza miastem to 60 zł."
    },
    {
      question: "Czy mogę zamówić choinkę z dostawą w nocy?",
      answer: "Niestety, dostawy realizujemy tylko w godzinach 8:00-22:00."
    }
  ];

  return (
    <div className="faq">
      <div className="faqContainer">
        <div className="faqContainerTitle">
          <Title className="faqContainerTitleText" text={"Najczęściej zadawane pytania"} />
        </div>

        <div className="faqContainerList">
          {faqData.map((faq, index) => (
            <div key={index} className="faqContainerItem">
              <div
                className={`faqContainerItemQuestion ${activeIndex === index ? 'active' : ''}`}
                onClick={() => toggleAnswer(index)}
              >
                {faq.question}
                <span className="faqContainerItemIcon">{activeIndex === index ? '-' : '+'}</span>
              </div>
              {activeIndex === index && (
                <div className="faqContainerItemAnswer">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="faqContainerContact">
          <p className="faqContainerContactText">Masz więcej pytań? Skontaktuj się z nami! 🎄</p>
          <div className="faqContainerContactLinks">
            <a href="tel:+48123456789" className="faqContainerContactLink">
              <span className="faqContainerContactIcon">📞</span> +48 123 456 789
            </a>
            <a href="mailto:kontakt@choinek.pl" className="faqContainerContactLink">
              <span className="faqContainerContactIcon">✉️</span> kontakt@choinek.pl
            </a>
          </div>
        </div>
      </div>

      <Fotter />

    </div>
  );
};

export default Faq;