import { Overlay, ModalWindow } from './Modal.styled';
import { PropTypes } from 'prop-types';
import { Component } from 'react';
import { createPortal } from 'react-dom';
import { Loader } from 'components/Loader/Loader';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onModalClose);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onModalClose);
  }

  onModalClose = e => {
    if (e.target !== e.currentTarget || e.code === 'Escape') {
      this.props.toggleModal();
    }
  };

  render() {
    const { src, name } = this.props;

    return createPortal(
      <Overlay onClick={this.onModalClose}>
        <ModalWindow>
          <Loader />
          <img src={src} alt={name} />
        </ModalWindow>
      </Overlay>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  src: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired,
};
