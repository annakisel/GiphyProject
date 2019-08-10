import React from 'react';
import {fromJS, List} from 'immutable';

import style from './index.css';

class GiphyList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            list: List()
        };
    }

    handleChange = (el) => {
        const updatedState = this.state;
        updatedState.value = el.target.value;
        fetch(`https://api.giphy.com/v1/gifs/search?q=${ el.target.value }&api_key=Yo75O065RqJlF1cCZ12LRNMFKWC2psky`)
            .then(response => response.json())
            .then((list) => {
                updatedState.list = fromJS(list.data.map(item => item.images.original.url));
                this.setState({...updatedState})
            }).catch(err => console.log(err));
    };

    render() {
        const {list, value} = this.state;
        return (
            <div>
                <form>
                    <input type="text" className={style.search} onChange={this.handleChange}
                           value={value}/>
                </form>
                <div>{this.state.value}</div>
                {
                    list.map(item => {
                        return <img key={item} src={item} alt="hello" height="300px"/>
                    })
                }
            </div>
        )
    }
}

export default GiphyList;