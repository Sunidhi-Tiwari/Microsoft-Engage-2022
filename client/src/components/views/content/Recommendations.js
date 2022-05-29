import React, { useState, useEffect } from 'react'
// import { useLocation } from 'react-router-dom';
import axios from 'axios';
import RecommendationTiles from "./RecommendationTiles";
import Spinner from "./Spinner";
import AboutMovie from "./AboutMovie";
import { Input, Space } from 'antd';
import { API_URL, API_KEY, IMAGE_BASE_URL, IMAGE_SIZE, POSTER_SIZE } from '../../Config'
import './Rec.css'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import movie_list from './Movies_list';



const { Search } = Input;
const Recommendations = () => {
  // const location = useLocation();
  
  const [Recommendations, setRecommendations] = useState();
  const [Toggle , setToggle] = useState(false);
  const [name, setName]=useState("");
  const imagepathprefix = "https://image.tmdb.org/t/p/original";
  const [selectedTeam, setSelectedTeam] = useState(null);

  async function getAllData() {
    try {
    console.log(name)
    const MovieDetails = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=` +name+ `&page=1&include_adult=false`);
    const MovieRecommendations = await axios.post("http://127.0.0.1:5002/api/recommend/", { "title": name });
    console.log("hi")
    console.log(MovieRecommendations)
    console.log("hi2")
    //fetching the details of all the recommendations
    var MovieRecommendationDetails = [];
    var Movie_metadata;
    var Movie_Cast;
    if (MovieDetails) {
        Movie_metadata = await axios.get('https://api.themoviedb.org/3/movie/' + String(MovieDetails.data.results[0].id) + `?api_key=${API_KEY}&language=en-US`)
        Movie_Cast = await axios.get('https://api.themoviedb.org/3/movie/' + String(MovieDetails.data.results[0].id) + `/credits?api_key=${API_KEY}&language=en-US`)
    }
    //getting the keys of the Recommendations
    var keys = Object.keys(MovieRecommendations.data);
    for (var i = 0; i < 10; i++) {
        var temp = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=` + encodeURI(keys[i]) + `&page=1&include_adult=false`);
        MovieRecommendationDetails.push(temp);
    }
    // console.log(MovieRecommendationDetails)
    var FinalDetailsObj = {
        "MovieDetails": MovieDetails,
        "MovieRecommendations": MovieRecommendations.data,
        "MovieRecommendationDetails": MovieRecommendationDetails,
        "MovieMetadata": Movie_metadata,
        "MovieCast": Movie_Cast
    };

    setRecommendations(FinalDetailsObj);
    console.log(FinalDetailsObj)
     }

    catch (e) {
    console.log(e)
    }
}



  function printRecommendationTiles() {
    var keys = Object.keys(Recommendations.MovieRecommendations);
    var printarray = [];
    for (var i = 0; i < 10; i++) {

      printarray.push(
        <RecommendationTiles
          key={i}
          PosterPath={imagepathprefix + Recommendations.MovieRecommendationDetails[i].data.results[0].poster_path}
          MovieName={keys[i]}
          setToggle = {(e)=>{setToggle(!Toggle)}}
        />
      )
    }

    return printarray;

  }
  
  const onChange = (value) => {
    setName(value)
    getAllData()
}
let inputRef;

const onTagsChange = (event, values) => {
  setName(values)

  // getAllData()
  console.log(values);
}
useEffect(()=>{

  getAllData()
  

},[name])

  return (
    <>
     
      
<div style = {{width: '100%', margin: 'auto', background:'white' }}>
  
 <Autocomplete
      id="combo-box-demo"
      
      options={movie_list}
   
      style={{ width: '100%', borderRight: "none", borderLeft: "none", backgroundColor: '#ddddd'}}
      onChange = {onTagsChange}
      // onChange = {(e, value) => console.log(e.target, value.title)}
      renderInput={(params) => (
        <TextField {...params} label="Find your Movie..." variant="outlined" />
      )}
    />
     </div>   
      
      {Recommendations ?
        <div className="Recommendations-Page">

          <AboutMovie
            Details={Recommendations.MovieDetails}
            imagepathprefix={imagepathprefix}
            MovieName={name}
            MovieMetadata={Recommendations.MovieMetadata}
          />
         
          <h2 className="Recommendation-title">Movie Recommendations</h2>
          <div className="Recommendations-holder">
            {printRecommendationTiles()}
          </div>
        </div>
        : <Spinner />}
    </>

  )
}

export default Recommendations