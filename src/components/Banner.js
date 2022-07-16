import React, { Component } from 'react'
import vb from './vb.gif'
import "./banner.css"
export class Banner extends Component {
  render() {
    return (
      <div >
        <img className='ban' src={vb} alt="" />
      </div>
    )
  }
}

export default Banner
