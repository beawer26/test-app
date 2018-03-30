import React from 'react';
import Modal from './Modal';



class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = { isOpen: false,
                       fService: false,
                       sService: false,
                       fReason: "",
                       sReason: ""};
    }

    toggleModal = () => this.setState({isOpen: !this.state.isOpen});


    updateData = (fValue, sValue) => {
        this.setState({fService: "Service 1:"+fValue.mark,
                      sService: "Service 2:"+sValue.mark,
                      fReason: "Reason:"+fValue.reason,
                      sReason: "Reason:"+sValue.reason});
    }

    render() {
        return (
            <div className="App">
                <div className="App">
                    <button onClick={this.toggleModal}>
                        Open voting window
                    </button>
                </div>
                <div className="App">{this.state.fService}&nbsp;{this.state.fReason}</div>
                <div className="App">{this.state.sService}&nbsp;{this.state.sReason}</div>
                <Modal show={this.state.isOpen}
                       onClose={this.toggleModal} updateData={this.updateData}>
                </Modal>
            </div>
        );
    }
}

export default App;

