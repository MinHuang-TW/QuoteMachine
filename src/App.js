import React, { useEffect, useState, useCallback } from 'react';
import Progress from './component/Progress/Progress';
import TwitterIcon from './component/TwitterIcon';
import './App.css';

function App() {
  const randomIndex = (total) => Math.floor(Math.random() * total);
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(randomIndex(data.length));
  const { name, quote, tag } = data.length > 0 && data[index];
  
  const url = `https://us-central1-straybirds-restapi.cloudfunctions.net/app/api/quotes`;
  const href = `https://twitter.com/intent/tweet?hashtags=quote&text=${quote} -${name}`;

  const colors = { 
    'humor': '#c44129',
    'inspirational': '#ec9332',
    'poetry': '#3e8410',
    'science': '#3e8410',
    'wisdom': '#0560bd',
  };

  const color = colors[tag];

  const handleIndex = useCallback(() => {
    setIndex(randomIndex(data.length));
  }, [data.length]);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setIndex(randomIndex(data.length));
      })
      .catch((err) => console.log(err));
  }, [url]);

  return (
    <div id='quote-box'>
      {data.length > 0 ? (
        <>
          <div id='quote'>
            <h2 id='text' style={{ color }}>{quote}</h2>
            <p id='author' style={{ color }}>{`- ${name}`}</p>
            <a id='tweet-quote' href={href} target='_blank' rel='noopener noreferrer' aria-label='Twitter'>
              <TwitterIcon color={color} />
            </a>
          </div>
          <div id='new-quote' style={{ background: color }} onClick={handleIndex}>
            Next quote
          </div>
        </>
      ) : (<Progress />)}
    </div>
  );
}

export default App;