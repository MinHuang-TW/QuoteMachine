import React, { useEffect, useState, useCallback } from 'react';
import Quote from './component/Quote/Quote';
import Progress from './component/Progress/Progress';
import { url, randomIndex, colors } from './util';
import './App.css';

const App = () => {
  const [data, setData] = useState({});
  const [index, setIndex] = useState(randomIndex(62));
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleIndex = useCallback(() => {
    setIndex(randomIndex(data.length));
  }, [data.length]);

  useEffect(() => {
    fetch(`${url}/${index}`)
      .then((res) => {
        if (!res.ok) {
          const expectedError = res.status >= 400 && res.status < 500;
          !expectedError && setError(true);
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        setIsLoading(false);
      })
  }, [index]);

  return (
    <div id='quote-box'>
      {isLoading ? (<Progress />) : error ? (
        <Quote data={{ quote: 'An unexpected error occurrred.' }} />
      ) : (
        <>
          <Quote color={colors[data.tag]} data={data} />
          <div 
            id='new-quote' 
            style={{ background: colors[data.tag] }} 
            onClick={handleIndex}
          >
            Next quote
          </div>
        </>
      )}
    </div>
  );
};

export default App;