import { View } from './View.js';
class EventView extends View {
  _calenderBody = document.querySelector('.calender-body');
  _parentElement = document.querySelector('.calender-footer');
  _data = [];
  _errMsg = ``;
  _massage = `<div class="no-cook-msg">Zero dishes cooked. How about adding one now?
  <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-footer-smile" viewBox="0 0 256 256"><path d="M128,20a108,108,0,1,0,31.74,211.26,12,12,0,0,0,5-3l63.57-63.57a12.05,12.05,0,0,0,3-5A108.08,108.08,0,0,0,128,20Zm81.12,129.91-59.2,59.2a83.87,83.87,0,1,1,59.2-59.2ZM76,108a16,16,0,1,1,16,16A16,16,0,0,1,76,108Zm104,0a16,16,0,1,1-16-16A16,16,0,0,1,180,108Zm-1.61,50c-11,19.06-29.39,30-50.39,30s-39.36-10.93-50.39-30a12,12,0,0,1,20.78-12c3.89,6.73,12.91,18,29.61,18s25.72-11.28,29.61-18a12,12,0,1,1,20.78,12Z"></path></svg>
  </div>`;

  _generateMarkup() {
    const id = +window.location.hash.slice(1);
    // console.log(this._data);
    return this._data
      .map((result) => {
        return `
        <a href="#${result.id}" class="result__card result__card--${
          id === result.id ? 'active' : ''
        }">
            <img
              src="${result.imgUrl}"
              alt="imgae of a ${result.recipeTitle}"
              class="result__card--img"
            />
            <div class="result__card--title-container">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-crad-title icon-cooked-meal"
                viewBox="0 0 256 256"
              >
                <path
                  d="M88,48V16a8,8,0,0,1,16,0V48a8,8,0,0,1-16,0Zm40,8a8,8,0,0,0,8-8V16a8,8,0,0,0-16,0V48A8,8,0,0,0,128,56Zm32,0a8,8,0,0,0,8-8V16a8,8,0,0,0-16,0V48A8,8,0,0,0,160,56Zm92.8,46.4L224,124v60a32,32,0,0,1-32,32H64a32,32,0,0,1-32-32V124L3.2,102.4a8,8,0,0,1,9.6-12.8L32,104V88A16,16,0,0,1,48,72H208a16,16,0,0,1,16,16v16l19.2-14.4a8,8,0,0,1,9.6,12.8ZM208,88H48v96a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16Z"
                ></path>
              </svg>
              <p class="result__card--title">
              ${result.recipeTitle}
              </p>
            </div>
        </a>
    `;
      })
      .join('');
  }
  addHandlerShowEv(handler) {
    this._calenderBody.addEventListener('click', (e) => {
      const dateBox = e.target.closest('.month-day');
      if (!dateBox) return;
      //   console.log(dateBox.dataset.id);
      // clear orthers dates markes
      document.querySelectorAll('.month-day').forEach((day) => day.classList.remove('showed-day'));
      // mark the date in calender
      dateBox.classList.add('showed-day');
      const dateId = dateBox.dataset.id;
      handler(dateId);
    });
  }
  addHandlerSaveEvent(handler) {
    document.body.addEventListener('click', function (e) {
      if (!e.target.closest('.addEvent_btn')) return;
      handler();
    });
  }
}

export default new EventView();
