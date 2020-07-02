import React, { useEffect, useState, useCallback } from 'react';
import Quote from './component/Quote/Quote';
import Progress from './component/Progress/Progress';
import { url, randomIndex, colors } from './util';
import './App.css';

const App = () => {
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { tag } = !isLoading && data[index];
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
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []); // eslint-disable-line

  return (
    <div id='quote-box'>
      {isLoading ? (<Progress />) : (
        <>
          <Quote color={color} data={data[index]} />
          <div id='new-quote' style={{ background: color }} onClick={handleIndex}>
            Next quote
          </div>
        </>
      )}
    </div>
  );
};

export default App;