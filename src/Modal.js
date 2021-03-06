import React from 'react';
import PropTypes from 'prop-types';
import ErrorModal from './ErrorModal';
import './Modal.css';

class Modal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {fReason: 'no reason',
                        sReason: 'no reason',
                        errorMsg: false,
                        isOpen: false,
                        fService: false,
                        sService: false};
    }

    updateData = (value, serviceNum) =>
        this.setState(() => (serviceNum === "1" ? {fService: value} :{sService: value}));


    toggleModal = () =>
        this.setState({isOpen: !this.state.isOpen});


    reasonChange = (key, e) => {
        const val = e.target.value;
        this.setState(() => (key === "1" ? {fReason: val} :{sReason: val}));
    }

    closeVote = ()  => {
        if(!this.state.fService || !this.state.sService){
            alert("You need to vote for both services");
        }
        else{
            const fObj = {mark: this.state.fService,
                            reason: this.state.fReason};
            const sObj = {mark: this.state.sService,
                reason: this.state.sReason};
            this.sendData(fObj, sObj);
            if(!this.state.errorMsg) {
                this.props.onClose();
                this.props.updateData(fObj, sObj);
            }
            else{
                this.toggleModal();
            }
            this.setState({fService: false,
                            sService: false,
                            fReason: 'no reason',
                            sReason: 'no reason'});
        }
    }

    sendData = (fObj, sObj) => {
        /*let request = new XMLHttpRequest();
        request.open('POST', 'url');
        request.send(fObj);
        //request.send(sObj);
        if(request.status !== 200){
            //this.sentState ({errorMsg: (request.status+": "+request.statusText)});
            this.state.errorMsg = (request.status+": "+request.statusText);

        }*/
        /*let url = "http://localhost";
        let config = {headers:{'Content-Type': 'multipart/form-data'}};
        axios.post(url, fObj, config).then(response => console.log(response))
            .catch(errors=> this.state.errorMsg = errors);*/
    }

    render() {
        if(!this.props.show) {
            return null;
        }

        return (
            <div className="backdrop">
                <ErrorModal show={this.state.isOpen} onClose={this.toggleModal} name={this.state.errorMsg}>
                </ErrorModal>
                <div className="modal" >
                        Service 1:<Voting name="1" updateData={this.updateData}/><input type="text" onChange={this.reasonChange.bind(this, "1")}/><br />
                        Service 2:<Voting name="2" updateData={this.updateData}/><input type="text" onChange={this.reasonChange.bind(this, "2")}/>
                        <div>
                            <button onClick={this.closeVote.bind(this)}>
                                Close
                            </button>
                        </div>
                    </div>
            </div>
        );
    }
}

class Voting extends React.Component{
    constructor(props) {
        super(props);

        const key = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const voteList = key.map((key)=> <a key={key.toString()} className="Voting" onClick={this.vote.bind(this, key)}>*</a>);
        this.state = {aArr: voteList,
                      mark: false};
    }

    vote = (e) => {
        this.setState({mark: e+"/10"});
        this.props.updateData(e+"/10", this.props.name);
    }

    render(){
        return(
            <span>{this.state.mark}<br />{this.state.aArr}</span>);

}
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    show: PropTypes.bool,
    children: PropTypes.node
};


export default Modal;