import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "@redux-saga/core";
import { fetchUsersService, deleteUserService, showUserService, updateUserService, createUserService } from "../redux/service/index";
import { put, takeEvery } from "redux-saga/effects";

const initialState = {
    users: [],
    user: {
      first_name: "",
      last_name: "",
      description: "",
      mobile: ""
    }
};

function* getUsersAction() {
  const users = yield fetchUsersService();
  yield put({ type: "USERS_FETCH_SUCCEEDED", payload: users });
}

function* createUserAction({ payload }) {
  yield createUserService(payload);
  yield put({ type: "USERS_FETCH_REQUESTED" });
}


function* updateUserAction({ id, payload }) {
  yield updateUserService(id,payload);
  yield put({ type: "USERS_FETCH_REQUESTED" });
}


function* deleteTodoAction({ payload }) { 
  yield deleteUserService(payload);
  yield put({ type: "USERS_FETCH_REQUESTED" });
}

function* showUserAction({ payload }) { 
  const { 0: user } = yield showUserService(payload);

  yield put({ type: "USER_FETCH_SUCCEEDED", payload: user });
}

function* rootSaga() {
  yield takeEvery("USERS_FETCH_REQUESTED", getUsersAction);
  yield takeEvery("CREATE_USER_REQUESTED", createUserAction);
  yield takeEvery("UPDATE_USER_REQUESTED", updateUserAction);
  yield takeEvery("DELETE_USER_REQUESTED", deleteTodoAction);
  yield takeEvery("SHOW_USER_REQUESTED", showUserAction);
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "USERS_FETCH_SUCCEEDED":
      return {
          ...state,
          users: [...action.payload]
      }
    case "USER_FETCH_SUCCEEDED":
        return {
          ...state,
          user: {...action.payload}
        }
    default:
      return state;
  }
};

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(reducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export const selectUsers = (state) => state.users;

export const selectUser = (state) => state.user;

export const fetchUsers = () => ({ type: "USERS_FETCH_REQUESTED" });

export const removeUser = (id) => ({
  type: "DELETE_USER_REQUESTED",
  payload: id,
});

export const showUser = (id) => ({
  type: "SHOW_USER_REQUESTED",
  payload: id,
});

export const addUser = (text) => ({
  type: "CREATE_USER_REQUESTED",
  payload: text,
});


export const updateUser = (id,text) => ({
  type: "UPDATE_USER_REQUESTED",
  payload: text,
  id
});