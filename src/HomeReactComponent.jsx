import * as React from 'react'

export class HomeReactComponent extends React.Component {
  constructor() {
    super()
    this.inputChange = this.inputChange.bind(this)
  }

  inputChange(event) {
    this.props.onCommentChange(event.target.value)
  }

  render() {
    console.info('[REACT] render with props', this.props)

    return (
      <div>
        <h1>#{this.props.id} - {this.props.title}</h1>

        <p>{this.props.body}</p>

        <p>---- by user#{this.props.userId}</p>

        <textarea
          style={{width: '100%'}}
          rows="10"
          value={this.props.comment ? this.props.comment : ''}
          onChange={this.inputChange}/>
      </div>
    )
  }
}
