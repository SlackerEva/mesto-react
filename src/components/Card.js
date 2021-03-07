import React from 'react';

import trash from '../images/trash.svg';
import heart from '../images/heart.svg';

function Card(props) {

  function handleClick() {   
    props.onCardClick(props.card);
  }
  
  return (
    <li className="card" >
      <button className="card__button-trash" type="button" onClick={props.onCardDeleteClick}><img className="card__tresh" src={trash} alt="Удалить" /></button>
      <button className="card__button-show" type="button" onClick={handleClick}><img className="card__img" src={props.card.link} alt={props.card.name} /></button>
      <div className="card__panel">
        <h2 className="card__subtitle">{props.card.name}</h2>
        <button className="card__button" type="button"><img className="card__like" src={heart} alt="Лайк" /><p className="card__like-count">{props.card.likes.length}</p></button>
      </div>
    </li>
  );
}

export default Card;
