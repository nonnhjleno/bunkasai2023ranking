import useSWR from 'swr';
import axios from 'axios';
import { useState, useEffect } from 'react';

const fetcher = (url) => axios.get(url).then((res) => res.data);

function App() {
  const [data, setData] = useState(null);

  const { data: swrData } = useSWR('http://127.0.0.1:8000/api/test', fetcher, {
    refreshInterval: 1000,
    onError: (err) => {
      console.log(err);
    },
    onSuccess: (data) => {
      setData(data);
    },
  });

  useEffect(() => {
    if (swrData) {
      setData(swrData);
    }
  }, [swrData]);

  if(!data) return ( <p>ロード中...</p>);
  else return (<p>{JSON.stringify(data)}</p>);

}

export default App;
