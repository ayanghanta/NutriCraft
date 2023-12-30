class CalenderView {
  _parentElement = document.querySelector('.cal-days');
  _calenderEl = document.querySelector('.calender-container');
  _calIcon = document.querySelector('.calender-item');
  _calCloseBtn = document.querySelector('.cal-close-btn');
  _calTitle = document.querySelector('.cal-title');
  _calFooter = document.querySelector('.calender-footer');
  _data = [];
  // prettier-ignore
  _monthsName = ['January','February','March','April','May','June','July','August','September','October','November','December',];
  constructor() {
    this._calIcon.addEventListener('click', () => {
      document.body.classList.toggle('calender-open');
      this._calFooter.innerHTML = '';
    });
    this._calCloseBtn.addEventListener('click', () => {
      document.body.classList.remove('calender-open');
      this._calFooter.innerHTML = '';
    });
  }

  _getSkipDays = function (dateStr) {
    const date = new Date(dateStr);
    return date.getDay();
  };

  _clearCalender = function () {
    this._parentElement.innerHTML = '';
  };
  //   resetCalender(){}
  rendercalender(data) {
    this._data = data;
    const month = this._data.currentMonth;
    const year = this._data.currentYear;
    const skipMarkUp = '<div></div>';
    let markup = '';
    const skipStr = `${this._monthsName[month - 1]} 1 ${year}`;
    markup = skipMarkUp.repeat(this._getSkipDays(skipStr));

    for (let i = 0; i < this._data.daysInMonth; i++) {
      const dateId = `${(i + 1 + '').padStart(2, '0')}${(month + '').padStart(2, '0')}${year}`;
      const isToday =
        month === this._data.activeMonth &&
        i + 1 === this._data.activeDate &&
        year === this._data.activeYear;

      const isMarked = this._data.markdates.some(
        (item) => item.day === i + 1 && item.month === month && item.year === year
      );
      markup += `<div class="marked-${isMarked ? 'day' : ''} month-day active-${
        isToday ? 'day' : ''
      }" data-id=${dateId}>${i + 1}</div>`;
    }
    this._clearCalender();
    this._parentElement.insertAdjacentHTML('beforeend', markup);
    this._calTitle.textContent = `${this._monthsName[month - 1]} ${year}`;
  }
  _generateMarkup() {}
  adHandelclicksNavigate(handler) {
    this._calenderEl.addEventListener('click', (e) => {
      const leftBtn = e.target.closest('.icon-cal-left');
      const rightBtn = e.target.closest('.icon-cal-right');
      if (!leftBtn && !rightBtn) return;
      //clear calneder footer
      document.querySelector('.calender-footer').innerHTML = '';

      if (leftBtn) handler('prev');
      if (rightBtn) handler('next');
    });
  }
}

export default new CalenderView();
