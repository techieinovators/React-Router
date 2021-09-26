const todoUrl = 'http://localhost:3002/todo'

export function fetchTodo() {
  return dispatch => {
    dispatch({
      type: "TODO_LOADING"
    })
    const options = {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    }
    fetch(todoUrl, options).then(r => r.json()).then(r => {
      //console.log(r)
      dispatch({
        type: "FETCH_TODO",
        payload: r.data
      })
    })
  }
}

export function addTodo(todo) {
  return dispatch => {
    dispatch({
      type: "TODO_LOADING"
    })
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todo)
    }
    fetch(todoUrl, options).then((r) => {
      const response = r.json()
      const payload = {
        _id: response._id,
        ...todo
      }
      console.log('payload', payload)
      dispatch({
        type: "ADD_TODO",
        payload
      })
    })
  }
}

export function updateTodo(todo) {
  return dispatch => {
    dispatch({
      type: "TODO_LOADING"
    })
    const options = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todo)
    }
    fetch(todoUrl + `/${todo._id}`, options).then(() => {
      dispatch({
        type: "UPDATE_TODO",
        payload: todo
      })
    })
  }
}

const todoInitialState = {
  data: [],
  status: "not loaded"
}

export function todoReducer(state = todoInitialState, action) {
  switch (action.type) {
    case "FETCH_TODO": {
      return {
        ...state,
        data: [
          ...action.payload
        ],
        status: "loaded"
      }
    }

    case "ADD_TODO":
      return {
        ...state,
        data: [
          ...state.data,
          action.payload
        ],
        status: "loaded"
      };

    case "UPDATE_TODO":
      const todoToUpdate = action.payload
      const index = state.data.findIndex(t => t._id === todoToUpdate._id)
      state.data[index] = todoToUpdate
      return {
        ...state,
        data: [
          ...state.data
        ],
        status: "loaded"
      };

    case "TODO_LOADING": {
      return {
        ...state,
        data: state.data,
        status: "loading"
      }
    }

    default:
      return state
  }
}
