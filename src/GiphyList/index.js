import React from 'react';
import {fromJS, List} from 'immutable';
import Modal from 'react-modal';

import './styles.css';

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

    openModal = () => {
        this.setState({modalIsOpen: true});
    };

    afterOpenModal = () => {
        // references are now sync'd and can be accessed.
        this.subtitle.style.color = '#f00';
    };

    closeModal = () => {
        this.setState({modalIsOpen: false});
    };

    render() {
        const {list, value} = this.state;
        return (
            <div>
                <form>
                    <input type="text" className='styles' onChange={this.handleChange}
                           value={value}/>
                </form>
                <div>{this.state.value}</div>
                {
                    list.map(item => {
                        return <div key={item} onClick={this.openModal} className='gif'><img src={item} alt="hello" /></div>
                    })
                }
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    // style={customStyles}
                    contentLabel="Example Modal"
                >

                    <h2 ref={subtitle => this.subtitle = subtitle}>Hello</h2>
                    <button onClick={this.closeModal}>close</button>
                    <div>I am a modal</div>
                    <form>
                        <input />
                        <button>tab navigation</button>
                        <button>stays</button>
                        <button>inside</button>
                        <button>the modal</button>
                    </form>
                </Modal>
            </div>
        )
    }
}

export default GiphyList;