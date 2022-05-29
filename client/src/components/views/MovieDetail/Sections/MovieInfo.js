import React from 'react'
import { Descriptions, Badge } from 'antd';
import "./Movieinfo.css";


function MovieInfo(props) {

    const { movie } = props;
    
    return (
      <div className="detail-container">
        <div className="info">
          <div className="field">
            <div className="label">
              Released: <p className="label-p">{movie.release_date}</p>
            </div>
          </div>
          <div className="field">
            <div className="label">
              Runtime: <p className="label-p">{movie.runtime} minutes</p>
            </div>
          </div>
          <div className="field">
            <div className="label">
              Vote Average: <p className="label-p">{movie.vote_average}</p>
            </div>
          </div>
          <div className="field">
            <div className="label">
            Vote Count: <p className="label-p">{movie.vote_count}</p>
            </div>
          </div>
         
          <div className="field">
            <div className="label">
            Status: <p className="label-p">{movie.status}</p>
            </div>
          </div>
          
        </div>
      </div>
    )
}

export default MovieInfo

