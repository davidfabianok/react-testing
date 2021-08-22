import {useEffect, useState} from 'react';
import fetchData from './fetchData';

export default function AsyncList() {
  const [fruits, setFruits] = useState([]);

  useEffect(() => {
    fetchData().then(arrFruits => setFruits(arrFruits));
  });

  return (
    <div className="fruits">
      <h3>Fruits</h3>
      {fruits.map(fruit => (
        <p key={`fruit-${fruit}`}>{fruit}</p>
      ))}
    </div>
  );
}
