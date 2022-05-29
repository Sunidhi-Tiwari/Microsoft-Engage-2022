import React from 'react'
import { Typography } from 'antd';
import "./Moviename.css";


const { Title } = Typography;

function Moviename(props) {
    return (
       
            <div>
                <div style={{ position: 'relative', bottom: '2rem', marginLeft: '2rem', textAlign: 'center'}} >
                    <Title  className = 'custom' level={2} style = {{color: '#FFD369'}}> {props.title} </Title>
                    <p className = 'ov'  >{props.text} </p>
                </div>
            </div>
        
    )
}

export default Moviename
