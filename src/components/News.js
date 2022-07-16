import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import "./gbnews.css"


export class News extends Component {

  static defaultProps = {
    country : 'in', 
    pageSize: 8,
    category:'general',
  }

  static propTypes = {
    country : PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }

  constructor()
  {
    super();
    
    this.state = {
        articles : [], //empty array
        loading : true,
        page:1
    }

  }
//Below is the installation of api for top headings
  async componentDidMount()
  {
    
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=99fd537db3cc49ea9e147e9741dd538b&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);
    this.setState({articles: parsedData.articles,totalResults: parsedData.totalResults,
    loading: false})

  }
// below we are going to define the previous and next buttons which will show us the 2nd page of our news
   handlePrevClick = async()=>
  {
    console.log("previous");

    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=99fd537db3cc49ea9e147e9741dd538b&page=${this.state.page -1}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);
    

    this.setState(
      {
        page: this.state.page - 1,
        articles: parsedData.articles,
        loading: false
    })
  }

   handleNextClick = async()=>
  {
      console.log("next");

      if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/20)))
      {

     
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=99fd537db3cc49ea9e147e9741dd538b&page=${this.state.page +1}&pageSize=${this.props.pageSize}`;
      this.setState({loading:true});
      let data = await fetch(url);
      let parsedData = await data.json()
      
      this.setState({
        
          page: this.state.page + 1,
          articles: parsedData.articles,
          loading: false
      })
    }

  }


  render() {
    console.log("render")
    return (
      <div className='container my-3'>
              <h1 className="text-center" style={{margin:'40px 0px'}}>GLOBAL-NEWS HEADLINES</h1>
             {this.state.loading &&<Spinner/>}    
            

            <div className="row">
              {/* now below (!this.state.loading&&) means that if loading is false only then show the content i.e t news   since we are now adding infinite scolling that means the data should remain there always so remove*/}
            {!this.state.loading&&this.state.articles.map((element)=>{
               
               return <div className="col-md-4" key={element.url}>  
               <NewsItem  title={element.title?element.title.slice(0,45):""} description={element.description ? element.description.slice(0,80):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt}/>
              </div>
     // there can be cases that our news does not have any image to represent so set a default img to it       
            })}
                
                
                 
  

            </div>
            
              <div className="container d-flex justify-content-between">

              {/* now we have disabled the previous button if there's only 1 page */}
              <button disabled={this.state.page<=1} type="button" className="btn btn-primary" onClick={this.handlePrevClick}>&larr;Previous</button>

              <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)}  type="button" className="btn btn-primary" onClick={this.handleNextClick}>Next&rarr;</button>

              </div>
            </div>
    )
  }
}

export default News
