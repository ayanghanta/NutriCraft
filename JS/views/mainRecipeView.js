import { View } from './View.js';
class MainRecipeView extends View {
  _parentElement = document.querySelector('.recipe__details--section');
  _data = [];
  _errMsg = `<div class="error-massage">
  <svg xmlns="http://www.w3.org/2000/svg" class="error-icon" viewBox="0 0 256 256">
    <path
      d="M236.8,188.09,149.35,36.22h0a24.76,24.76,0,0,0-42.7,0L19.2,188.09a23.51,23.51,0,0,0,0,23.72A24.35,24.35,0,0,0,40.55,224h174.9a24.35,24.35,0,0,0,21.33-12.19A23.51,23.51,0,0,0,236.8,188.09ZM222.93,203.8a8.5,8.5,0,0,1-7.48,4.2H40.55a8.5,8.5,0,0,1-7.48-4.2,7.59,7.59,0,0,1,0-7.72L120.52,44.21a8.75,8.75,0,0,1,15,0l87.45,151.87A7.59,7.59,0,0,1,222.93,203.8ZM120,144V104a8,8,0,0,1,16,0v40a8,8,0,0,1-16,0Zm20,36a12,12,0,1,1-12-12A12,12,0,0,1,140,180Z"
    ></path>
  </svg>
  <p class="error-text">Oops! somethig went wrong, try another recipe:)</p>
</div>`;
  _massage = `SECCESS`;

