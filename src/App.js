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
      // 同じscoreの場合、同じ順位にし、次の順位をその分下げる
      data.forEach((item, index) => {
        if (index > 0 && item.score === data[index - 1].score) {
          item.rank = data[index - 1].rank;
        } else {
          item.rank = index + 1;
        }
      });
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
          <tr key={index} id={"ban" + (item.rank)} className='w-9/12 h-[100px] bg-slate-100 rounded flex justify-around mx-auto my-3 text-3xl font-medium shadow-xl'>
            <td className='w-2/12 text-left my-auto'>{item.rank}位</td>
            <td className="w-6/12 text-left my-auto">{item.username}</td>
            <td className='w-2/12 text-right my-auto'>{item.score}点</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default App;
