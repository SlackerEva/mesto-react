import React from 'react';

import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';

function App() {

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(false);
  const [card, setCard] = React.useState([]);
  
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
    <div className="page">
      <Header />
      <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} onCardDeleteClick={handleDeleteCardClick} />
      <Footer />
      <PopupWithForm isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} title={"Редактировать профиль"} name={"edit"} submit={"Сохранить"}>
        <label className="popup__field">
          <input id="username-input" className="popup__input" type="text" name="username" placeholder="Имя" minLength="2" maxLength="40" required />
          <span className="username-input-error"></span>
        </label>
        <label className="popup__field">
          <input id="userjob-input" className="popup__input" type="text" name="userjob" placeholder="О Себе" minLength="2" maxLength="200" required />
          <span className="userjob-input-error"></span>
        </label>
      </PopupWithForm>
      <PopupWithForm isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} title={"Новое место"} name={"add"} submit={"Сохранить"}>
        <label className="popup__field">
          <input id="placename-input" className="popup__input" type="text" name="placename" placeholder="Название" minLength="2" maxLength="30" required />
          <span className="placename-input-error"></span>
        </label>
        <label className="popup__field">
          <input id="placelink-input" className="popup__input" type="url" name="placelink" placeholder="Ссылка на картинку" required />
          <span className="placelink-input-error"></span>
        </label>
      </PopupWithForm>
      <PopupWithForm isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} title={"Обновить аватар"} name={"avatar"} submit={"Сохранить"}>
        <label className="popup__field">
          <input id="avatarlink-input" className="popup__input" type="url" name="avatarlink" placeholder="Ссылка на картинку" required />
          <span className="avatarlink-input-error"></span>
        </label>
      </PopupWithForm>
      <PopupWithForm isOpen={isDeleteCardPopupOpen} onClose={closeAllPopups} title={"Вы уверены?"} name={"delete"} submit={"Да"} />
      <ImagePopup selectedCard={selectedCard} onClose={closeAllPopups} card={card} />
    </div>
  );
}

export default App;