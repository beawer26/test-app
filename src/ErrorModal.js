import React from 'react';
import PropTypes from 'prop-types';
import './ErrorModal.css';

class ErrorModal extends React.Component {
    render() {
        if(!this.props.show) {
            return null;
        }

        return (
            <div className="backdropError">
                <div className="modalError">
                    <div>{this.props.name}</div>
                    <div>
                        <button onClick={this.props.onClose}>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}



ErrorModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    show: PropTypes.bool,
    children: PropTypes.node
};


export default ErrorModal;