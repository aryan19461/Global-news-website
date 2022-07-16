import React, { Component } from 'react'
import loadings from './loading.gif'
export class Spinner extends Component {
  render() {
    return (
      <div className='text-center'>
        <img src={loadings} alt="" />
      </div>
    )
  }
}

export default Spinner
