import useSWR from 'swr';
import axios from 'axios';
import { useState, useEffect } from 'react';

const fetcher = (url) => axios.get(url).then((res) => res.data);

const App = () => {
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

  if (!data) return (<p>ロード中...</p>);
  else return (
    <UserDataList data={data} />

  );
}

const UserDataList = ({ data }) => {
  return (
    <ul>
      {data.map((item, index) => (
        <li key={index}>
          {index + 1}位: {item.username}さん {item.score}点
        </li>
      ))}
    </ul>
  );
}


export default App;
