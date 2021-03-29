import React from 'react';

import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import DeletePopup from './DeletePopup.js';
import ImagePopup from './ImagePopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import Card from './Card';
import api from '../utils/api';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

import jack from '../images/jack.jpg';

function App() {

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(false);
  const [card, setCard] = React.useState([]);
  
  const [currentUser, setCurrentUser] = React.useState({ name: "Жак Ив Кусто", about: "Искатель приключений", avatar: jack});

  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getInitialCards()    
      .then((items)=>{
        setCards(items.map((item) => {
          return <Card card={item} key={item._id} onCardClick={handleCardClick} 
          onCardLike={handleCardLike} onCardDelete={handleCardDelete} />
        }))
      })
      .catch((err)=>{
        console.log(err);
        })  
  });

  function handleCardDelete(card) {
    api.removeCard(card._id).then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
    });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      const newCards = cards.map((c) => c._id === card._id ? newCard : c);
      setCards(newCards);
    });
  } 

  React.useEffect(() => {
    api.getProfile()
      .then((values)=>{
        setCurrentUser(values);
      })
      .catch((err)=>{
        console.log(err);
      })
  }, []);

  function handleUpdateUser(data) {
    api.editProfile(data)
      .then((values)=>{
        setCurrentUser(values);
        closeAllPopups();
      })
      .catch((err)=>{
        console.log(err);
      })
  }

  function handleUpdateAvatar(data) {
    api.editAvatar(data)
      .then((values)=>{
        setCurrentUser(values);
        closeAllPopups();
      })
      .catch((err)=>{
        console.log(err);
      })
  }

  function handleAddCard(data) {
    api.addCard(data)
      .then((values)=>{
        setCards([<Card card={values} key={values._id} onCardClick={handleCardClick} onCardLike={handleCardLike} onCardDelete={handleCardDelete} />, ...cards]); 
        closeAllPopups();
      })
      .catch((err)=>{
        console.log(err);
      })
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleDeleteCardClick() {
    setIsDeleteCardPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(true);
    setCard(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setSelectedCard(false);
    setIsDeleteCardPopupOpen(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} cards={cards} />
        <Footer />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddCard={handleAddCard} />
        <DeletePopup isOpen={isDeleteCardPopupOpen} onClose={closeAllPopups} onDelete={handleCardDelete} />
        <ImagePopup selectedCard={selectedCard} onClose={closeAllPopups} card={card} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
