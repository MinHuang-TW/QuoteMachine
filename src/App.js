import React, { useEffect, useState, useCallback } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const randomIndex = (total) => Math.floor(Math.random() * total);
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

  const colorStyle = { 
    color: colors[tag], 
    transition: 'color 0.8s ease-in-out',
  };

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
  }, []); // eslint-disable-line

  return (
    <div className='App'>
      {data.length > 0 ? (
        <>
          <div id='quote-box'>
            <h2 id='text' style={colorStyle}>{quote}</h2>
            <p id='author' style={colorStyle}>{`- ${name}`}</p>
            <a 
              id='tweet-quote' 
              href={href}
              target='_blank'
              rel='noopener noreferrer'
              style={colorStyle}
            >
              <i className='fab fa-twitter' />
            </a>
          </div>
          <div 
            id='new-quote' 
            style={{ background: colors[tag], transition: 'background 0.8s ease-in-out' }} 
            onClick={handleIndex}
          >
            Next quote
          </div>
        </>
      ) : (
        <div className="loadingio-spinner-wedges">
          <div className="ldio">
            <div>
              <div><div /></div>
              <div><div /></div>
              <div><div /></div>
              <div><div /></div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;
