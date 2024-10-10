import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";
import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);  
  const [timer, setTimer] = useState();
  
  const byDateDesc = data?.focus?.length
    ? data.focus.sort((evtA, evtB) =>
        new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
      )
    : [];
  
  const nextCard = () => {     
    setTimer(
      setTimeout(() => {
        setIndex((prevIndex) =>
          prevIndex < byDateDesc.length - 1 ? prevIndex + 1 : 0
        );
      }, 5000)
    );
  };
  
  useEffect(() => {
    if (timer) {
      clearTimeout(timer);
    }
    if (byDateDesc.length > 0){
      nextCard();
    }
    
  }, [index, byDateDesc]);

  
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div key={event.title}>
          <div
            className={`SlideCard SlideCard--${index === idx ? "display" : "hide"
              }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer" key={byDateDesc.length}
          >

            <div className="SlideCard__pagination">
              {byDateDesc.map((_, radioIdx) => (              
                <input                
                  key={`Pagination-${byDateDesc.length + radioIdx}`}
                  type="radio"
                  name="radio-button"
                  checked={index === radioIdx}
                  onChange={() => setIndex(radioIdx)}
                />
                
              ))
              }
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;
