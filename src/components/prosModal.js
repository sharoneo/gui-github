import React, { Component } from 'react'
import PropTypes from 'prop-types'
import '../css/PROSModal.css'
export default class PROSModal extends Component {
  
  static propTypes = {
    visible: PropTypes.bool,
    title: PropTypes.string,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
    children: PropTypes.element
  }
  static defaultProps = {
    visible: true,
    title: 'Title',
    onOk: () => { },
    onCancel: () => { }
  }
  render() {
  const {
      visible,
      title,
      children,
      onCancel
    } = this.props,
    show = {
      zIndex: 2000,
      opacity: 1
    },
    hide = {
      zIndex: -1,
      opacity: 0
    },
    contShow = {
      width: '70%',
      height: '400px'
    },
    contHide = {
      width: '0px',
      height: '0px'
    }

    return (
      <div className="gy-modalContainer" style={visible ? show : hide}>
        <div className="mask" onClick={onCancel}></div>
        <div className="innerContent" style={visible ? contShow : contHide}>
          <div className="innerContent-header">
            <div className="innerContent-title">{title}</div>
          </div>
          {children}          
        </div>
      </div>
    )
  }
}