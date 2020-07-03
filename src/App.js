import React, { useEffect, useState, useCallback } from 'react';
import Quote from './component/Quote/Quote';
import Progress from './component/Progress/Progress';
import { url, randomIndex, colors } from './util';
import './App.css';

const App = () => {
  const [data, setData] = useState({});
  const [index, setIndex] = useState(randomIndex(62));
  const [isLoading, setIsLoading] = useState(true);

  const handleIndex = useCallback(() => {
    setIndex(randomIndex(data.length));
  }, [data.length]);

  useEffect(() => {
    fetch(`${url}/${index}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [index]);

  return (
    <div id='quote-box'>
      {isLoading ? (<Progress />) : (
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