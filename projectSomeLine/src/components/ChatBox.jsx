import React, { useState, useEffect, useRef } from 'react';

import { db, auth } from "../firebase-config";
import {
  collection,
  addDoc,
  where,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

const ChatBox = ({ room }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesRef = collection(db, "messages");
  const [showLove, setShowLove] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const queryMessages = query(
      messagesRef,
      where("room", "==", "여행 좋아하는 남자"),
      orderBy("createdAt")
    );

    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      console.log(messages);
      setMessages(messages);
      scrollToBottom();
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (newMessage === "") return;
    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser ? auth.currentUser.displayName : "Anonymous",
      room: "여행 좋아하는 남자"
    });

    setNewMessage("");
  };

  const handleLoveClick = () => {
    setShowLove(true);
    setTimeout(() => setShowLove(false), 5000);
  };

  return (
    <div className='chatbox_bg'>
      <div className="login_bgm_b">
        <video className="login_bgm" autoPlay muted loop>
          <source src='videos/mainmain8.mp4' type='video/mp4' />
        </video>
      </div>
      <div className='you_chat_Profil'>
        <div className='chat_Profil_img'></div>
        <h2 className='you_chat_Profil_name'>상대방</h2>
      </div>
      <div className='chatbox_box'>
        <div className='messages'>
          {messages.map((message) => (
            <div key={message.id} className={`message ${message.user === (auth.currentUser ? auth.currentUser.displayName : "Anonymous") ? "my-message" : "other-message"}`}>
              <div className='chatbox_talk_box'><span className="user">{message.text}</span> </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <form className='chatbox_input' onSubmit={handleSubmit}>
          <input 
            className='chat_input_text' 
            type="text" 
            value={newMessage}
            onChange={(event) => setNewMessage(event.target.value)}
          />
          <button 
            className="chat_send_btn" 
            type="submit"
          >
            보내기
          </button>
        </form>
      </div>
      <div className='my_chat_Profil'>
        <div className="chat_Profil_img_emotion">{showLove && '💕'}</div>
        <div className='chat_Profil_img'></div> 
        <h2 className='my_chat_Profil_name'>{auth.currentUser ? auth.currentUser.displayName : "Anonymous"}</h2>
        <div className='imotion_box'>
          <button className='imotion_btn' onClick={handleLoveClick}>💕좋아</button>
          <button className='imotion_btn'>😢슬퍼</button>
          <button className='imotion_btn'>👿화나</button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ChatBox);
