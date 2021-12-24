import React from 'react';
import {Nav,Popover,OverlayTrigger} from 'react-bootstrap';
import '../App.css';

export default function OverlayItem({explanation, style, text}) {
  const popover = (
    <Popover id="popover-basic" className='poppins shadow-lg'>
      <Popover.Header as="h3" className='bg-primary text-light'>{text}</Popover.Header>
      <Popover.Body className='text-dark'>{explanation}</Popover.Body>
    </Popover>
  );      
  return (
    <OverlayTrigger
      placement="bottom"
      delay={{ show: 250, hide: 100 }}
      overlay={popover}
    >
      <Nav.Link className>
        {text}
      </Nav.Link>
    </OverlayTrigger>
  );
}