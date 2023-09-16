import useSWR from 'swr';
import axios from 'axios';
import { useState, useEffect } from 'react';
import './index.css';

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
    <table className='w-full'>
      <tbody className='w-full'>
        {data.map((item, index) => (
          <tr key={index}  id={"ban" + (index + 1)} className='w-9/12 h-[100px] bg-slate-100 rounded flex justify-around mx-auto my-3 text-3xl font-medium shadow-xl'>
            <td className='w-2/12 text-left my-auto'>{index + 1}位</td>
            <td className="w-6/12 text-left my-auto">{item.username}</td>
            <td className='w-2/12 text-right my-auto'>{item.score}点</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}


export default App;
