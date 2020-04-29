'use strict';

import React from 'react'
import ReactDOM from 'react-dom'
import './search.less'
import logo from './images/1.png'

class Search extends React.Component {
    render () {
        return (
            <div>
                hello world  hhh jjj
                <img src={logo} />
            </div>
        )
    }
}

ReactDOM.render(
    <Search />,
    document.getElementById('root')
)