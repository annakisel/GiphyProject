import React from 'react';
import fromJS, {List} from 'immutable';

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
        fetch(`api.giphy.com/v1/gifs/search/q=${ el.target.value }&key=Yo75O065RqJlF1cCZ12LRNMFKWC2psky`)
            .then(response => response.json())
            .then((list) => {
                console.log(list);
                this.setState({
                    // value: el.target.value,
                    list: fromJS(list)
                });
        });
        this.setState({value: el.target.value});
    };

    render() {
        return (
            <div>
                <form>
                    <input type="text" className={style.search} onChange={this.handleChange}
                           value={this.state.value}/>
                </form>
                <div>{this.state.value}</div>
            </div>
        )
    }
}

export default GiphyList;