import { View } from './View.js';

class ShoplistView extends View {
  _addtoShoplistBtn = document.querySelector('.addShoplit_btn');
  _parentElement = document.querySelector('.shoplist_panal');

  _data = [];
  _errMsg = `⚠️ DATA  can't re reached`;
  _massage = `Add items that you have to buy.😋`;
  _generateMarkup() {
    // console.log(this._data)
    return this._data
      .map((resipe) => {
        // console.log(resipe);
        return resipe.ingredients
          .map(
            (ing) => `
        <li class="shop_item">${ing.ingName}</li>
        `
          )
          .join('');
      })
      .join('');
  }
  adhandelClick(handler) {
    document.body.addEventListener('click', function (e) {
      if (!e.target.closest('.addShoplit_btn')) return;
      handler();
    });
  }
}
export default new ShoplistView();
