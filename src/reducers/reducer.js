import {
  FETCH_FAVORITES_START,
  FETCH_FAVORITES_SUCCESS,
  FETCH_FAVORITES_FAIL,
  POST_FAVORITE_START,
  POST_FAVORITE_SUCCESS,
  POST_FAVORITE_FAIL,
  DELETE_FAVORITE_START,
  DELETE_FAVORITE_SUCCESS,
  DELETE_FAVORITE_FAIL,
  SET_USER_ID,
  getFavorites,
  // FETCH_NOTES_START,
  // FETCH_NOTES_SUCCESS,
  // FETCH_NOTE_FAIL,
  // POST_NOTE_START,
  // POST_NOTE_SUCCESS,
  // POST_NOTE_FAIL
} from '../actions/actions.js';

const initialState = {
  userID: -1,
  favorites: [],
  userNotes: [],//example content {userID: 0, notes: ["example note", "noteeeeeee"]} to get notes: let notes = props.userNotes.Find((note) => note.userID === theIDOfTheUserThatYouWantToFindNotesOn).notes
  error: '',
  isFetchingFavorites: false,
  isPostingFavorite: false,
  isDeletingFavorite: false
};

function reducer(state = initialState, action) {
  console.log('reducer', action);
  console.log("STATE ", state);
  switch (action.type) {

    case SET_USER_ID:
      console.log("reducer case SET_USER_ID, setting id to: ", action.payload);
      return {
        ...state,
        userID: action.payload
      }



    case FETCH_FAVORITES_START:
      return {
        ...state,
        isFetchingFavorites: true,
        error: ''
      };
    case FETCH_FAVORITES_SUCCESS:
      console.log("got favorites successfully", action.payload);
      return {
        ...state,
        favorites: action.payload.favorites,
        isFetchingFavorites: false,
        error: ''
      };
    case FETCH_FAVORITES_FAIL:
      return {
        ...state,
        isFetchingFavorites: false,
        error: action.payload
      };



    case POST_FAVORITE_START:
      console.log("POST FAV START", action.payload);
      return {
        ...state,
        isPostingFavorite: true,
        error: ''
      };
    case POST_FAVORITE_SUCCESS:
      console.log("POST FAV SUCCESS", action.payload);
      return {
        ...state,
        //favorites: state.favorites.concat(action.payload),
        isPostingFavorite: false,
        favorites: action.payload.favorites,
        error: ''
      };
    case POST_FAVORITE_FAIL:
      console.log("POST FAV FAIL", action.payload);
      return {
        ...state,
        isPostingFavorite: false,
        error: action.payload
      };



    case DELETE_FAVORITE_START:
      return {
        ...state,
        isDeletingFavorite: true,
        error: ''
      };
    case DELETE_FAVORITE_SUCCESS:
      return {
        ...state,
        favorites: action.payload.favorites,
        isDeletingFavorite: false,
        error: ''
      };
    case DELETE_FAVORITE_FAIL:
      return {
        ...state,
        isDeletingFavorite: false,
        error: action.payload
      };
    default:
      return state;
  }
}

export default reducer;