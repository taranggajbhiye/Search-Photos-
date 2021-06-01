import { useEffect, useState } from 'react'


export default function useImageSearch(query, pageNumber) {
  
  const [pics, setPics] = useState([])
  const [hasMore, setHasMore] = useState(false)

  useEffect(() => {
    setPics([])
  }, [query])

  useEffect(() => {
    
    fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${process.env.REACT_APP_API_KEY}&tags=${query}&per_page=10&page=${pageNumber}&format=json&nojsoncallback=1`)
	.then( (response) => {
        return response.json();
      })
    .then(res => {
       setPics(prevPics => {
         return [...new Set([...prevPics, ...res.photos.photo.map((pic) => {
           var srcPath = 'https://farm'+pic.farm+'.staticflickr.com/'+pic.server+'/'+pic.id+'_'+pic.secret+'.jpg';
           return(
            <img alt="dogs" src={srcPath}></img>
           )}
         )])]
        })
        setHasMore(res.photos.pages > 0)
    })
  }, [query, pageNumber])

  return {  pics, hasMore }
}
