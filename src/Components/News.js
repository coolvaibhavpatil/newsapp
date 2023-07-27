import React,{useState,useEffect} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props)=> {
  const [ articles , setArticles] = useState([])  
  const [ loading , setLoading] = useState(false)  
  const [ page , setPage] = useState(1)  
  const [ totalResults , setTotalResults] = useState(0)  
  
  const capitalizeFirstLetter  = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  } 
  
  const updateNews = async ()=>{
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true)
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json()
    props.setProgress(70);
    setArticles(parsedData.articles)
    setLoading(parsedData.loading)
    setTotalResults(parsedData.totalResults)
    props.setProgress(100);
  }
  
  useEffect(()=>{
    document.title = `NewsMonkey - ${capitalizeFirstLetter(props.category)}`
    updateNews();
  },[]) // replacement to componentDidMount 

  // const handlePrevClick = async () => {
  //   setPage(page-1)
  //   updateNews();
  // }
  
  // const handleNextClick = async  ()=>{
  //   if(page + 1 > Math.ceil(totalResults / props.pageSize))
  //   {
  //     let btn = document.getElementById("next")
  //     btn.setAttribute("disabled","true")
  //   }else
  //   {
  //     setPage(page+1)
  //     updateNews();
  //   }
  // }

  const fetchMoreData = async() => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1)       
    setLoading(true)
    let data = await fetch(url);
    let parsedData = await data.json()

    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
    setLoading(false)
  };

    return (
      <div className='container my-4'>
        <h2 className='text-center' style={{margin : '35px 0px' ,marginTop :'90px' }}>NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines</h2>
        {/* {loading && <Spinner/>} */}
        <InfiniteScroll
            dataLength={articles.length}
            next={fetchMoreData}
            hasMore={articles.lenght !== totalResults}
            loader= {<Spinner/>}
          >
          <div>
            <div className="row">
                  {/*!loading && */ articles.map((element) => {
                    return <div className="col-md-3" key = {element.url}>
                      <NewsItem  title = {element.title?element.title.slice(0,45):""} description = {element.description?element.description.slice(0,100):""} imageUrl = {element.urlToImage} newsUrl ={element.url}  author = {element.author} date = {element.publishedAt} source ={element.source.name}/>
                    </div>
                  })}
            </div>
          </div>
        </InfiniteScroll>
      </div>
    )
}

export default News 

News.defaultProps = {
  country  : 'in',
  pageSize : 8,
  category : 'general'
};

News.propTypes = {
  country  : PropTypes.string,
  pageSize : PropTypes.number,
  category : PropTypes.string
};