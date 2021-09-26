import React from 'react'
import { connect } from 'react-redux'
import { fetchTodo } from 'ActionsReducers/todo'

export class DoneRemovedTodo extends React.Component {
  constructor(props) {
    super(props)
    props.fetchTodo()
  }

  render() {
    return <div>
      <h2>Done and Removed Todos</h2>
      {/* {JSON.stringify(this.props)} */}
      <ul>
        {this.props.todo.data
        .filter(t => (t.status === 'done' || t.status === 'removed'))
        .map((t, i) => <li key={i}>{t.taskName}</li>)}
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
  fetchTodo: (...f) => dispatch(fetchTodo(...f))
})

export default connect(mapStateToProps, mapDispatchToProps)(DoneRemovedTodo)
