import React, { useState } from 'react';
import axios from 'axios';

const Explanation = ({ text }) => (
  <p className='text-red-600 font-bold italic mt-2 text-sm antialiased'>
    {text}
  </p>
);

const ApiReview = () => {
  const [data1, setData1] = useState([]); // Cho Fetch
  const [data2, setData2] = useState(null); // Cho Async-Await
  const [data3, setData3] = useState(null); // Cho Axios

  // CÁCH 1: DÙNG FETCH (CRUD: READ - GET)
  const runFetch = () => {
    fetch('https://jsonplaceholder.typicode.com/users/1')
      .then((response) => response.json())
      .then((json) => {
        setData1(json);
        console.log('Fetch GET Success');
      })
      .catch((err) => console.error(err));
  };

  // CÁCH 2: DÙNG ASYNC-AWAIT (CRUD: CREATE - POST)
  const runAsyncAwait = async () => {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts',
        {
          method: 'POST',
          body: JSON.stringify({ title: 'Bài tập Async-Await', userId: 1 }),
          headers: { 'Content-type': 'application/json; charset=UTF-8' },
        },
      );
      const json = await response.json();
      setData2(json);
    } catch (err) {
      console.error(err);
    }
  };

  // CÁCH 3: DÙNG AXIOS (CRUD: UPDATE - PUT)
  const runAxios = () => {
    axios
      .put('https://jsonplaceholder.typicode.com/posts/1', {
        id: 1,
        title: 'Dữ liệu đã Update bằng Axios',
        body: 'MSSV: 23701841',
        userId: 1,
      })
      .then((res) => {
        setData3(res.data);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className='p-8 space-y-10 bg-white shadow-2xl rounded-2xl max-w-3xl mx-auto my-10 border border-gray-100'>
      <div className='text-center border-b pb-4'>
        <h2 className='text-2xl font-black text-gray-800 uppercase italic'>
          3 Cách Connect API (CRUD)
        </h2>
        <p className='text-gray-400 text-sm mt-1'>Nguyễn Tấn Tài - 23701841</p>
      </div>

      {/* CÁCH 1: FETCH */}
      <section className='p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500'>
        <h3 className='font-bold text-blue-800'>CÁCH 1: DÙNG FETCH (GET)</h3>
        <button
          onClick={runFetch}
          className='mt-3 bg-blue-600 text-white px-4 py-2 rounded shadow'
        >
          Fetch Run - Click
        </button>
        {data1.name && (
          <p className='mt-2 text-sm bg-white p-2'>Kết quả: {data1.name}</p>
        )}
        <Explanation text='➜ Dùng Fetch nguyên bản với .then() để lấy dữ liệu (Read), đây là cách mặc định của trình duyệt.' />
      </section>

      {/* CÁCH 2: ASYNC-AWAIT */}
      <section className='p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500'>
        <h3 className='font-bold text-yellow-800'>
          CÁCH 2: DÙNG ASYNC-AWAIT (POST)
        </h3>
        <button
          onClick={runAsyncAwait}
          className='mt-3 bg-yellow-600 text-white px-4 py-2 rounded shadow'
        >
          Async-Await Run - Click
        </button>
        {data2 && (
          <p className='mt-2 text-sm bg-white p-2 text-xs'>
            Đã tạo bài viết ID: {data2.id}
          </p>
        )}
        <Explanation text='➜ Dùng cú pháp Async/Await để viết code bất đồng bộ trông giống code đồng bộ, giúp dễ đọc và quản lý lỗi.' />
      </section>

      {/* CÁCH 3: AXIOS */}
      <section className='p-4 bg-green-50 rounded-lg border-l-4 border-green-500'>
        <h3 className='font-bold text-green-800'>CÁCH 3: DÙNG AXIOS (PUT)</h3>
        <button
          onClick={runAxios}
          className='mt-3 bg-green-600 text-white px-4 py-2 rounded shadow'
        >
          Axios Run - Click
        </button>
        {data3 && (
          <p className='mt-2 text-sm bg-white p-2 text-xs'>
            Update thành công: {data3.title}
          </p>
        )}
        <Explanation text='➜ Dùng thư viện Axios để gửi yêu cầu cập nhật dữ liệu (Update), cú pháp ngắn gọn và tự động parse JSON.' />
      </section>
    </div>
  );
};

export default ApiReview;
