import React from 'react'

const NewsItem = (props)=> {
    let {title,description,imageUrl,newsUrl,author,date,source} = props;
    return (
      <div className='my-4'>
        <div className="card">
          <div style = {{display:'flex' ,justifyContent : 'flex-end', position : 'absolute' , right :'0'}}>
            <span className="badge rounded-pill bg-danger">{source}</span>
          </div>
            <img src={imageUrl?imageUrl:"https://i0.wp.com/9to5mac.com/wp-content/uploads/sites/6/2019/12/apple-tv-plus.jpg?resize=1200%2C628&quality=82&strip=all&ssl=1"} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{title}...</h5>
                <p className="card-text">{description}...</p>
                <p className="card-text"><small className="text-body-secondary">By {author?author:"unknown"} on {new Date(date).toGMTString()}</small></p>
                <a href={newsUrl} rel="noreferrer" target = "_blank" className="btn btn-sm btn-dark">Read More</a>
            </div>
        </div>
      </div>
    )
}

export default NewsItem
