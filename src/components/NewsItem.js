import React, { Component } from 'react'
import './gbnews.css'
export class NewsItem extends Component {


  render() {

    let {title,description,imageUrl,newsUrl,author, date} = this.props;

    return (
      <div className='my-3'>
            <div className="card" >
               
              <img src={!imageUrl?"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Global_News.svg/1200px-Global_News.svg.png":imageUrl} className="card-img-top" alt=""/>
           {/*Abouve img statement means if imageUrl is not null then show the content news coming to imageUrl but if it null then shoow the image address provided */}     
            <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-muted">By{!author?"unknown":author} on {new Date(date).toGMTString()}</small></p>
            <a rel='noreferrer' href={newsUrl} className="btn btn-dark">CLICK</a>
            </div>
            </div>
        </div>
    )
  }
}

export default NewsItem
