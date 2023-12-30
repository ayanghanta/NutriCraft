import mainRecipeView from './views/mainRecipeView.js';
import recipeCardView from './views/recipeCardView.js';
import bookmarkView from './views/bookmarkView.js';
import shoplistView from './views/shoplistView.js';
import calenderView from './views/calenderView.js';
import filterView from './views/filterView.js';
import eventsView from './views/eventsView.js';

import * as model from './model.js';

const controllRecipe = async function () {
  try {
    //PRESETS: load all saved bookmarks and evets
    model.getSavedBookmarks();
    model.getSavedEvents();
    bookmarkView.render(model.state.bookmarks);
    model.getDaysInMonth();
    calenderView.rendercalender(model.state.calenderData);
    ///////////////////////////////////////////////////////////////
    // Get id form the url
    const id = window.location.hash.slice(1);

    // Validet the id
    if (id === '') return;
    //update active seach card
    recipeCardView.update(model.state.search.searchResult);
    bookmarkView.render(model.state.bookmarks);
    eventsView.render(model.state.currentEvents);

    // Render loding spinner ..
    mainRecipeView.renderLoader();

    // Get recipe data using the API NOTEME:
    await model.getRecipeData(id);

    // Render the recipe
    mainRecipeView.render(model.state.renderdRecipe);
  } catch (err) {
    mainRecipeView.renderError();
  }
};

const controllSearch = async function (query) {
  try {
    //validet the query
    if (query === '') return;

    // render the loading sipnner
    recipeCardView.renderLoader();

    // get the search result form this query
    await model.getSeachResults(query);

    //if no recipe show user
    if (model.state.search.searchResult.length === 0) return console.log('No result');
    //render this query
    recipeCardView.render(model.state.search.searchResult);
  } catch (err) {
    recipeCardView.renderError();
  }
};
const controllBookmarks = function () {
  //if not bookmarked then add to bookmark
  if (!model.state.renderdRecipe.isBookmarked) model.addbookmark(model.state.renderdRecipe);
  //if bookmarked then remove form bookmark
  else model.deleteBookmark(model.state.renderdRecipe.id);

  // update the main recipe view
  mainRecipeView.update(model.state.renderdRecipe);

  // render the bookmark panal
  bookmarkView.render(model.state.bookmarks);
  if (model.state.bookmarks.length === 0) bookmarkView.renderMassage();

  //save to local storage
  model.SaveBookmarks(model.state.bookmarks);
};

const controllShoplist = function () {
  // get the current recipe object and cheak it already in shoplit or not
  const isInShoplist = model.state.shoplist.some(
    (recipe) => recipe.id === model.state.renderdRecipe.id
  );
  //if yes then show some massage
  if (isInShoplist) return;

  //if not then push the object to the shop list
  model.addToShoplist(model.state.renderdRecipe);

  // render in list
  shoplistView.render(model.state.shoplist);

  // if user clear the list then remove all items
  // empty the shoplist array
};
const controllFiler = async function (filterData) {
  try {
    filterView.removeError();
    // if no filter then return
    if (filterData.length === 0) return filterView.hideForm();

    //validet filter form
    const formValid = model.validetFilers(filterData);
    if (!formValid) return filterView.renderError('Enter value between 0-100');

    //hide the form
    filterView.hideForm();
    // Create a filter sting
    model.applyFilter(filterData);

    //render Filter numbers to ui
    filterView.removeFilterNumber();
    filterView.renderFilterNumbers(filterData.length);

    // render the loading sipnner
    recipeCardView.renderLoader();
    // sreach with the querystring
    await model.getSeachResults(model.state.search.query, true);

    //render this results
    recipeCardView.render(model.state.search.searchResult);
  } catch (err) {
    recipeCardView.renderError();
  }
};

const controllCalender = function (direction) {
  if (direction === 'prev') {
    model.prevMonth();
  }
  if (direction === 'next') {
    model.nextMonth();
  }
  // calculate days in month
  model.getDaysInMonth();

  calenderView.rendercalender(model.state.calenderData);
};
const controllCalenderEvnets = function (id) {
  // get enent on this id
  model.getEvent(id);
  // if no event on that day then show massage
  if (model.state.currentEvents.length === 0) return eventsView.renderMassage();
  // show events
  eventsView.render(model.state.currentEvents);
  // save evenst in local storage
  model.saveEvents();
};
const controllAddCalenderEv = function () {
  model.saveRecipeEv();
  // update cheakmark
  mainRecipeView.update(model.state.renderdRecipe);
  mainRecipeView.changeHoverText();
  // reset calender to today
  model.resetCalender();
  calenderView.rendercalender(model.state.calenderData);
};
const init = function () {
  mainRecipeView.handelLoad(controllRecipe);
  recipeCardView.handelSearch(controllSearch);
  bookmarkView.addHandleClick(controllBookmarks);
  shoplistView.adhandelClick(controllShoplist);
  filterView.addHandler(controllFiler);
  calenderView.adHandelclicksNavigate(controllCalender);
  eventsView.addHandlerShowEv(controllCalenderEvnets);
  eventsView.addHandlerSaveEvent(controllAddCalenderEv);
  //
  // SET-CALENDER IN CURRENT MONTH
};
init();
