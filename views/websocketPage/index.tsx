import React, { useEffect, useRef, useState, useReducer } from 'react';

const WebsocketPage: React.FC = () => {
  const divRef = useRef(null);
  const buttonRef = useRef(null);
  const inputRef = useRef(null);

  const reducer = (state, action) => {
    switch(action.type) {
    case 'addMessage': 
      return { ...state, 'messages': [ ...state.messages, action.messages ] };
    default:
      break;
    }
  };
  const INIT_STATE = {
    messages: []
  };

  const [ state, dispatch ] = useReducer(reducer, INIT_STATE);


  useEffect(() => {
    // 1. 创建websocket
    // 参数: websocket 的服务地址
    const socket = new WebSocket('ws://localhost:3030');
    const websocketOpen = () => {

    };
    // 2. open：当和websocket服务连接成功的时候触发
    socket.addEventListener('open', websocketOpen);

    // 3. 主动给websocket服务发送消息
    buttonRef.current.addEventListener('click', function() {
      const value = inputRef.current.value;
      socket.send(value);

      // 清空输入的内容
      inputRef.current.value = '';
    });

    // 4.接收websocket服务的数据
    const websocketMessage = (e: MessageEvent) => {
      dispatch({ type: 'addMessage', messages: JSON.parse(e.data) });
    };
    socket.addEventListener('message', websocketMessage);

    // 5.服务断开
    const websocketClose = () => {

    };
    socket.addEventListener('close', websocketClose);

    // 6.连接错误
    const websocketError = (e: ErrorEvent) => {
      console.log('错误了', e);
    };
    socket.addEventListener('error', websocketError);
    return () => {
      socket.removeEventListener('open', websocketOpen);
      socket.removeEventListener('message', websocketMessage);
      socket.removeEventListener('close', websocketClose);
      socket.removeEventListener('error', websocketError);
    };
  }, []);

  return (
    <div>
      <div>
        <input type="text" placeholder='聊点什么' ref={(el) => inputRef.current = el}/> <button ref={buttonRef}>发送</button>
      </div>
      
      <div ref={divRef} style={{ width: '400px', border: '1px solid' }}>
        {state.messages.map((val, index) => {
          return(
            <React.Fragment key={index}>
              <div>{val.name}</div>
              <div>{val.message}    {val.time}</div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default WebsocketPage;
