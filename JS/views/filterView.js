class FilterView {
  _parentEl = document.querySelector('.filter-container');
  _dietFormEl = document.querySelector('.diets');
  constructor() {
    document.querySelector('.nav__item').addEventListener('click', (e) => {
      document.body.classList.add('filer-opne');
    });
    document.querySelector('.overlay').addEventListener('click', () => {
      document.body.classList.toggle('filer-opne');
    });
    document.querySelector('.filter-close-btn').addEventListener('click', () => {
      document.body.classList.remove('filer-opne');
    });
  }
  renderFilterNumbers(numData) {
    const markup = `<p class="filter-num">${numData}</p>`;
    document.querySelector('.filer-box ').insertAdjacentHTML('afterbegin', markup);
  }
  removeFilterNumber() {
    const element = document.querySelector('.filter-num');
    if (!element) return;
    element.remove();
  }
  renderError(massage = 'enter a posative value') {
    const markup = `<p class="error-window">${massage}</p>`;
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }
  removeError() {
    const element = document.querySelector('.error-window');
    if (!element) return;
    element.remove();
  }
  hideForm() {
    document.body.classList.remove('filer-opne');
  }
  addHandler(handler) {
    this._parentEl.addEventListener('click', (e) => {
      const submitBtn = e.target.closest('.btn-apply');
      const clearAllBtn = e.target.closest('.btn-reset');
      if (!submitBtn && !clearAllBtn) return;
      if (submitBtn) {
        const dietData = [...new FormData(document.querySelector('.diets'))];
        const ingrientMasureData = [...new FormData(document.querySelector('.ing-form'))];
        const data = [...dietData, ...ingrientMasureData].filter((entry) => entry[1] !== '');
        handler(data);
      }
      if (clearAllBtn) {
        document.querySelector('.diets').reset();
        document.querySelector('.ing-form').reset();
        const element = document.querySelector('.filter-num');
        if (!element) return;
        element.remove();
      }
    });
  }
}

export default new FilterView();