  handelLoad(handler) {
    ['load', 'hashchange'].forEach((ev) => window.addEventListener(ev, handler));
    this._parentElement.addEventListener('click', this.handelClicks.bind(this));
  }
  handelClicks(e) {
    const nutriBtn = e.target.closest('.nutrients__conatiner--title');
    if (!nutriBtn) return;
    this._parentElement.classList.toggle('display__nutrients');
  }
  changeHoverText() {
    // console.log(document.querySelector('.hover-text'));
    document.querySelector('.hover-text-cal').textContent = `Marked !`;
    document.querySelector('.hover-text-cal').style.color = '#ba4a03';
  }
  _generateMarkup() {
    //display__nutrients
    const SVGd = this._data.markedRecipe
      ? `M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM169.66,133.66l-48,48a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L116,164.69l42.34-42.35a8,8,0,0,1,11.32,11.32ZM48,80V48H72v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80Z`
      : `M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32Zm0,48H48V48H72v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24Z`;
    return `
    <div class="mainRecipe-img-container">
    <img src="${this._data.imgUrl}"
            alt="image of ${this._data.recipeTitle}"
            class="mainRecipe-img" />
        </div>
        <div class="recipe__details--container">
          <div class="recipe-title">${this._data.recipeTitle}</div>
          <ul class="recipe__tags">
            <li class="recipe__tag">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-recipe__tag"
                viewBox="0 0 256 256"
              >
                <path
                  d="M128,40a96,96,0,1,0,96,96A96.11,96.11,0,0,0,128,40Zm0,176a80,80,0,1,1,80-80A80.09,80.09,0,0,1,128,216ZM173.66,90.34a8,8,0,0,1,0,11.32l-40,40a8,8,0,0,1-11.32-11.32l40-40A8,8,0,0,1,173.66,90.34ZM96,16a8,8,0,0,1,8-8h48a8,8,0,0,1,0,16H104A8,8,0,0,1,96,16Z"
                ></path>
                <span>${this._data.cookingtime} min</span>
              </svg>
            </li>
            <li class="recipe__tag">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-recipe__tag"
                viewBox="0 0 256 256"
              >
                <path
                  d="M88,48V16a8,8,0,0,1,16,0V48a8,8,0,0,1-16,0Zm40,8a8,8,0,0,0,8-8V16a8,8,0,0,0-16,0V48A8,8,0,0,0,128,56Zm32,0a8,8,0,0,0,8-8V16a8,8,0,0,0-16,0V48A8,8,0,0,0,160,56Zm92.8,46.4L224,124v60a32,32,0,0,1-32,32H64a32,32,0,0,1-32-32V124L3.2,102.4a8,8,0,0,1,9.6-12.8L32,104V88A16,16,0,0,1,48,72H208a16,16,0,0,1,16,16v16l19.2-14.4a8,8,0,0,1,9.6,12.8ZM208,88H48v96a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16Z"
                ></path>
              </svg>
              <span>${this._data.servings} servings</span>
            </li>
            <li class="recipe__tag addShoplit_btn">
            <p class="hover-text">Add for shop</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-recipe__tag"
                viewBox="0 0 256 256"
              >
                <path
                  d="M222.14,58.87A8,8,0,0,0,216,56H54.68L49.79,29.14A16,16,0,0,0,34.05,16H16a8,8,0,0,0,0,16h18L59.56,172.29a24,24,0,0,0,5.33,11.27,28,28,0,1,0,44.4,8.44h45.42A27.75,27.75,0,0,0,152,204a28,28,0,1,0,28-28H83.17a8,8,0,0,1-7.87-6.57L72.13,152h116a24,24,0,0,0,23.61-19.71l12.16-66.86A8,8,0,0,0,222.14,58.87ZM96,204a12,12,0,1,1-12-12A12,12,0,0,1,96,204Zm96,0a12,12,0,1,1-12-12A12,12,0,0,1,192,204Zm4-74.57A8,8,0,0,1,188.1,136H69.22L57.59,72H206.41Z"
                ></path>
              </svg>
              <span>Add for shop</span>
            </li>
            <li class="recipe__tag bookmark_btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-recipe__tag bookmark_tag--${this._data.isBookmarked ? 'fill' : ''}"
                viewBox="0 0 256 256"
              >
                <path
                  d="M184,32H72A16,16,0,0,0,56,48V224a8,8,0,0,0,12.24,6.78L128,193.43l59.77,37.35A8,8,0,0,0,200,224V48A16,16,0,0,0,184,32Z"
                ></path>
              </svg>
            </li>
            <li class="recipe__tag addEvent_btn">
            <p class="hover-text hover-text-cal">Mark in calender as today's recipe.</p>
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-recipe__tag" viewBox="0 0 256 256"><path d="${SVGd}"></path></svg>
            </li>
          </ul>
          <div class="nutrients__conatiner">
            <p class="nutrients__conatiner--title">See nutrients</p>
            <ul class="nutrients">
              <li class="nutri-title">Nutrients</li>
              <li class="nutri-title">Ammount</li>
              <li class="nutri-title">Daily need</li>
              ${this._data.recipeNutrients
                .map((nutri) => {
                  return `
                <li class="nutrient-name">${nutri.nutriName}</li>
                <li class="nutrient-value">${nutri.nutriAmount}${nutri.unit}</li>
                <li class="nutrient-need">${nutri.dailyNeed}</li>`;
                })
                .join('')}
            </ul>
          </div>
          <div class="recipe_ing--container">
            <p class="ing-title">RECIPE INGREDIENTS</p>
            <ul class="recipe__ings">
            ${this._data.ingredients
              .map((ing) => {
                return `
              <li class="recipe__ing">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon ing__icon"
                viewBox="0 0 256 256"
              >
                <path
                  d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"
                ></path>
              </svg>
              <div>
                <span class="ing_quatity">${ing.ingQuantity} ${ing.ingUnit}</span>
                <span class="ing_name">&mdash;${ing.ingName}</span>
              </div>
            </li>
              `;
              })
              .join('')}
             
            </ul>
          </div>

          <div class="recipe__details--container-footer">
            <p class="footer-text">
              Nutritional values are approximations. Consult a professional for accuracy.
            </p>
            <a class="coppyright-text" href="https://ayanwebdev.netlify.app/">&copy;Ayan Ghanta</a>
          </div>
        </div>
    `;
  }
}

export default new MainRecipeView();
