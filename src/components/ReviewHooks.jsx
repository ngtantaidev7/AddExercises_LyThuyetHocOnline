import React, {
  useState,
  useEffect,
  useRef,
  useReducer,
  useMemo,
  useCallback,
  memo,
} from 'react';

const Explanation = ({ text }) => (
  <p className='text-red-400 font-bold italic mt-1 text-sm'>{text}</p>
);

// 1. useState & useEffect
const Timer = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setCount((v) => v + 1), 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className='mb-4'>
      <div className='p-3 bg-blue-50 rounded shadow-sm inline-block'>
        Đồng hồ: {count}s
      </div>
      <Explanation text='=> useState lưu trữ giá trị đếm, useEffect thiết lập bộ đếm thời gian tự động khi component mount.' />
    </div>
  );
};

// 2. useRef
const FocusInput = () => {
  const inputRef = useRef(null);
  return (
    <div className='mb-4'>
      <div className='flex gap-2'>
        <input
          ref={inputRef}
          className='border p-2 rounded w-40'
          placeholder='Focus me...'
        />
        <button
          onClick={() => inputRef.current.focus()}
          className='bg-gray-800 text-white px-3 rounded hover:bg-black'
        >
          Focus
        </button>
      </div>
      <Explanation text='=> useRef truy cập trực tiếp vào phần tử DOM để thực hiện hành động focus mà không làm render lại.' />
    </div>
  );
};

// 3. useReducer
const reducer = (state, action) =>
  action.type === 'up' ? state + 1 : state - 1;
const CounterReducer = () => {
  const [count, dispatch] = useReducer(reducer, 0);
  return (
    <div className='mb-4'>
      <div className='p-2 border rounded inline-block bg-green-50'>
        Reducer Count: <span className='font-bold'>{count}</span>
        <button
          onClick={() => dispatch({ type: 'up' })}
          className='ml-2 px-3 bg-green-500 text-white rounded'
        >
          +
        </button>
        <button
          onClick={() => dispatch({ type: 'giam' })}
          className='ml-1 px-3 bg-red-500 text-white rounded'
        >
          -
        </button>
      </div>
      <Explanation text='=> useReducer quản lý các logic cập nhật state phức tạp thông qua các hành động (actions) và hàm reducer.' />
    </div>
  );
};

// 4. useMemo
const MemoCalculation = () => {
  const [num, setNum] = useState(1);
  const result = useMemo(() => {
    console.log('Đang tính toán...');
    return num * num;
  }, [num]);
  return (
    <div className='mb-4'>
      <div className='p-2 border rounded bg-yellow-50 inline-block'>
        Bình phương của {num} là:{' '}
        <span className='font-bold text-lg'>{result}</span>
        <button
          onClick={() => setNum(num + 1)}
          className='ml-3 border border-gray-400 px-2 rounded'
        >
          Tăng số
        </button>
      </div>
      <Explanation text="=> useMemo ghi nhớ kết quả tính toán và chỉ tính lại khi giá trị 'num' thực sự thay đổi để tối ưu hiệu năng." />
    </div>
  );
};

// 5. memo & useCallback
const Child = memo(({ onDo }) => {
  console.log('Child render!');
  return (
    <button
      onClick={onDo}
      className='bg-purple-600 text-white px-4 py-1 rounded mt-2 hover:bg-purple-700'
    >
      Nút con (memo)
    </button>
  );
});

const ReviewHooks = () => {
  const [val, setVal] = useState(0);
  const handleDo = useCallback(() => console.log('Action Clicked!'), []);

  return (
    <div className='p-8 space-y-8 bg-white shadow-2xl rounded-2xl max-w-2xl mx-auto my-10 border border-gray-100'>
      <div className='text-center border-b pb-4'>
        <h2 className='text-3xl font-black text-gray-800 uppercase tracking-widest italic'>
          Ôn Tập Hooks Core
        </h2>
        <p className='text-gray-400 text-sm mt-1'>23701841 - Nguyễn Tấn Tài</p>
      </div>

      <section>
        <h3 className='text-lg font-bold text-blue-800'>
          1. useState & useEffect
        </h3>
        <Timer />
      </section>

      <section>
        <h3 className='text-lg font-bold text-gray-700'>2. useRef</h3>
        <FocusInput />
      </section>

      <section>
        <h3 className='text-lg font-bold text-green-800'>3. useReducer</h3>
        <CounterReducer />
      </section>

      <section>
        <h3 className='text-lg font-bold text-orange-800'>4. useMemo</h3>
        <MemoCalculation />
      </section>

      <section className='border-t pt-4'>
        <h3 className='text-lg font-bold text-purple-800'>
          5. useCallback & memo
        </h3>
        <div className='p-3 bg-purple-50 rounded'>
          <p>
            Giá trị cha: <span className='font-bold'>{val}</span>
          </p>
          <button
            onClick={() => setVal(val + 1)}
            className='mt-2 border border-purple-400 px-3 rounded'
          >
            Render lại cha
          </button>
          <br />
          <Child onDo={handleDo} />
        </div>
        <Explanation text='=> memo ngăn component con render lại vô ích; useCallback giữ cho địa chỉ hàm không đổi để memo hoạt động chính xác.' />
      </section>
    </div>
  );
};

export default ReviewHooks;
