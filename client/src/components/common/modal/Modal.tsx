import React, { ComponentProps, ReactElement, useEffect, useRef } from 'react'
import './Modal.scss'
import ReactDOM from 'react-dom'
import classNames from 'classnames'

interface ModalProps extends ComponentProps<'div'> {
  isOpen: boolean
  onRequestClose: () => void
  layerStyle?: React.CSSProperties
  cardStyle?: React.CSSProperties
}

export const Modal = (props: ModalProps): ReactElement => {
  const { isOpen, onRequestClose, layerStyle, cardStyle, className } = props

  useEffect(() => {
    const html = document.querySelector('html')
    if (html) {
      isOpen ? (html.style.overflow = 'hidden') : (html.style.overflow = '')
    }
  }, [isOpen])

  const el = document.getElementById('modal') as HTMLElement
  const ele = useRef<HTMLDivElement>(null)

  const outerClickEvent = (e: React.MouseEvent) => {
    const { target } = e
    if (ele && ele.current) {
      const elements = ele.current.contains(target as Node) // HTMLElement
      if (!elements && onRequestClose) onRequestClose()
    }
  }

  return ReactDOM.createPortal(
    <div
      className={classNames('modal', isOpen ? 'modal-show' : 'modal-hide')}
      onClick={outerClickEvent}
      style={layerStyle}
    >
      <div
        className={classNames(className, 'modal__body')}
        ref={ele}
        style={cardStyle}
      >
        {props.children}
      </div>
    </div>,
    el
  )
}
