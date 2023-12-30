import { View } from './View.js';

class BookmarkView extends View {
  _bookmarkBtn = document.querySelector('.bookmark_btn');
  _parentElement = document.querySelector('.bookmark__panal');

  _data = [];
  _errMsg = `⚠️ DATA  can't re reached`;
  _massage = `<p class="bookmark__text">Find a nice recipe to bookmark</p>`;
  _generateMarkup() {
    const id = +window.location.hash.slice(1);
    return this._data
      .map((res) => {
        return `
      <a href="#${res.id}" class="result__card result__card--${id === res.id ? 'active' : ''}">
    <img
      src="${res.imgUrl}"
      alt="imgae of ${res.recipeTitle}"
      class="result__card--img" 
    />
    <div class="result__card--title-container">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="icon icon-crad-title"
        viewBox="0 0 256 256"
      >
        <path
          d="M24,184H232a8,8,0,0,0,0-16h-8V152a96.12,96.12,0,0,0-88-95.66V40h16a8,8,0,0,0,0-16H104a8,8,0,0,0,0,16h16V56.34A96.12,96.12,0,0,0,32,152v16H24a8,8,0,0,0,0,16Zm24-32a80,80,0,0,1,160,0v16H48Zm192,56a8,8,0,0,1-8,8H24a8,8,0,0,1,0-16H232A8,8,0,0,1,240,208Z"
        ></path>
      </svg>
      <p class="result__card--title">
        ${res.recipeTitle}
      </p>
    </div>
  </a>
      `;
      })
      .join('');
  }

  addHandleClick(handler) {
    document.body.addEventListener('click', function (e) {
      if (!e.target.closest('.bookmark_btn')) return;
      handler();
    });
  }
}

export default new BookmarkView();
