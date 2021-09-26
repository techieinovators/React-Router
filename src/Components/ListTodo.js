import React from 'react'
import { connect } from 'react-redux'
import { fetchTodo, updateTodo } from 'ActionsReducers/todo'

export class ListTodo extends React.Component {
  constructor(props) {
    super(props)
    props.fetchTodo()

    this.onClickDone = this.onClickDone.bind(this)
    this.onClickRemove = this.onClickRemove.bind(this)
  }

  onClickDone(todo) {
    this.props.updateTodo({
      ...todo,
      status: 'done'
    })
  }

  onClickRemove(todo) {
    this.props.updateTodo({
      ...todo,
      status: 'removed'
    })
  }

  render() {
    return <div>
      <h2>List Todo</h2>
      {/* <pre>{JSON.stringify(this.props, null, 2)}</pre> */}
      <ul>
        {this.props.todo.data
        .filter(t => (t.status !== 'done' && t.status !== 'removed'))
        .map((t, i) => <li key={i}>
          {t.taskName}
          <button onClick={() => this.onClickDone(t)}>Done</button>
          <button onClick={() => this.onClickRemove(t)}>Delete</button>
        </li>)}
      </ul>
    </div>
  }
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    todo: state.todo
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchTodo: (...f) => dispatch(fetchTodo(...f)),
  updateTodo: (...u) => dispatch(updateTodo(...u))
})

export default connect(mapStateToProps, mapDispatchToProps)(ListTodo)
