import { BASE_URL, KEY, MAX_RESULT } from './config.js';
import { getJSON } from './helper.js';

export const state = {
  renderdRecipe: {},
  search: {
    query: '',
    queryId: '',
    searchResult: [],
  },
  bookmarks: [],
  shoplist: [],
  calenderData: {
    activeDate: new Date().getDate(),
    activeMonth: new Date().getMonth() + 1,
    activeYear: new Date().getFullYear(),
    currentYear: new Date().getFullYear(),
    currentMonth: new Date().getMonth() + 1,
    daysInMonth: 0,
    events: [],
    markdates: [],
  },
  currentEvents: [],
  filters: {},
  filterString: '',
};
const createRecipeObj = function (data) {
  return {
    recipeTitle: data.title,
    id: data.id,
    cookingtime: data.readyInMinutes,
    servings: data.servings,
    imgUrl: data.image,
    isVegetarian: data.vegetarian,
    ingredients: data.extendedIngredients.map((ingri) => {
      return {
        ingName: ingri.name,
        ingQuantity: ingri.amount,
        ingUnit: ingri.unit,
      };
    }),
    recipeNutrients: data.nutrition.nutrients.slice(0, 5).map((nutri) => {
      return {
        nutriName: nutri.name,
        dailyNeed: nutri.percentOfDailyNeeds,
        nutriAmount: nutri.amount,
        unit: nutri.unit,
      };
    }),
  };
};

export const getRecipeData = async function (id) {
  try {
    const recipeData = await getJSON(
      `${BASE_URL}${id}/information?apiKey=${KEY}&includeNutrition=true`
    );
    state.renderdRecipe = createRecipeObj(recipeData);
    state.renderdRecipe.isBookmarked = state.bookmarks.some(
      (recipe) => recipe.id === state.renderdRecipe.id
    )
      ? true
      : false;
  } catch (err) {
    throw err;
  }
};

export const getSeachResults = async function (query, filters = false) {
  try {
    state.search.query = query;
    let filterString = '';
    if (filters) {
      filterString = state.filterString;
    }

    const searchResults = await getJSON(
      `${BASE_URL}complexSearch?apiKey=${KEY}&query=${query}${filterString}&number=${MAX_RESULT}`
    );
    // NOTEME:[insted of throeing error try to display show custom warning !]
    if (searchResults.results.length === 0) throw new Error();
    state.search.searchResult = searchResults.results.map((res) => {
      return {
        id: res.id,
        title: res.title,
        image: res.image,
      };
    });
  } catch (err) {
    throw err;
  }
};

export const addbookmark = function (recipe) {
  state.bookmarks.push(recipe);
  state.renderdRecipe.isBookmarked = true;
};
export const deleteBookmark = function (id) {
  const index = state.bookmarks.findIndex((res) => res.id === id);
  state.bookmarks.splice(index, 1);
  state.renderdRecipe.isBookmarked = false;
};

export const SaveBookmarks = function (bookmarks) {
  localStorage.setItem('nutriCraftBookmarks', JSON.stringify(bookmarks));
};
export const getSavedBookmarks = function () {
  const bookM = JSON.parse(localStorage.getItem('nutriCraftBookmarks'));
  if (!bookM) return;
  state.bookmarks = bookM;
};
const deleteAllBookmarks = function () {
  localStorage.clear('nutriCraftBookmarks');
};
// deleteAllBookmarks();

export const addToShoplist = function (data) {
  state.shoplist.push(data);
};

export const validetFilers = function (data) {
  let ingValues = [...data];
  if (ingValues[0][0] === 'diet') ingValues = ingValues.slice(1);
  const isValid = ingValues.every((ingVal) => +ingVal[1] <= 100 && +ingVal[1] >= 0);
  return isValid;
  // if (!isValid) console.log('Please enter value betwwen 0-100');
};

export const applyFilter = function (filterArr) {
  state.filters = filterArr;
  const str = state.filters
    .reduce((acc, curr) => {
      return (acc = `${acc + curr.join('=')}&`);
    }, '')
    .slice(0, -1);
  state.filterString = `&` + str;
};

export const getDaysInMonth = function () {
  state.calenderData.daysInMonth = new Date(
    state.calenderData.currentYear,
    state.calenderData.currentMonth,
    0
  ).getDate();
};
export const prevMonth = function () {
  if (state.calenderData.currentMonth > 0) state.calenderData.currentMonth -= 1;
  if (state.calenderData.currentMonth === 0) {
    state.calenderData.currentMonth = 12;
    state.calenderData.currentYear -= 1;
  }
};

export const nextMonth = function () {
  if (state.calenderData.currentMonth < 13) state.calenderData.currentMonth += 1;
  if (state.calenderData.currentMonth === 13) {
    state.calenderData.currentMonth = 1;
    state.calenderData.currentYear += 1;
  }
};

export const saveRecipeEv = function () {
  const day = state.calenderData.activeDate;
  const month = state.calenderData.activeMonth;
  const year = state.calenderData.activeYear;
  const dayId = `${(day + '').padStart(2, '0')}${(month + '').padStart(2, '0')}${year}`;
  state.renderdRecipe.dayId = dayId;
  state.renderdRecipe.markedRecipe = true;

  if (
    state.calenderData.events.some(
      (resipe) => resipe.id === state.renderdRecipe.id && resipe.dayId === dayId
    )
  )
    return;

  state.calenderData.events.push(state.renderdRecipe);
  state.calenderData.markdates.push({ day, month, year });
};

export const getEvent = function (id) {
  state.currentEvents = state.calenderData.events.filter((recipe) => recipe.dayId === id);
  // console.log(events);
};
export const saveEvents = function () {
  localStorage.setItem('allEvents', JSON.stringify(state.calenderData.events));
  localStorage.setItem('allMarkDays', JSON.stringify(state.calenderData.markdates));
};
export const getSavedEvents = function () {
  const events = JSON.parse(localStorage.getItem('allEvents'));
  const markday = JSON.parse(localStorage.getItem('allMarkDays'));
  if (!events || !markday) return;
  state.calenderData.events = events;
  state.calenderData.markdates = markday;
};

export const resetCalender = function () {
  state.calenderData.currentYear = new Date().getFullYear();
  state.calenderData.currentMonth = new Date().getMonth() + 1;
  getDaysInMonth();
};
