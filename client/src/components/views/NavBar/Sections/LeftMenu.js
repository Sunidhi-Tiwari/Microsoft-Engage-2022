import React from 'react';
import { Menu } from 'antd';


function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
      <Menu.Item key="favorite">
        <a href="/favorite" style= {{color : 'white', backgroundColor: '#222831'}}> &nbsp; &nbsp; &nbsp; Your Favorites</a>
      </Menu.Item>
      
      <Menu.Item key="content">
        <a href="/recommend" style= {{color : 'white', backgroundColor: '#222831'}}> &nbsp; &nbsp; &nbsp; Recommendation</a>
      </Menu.Item>
    </Menu>
  )
}

export default LeftMenu