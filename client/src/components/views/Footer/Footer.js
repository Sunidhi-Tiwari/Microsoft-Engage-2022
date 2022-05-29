import React from 'react'
import {Icon} from 'antd';

function Footer() {
    return (
        <div style={{
            height: '80px', display: 'flex',
            flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', fontSize:'1rem',
            backgroundColor: '#222831'
            
        }}>
           <p style={{color:'#FFD369'}}><b> Keep Binging </b><Icon type="heart" /></p>
           
        </div>
    )
}

export default Footer
