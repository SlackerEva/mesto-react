import React from 'react';
import api from '../utils/Api';
import Card from './Card';

import jack from '../images/jack.jpg';
import edit from '../images/edit.svg';
import plus from '../images/plus.svg';

function Main(props) {

  const [userName, getUserName] = React.useState("Жак Ив Кусто");
  const [userDescription , getUserDescription] = React.useState("Искатель приключений");
  const [userAvatar, getUserAvatar] = React.useState(jack);

  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getProfile()    
      .then((values)=>{
        getUserName(values.name);
        getUserDescription(values.about);
        getUserAvatar(values.avatar);
      })
      .catch((err)=>{
        console.log(err);
      })
      
    api.getInitialCards()    
      .then((items)=>{
        setCards(items.map((item) => {
          return <Card card={item} key={item._id} onCardClick={props.onCardClick} onCardDeleteClick={props.onCardDeleteClick} />
        }))
      })
      .catch((err)=>{
        console.log(err);
        })  
  }, []);

  return (
    <main className="content">
      <section className="intro">
        <div className="intro__wrapper-avatar">
          <img className="intro__img" src={userAvatar} alt="Аватарка" />
          <button className="intro__button-edit-avatar" type="button" onClick={props.onEditAvatar}></button>
        </div>
        <h1 className="intro__title">{userName}</h1>
        <p className="intro__paragraph">{userDescription}</p>
        <button className="intro__button-edit" type="button" onClick={props.onEditProfile}>
          <img className="intro__img-edit" src={edit} alt="Редактировать" />
        </button>
        <button className="intro__button-add" type="button" onClick={props.onAddPlace}>
          <img className="intro__img-add" src={plus} alt="Добавить" />
        </button>
      </section>
      <section className="gallery">
        <ul className="cards">
          {cards}
        </ul>
      </section>
    </main>
  );
}

export default Main;
