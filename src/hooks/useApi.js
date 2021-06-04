import { useState, useEffect } from 'react';

export default function useApi(url, method) {
  const [status, setStatus] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!url || !method) return;

    const getData = () => {
      fetch(url, {
        method: method,
        headers: {
            "Content-Type": "application/json"
        }
      })
        .then(res => res.json())
        .then(resJSON => {
          setData(resJSON);
          setStatus(true);
        })
        .catch(err => console.log(err))
    };
    getData();
  }, [method, url]);

  return [status, data];
}
