import React from 'react';
import TwitterIcon from '../TwitterIcon';
import { href } from '../../util';
import './Quote.css';

const Quote = ({ color, data: { name, quote } }) => (
  <div id='quote'>
    <h2 id='text' style={{ color }}>
      {!name && <p className='error'>&#9888;</p>}{quote}
    </h2>
    {name && (<p id='author' style={{ color }}>{`- ${name}`}</p>)}
    {name && (<a
      id='tweet-quote'
      href={`${href}&text=${quote} -${name}`}
      target='_blank'
      rel='noopener noreferrer'
      aria-label='Twitter'
    >
      <TwitterIcon color={color} />
    </a>)}
  </div>
);

export default Quote;