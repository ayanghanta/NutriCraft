export class View {
  _parentElement = '';
  _data = [];
  _errMsg = ``;
  _massage = ``;
  clearParentElement() {
    this._parentElement.innerHTML = '';
  }
  renderLoader() {
    this.clearParentElement();
    const markup = `<span class="loader"></span>`;
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  renderError(massage = this._errMsg) {
    this.clearParentElement();
    const markup = massage;
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  renderMassage(massage = this._massage) {
    this.clearParentElement();
    const markup = massage;
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  render(data) {
    if (data.length === 0) return;
    this._data = data;
    this.clearParentElement();
    const markup = this._generateMarkup();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  update(data) {
    if (data.length === 0) return;
    this._data = data;
    const newMarkup = this._generateMarkup();
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newDomElements = newDOM.querySelectorAll('*');
    const curDomElemnets = this._parentElement.querySelectorAll('*');

    newDomElements.forEach((newDomEl, i) => {
      const curDomEl = curDomElemnets[i];
      if (!newDomEl.isEqualNode(curDomEl))
        Array.from(newDomEl.attributes).forEach((attrib) => {
          curDomEl.setAttribute(attrib.name, attrib.value);
        });
    });
  }
  _generateMarkup() {
    return '';
  }
}
