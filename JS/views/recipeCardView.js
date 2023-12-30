import { View } from './View.js';

class RecipeCardView extends View {
  _parentElement = document.querySelector('.result__cards-container');
  _searchForm = document.querySelector('.search__form');
  _searchField = document.querySelector('.searchField');
  _data = [];
  _errMsg = `<div class="error-massage">
  <svg xmlns="http://www.w3.org/2000/svg" class="error-icon" viewBox="0 0 256 256">
    <path
      d="M236.8,188.09,149.35,36.22h0a24.76,24.76,0,0,0-42.7,0L19.2,188.09a23.51,23.51,0,0,0,0,23.72A24.35,24.35,0,0,0,40.55,224h174.9a24.35,24.35,0,0,0,21.33-12.19A23.51,23.51,0,0,0,236.8,188.09ZM222.93,203.8a8.5,8.5,0,0,1-7.48,4.2H40.55a8.5,8.5,0,0,1-7.48-4.2,7.59,7.59,0,0,1,0-7.72L120.52,44.21a8.75,8.75,0,0,1,15,0l87.45,151.87A7.59,7.59,0,0,1,222.93,203.8ZM120,144V104a8,8,0,0,1,16,0v40a8,8,0,0,1-16,0Zm20,36a12,12,0,1,1-12-12A12,12,0,0,1,140,180Z"
    ></path>
  </svg>
  <p class="error-text">Can't get this recipe, please try another!</p>
</div>`;
  _massage = `SECCESS`;

  handelSearch(handler) {
    this._searchForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const query = document.querySelector('.searchField').value;
      handler(query.trim());
      document.querySelector('.searchField').value = '';
    });
  }
  _generateMarkup() {
    const id = +window.location.hash.slice(1);
    return this._data
      .map((result) => {
        return `
        <a href="#${result.id}" class="result__card result__card--${
          id === result.id ? 'active' : ''
        }">
            <img
              src="${result.image}"
              alt="imgae of a ${result.title}"
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
              ${result.title}
              </p>
            </div>
        </a>
    `;
      })
      .join('');
  }
}
export default new RecipeCardView();
