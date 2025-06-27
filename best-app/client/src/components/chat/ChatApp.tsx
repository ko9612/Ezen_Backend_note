import { IoChatboxEllipsesOutline } from "react-icons/io5";
import "./Chat.css";
import { useAuthStore } from "../../stores/authStore";
import { useState, useRef, useEffect } from "react";
import socket from "./socket";

//npm i react-icons
//npm i socket.io-client
type ChatMessage = {
  sender: string;
  message: string;
};
export default function ChatApp() {
  const authUser = useAuthStore((s) => s.authUser);
  const isLoading = useAuthStore((s) => s.isLoading);
  const [message, setMessage] = useState<string>(""); //메시지
  const [chatList, setChatList] = useState<ChatMessage[]>([]); //서버가 보내오는 대화내용

  const messageRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!socket.connected) {
      socket.connect(); //챗서버에 연결
      console.log("챗서버와 연결됨...");
    }

    //서버가 보내오는 메시지를 들어서 chatList 에 출력
    socket.on("receiveMessage", (data: ChatMessage) => {
      setChatList((prev) => [...prev, data]);
    });

    return () => {
      //unmount될때 실행되는 cleanup 함수
      if (socket.connected) {
        console.log("useEffect cleanup 소켓 연결 끊음...");
        socket.off("receiveMessage"); //이벤트 receiveMessage 제거
        socket.disconnect(); //챗서버 연결 중지
      }
    };
  }, []);

  useEffect(() => {
    //새 메시지가 추가될 때 마다 해당 요소로 스크롤 하도록
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatList, isLoading, authUser]);

  const sendMessage = () => {
    if (!authUser?.name.trim()) {
      console.log("닉네임이 없거나 인증 사용자가 없음");
      return;
    }
    socket.emit("sendMessage", { sender: authUser?.name, message: message });
    setMessage("");
    messageRef.current?.focus();
  };
  if (isLoading || !authUser) {
    return (
      <div className="alert alert-primary">
        <h2>
          <IoChatboxEllipsesOutline /> 실시간 채팅
        </h2>
        <h3>로그인 해야 이용 가능합니다</h3>
      </div>
    );
  }

  return (
    <div className="wrap">
      <h2>
        <IoChatboxEllipsesOutline /> 실시간 채팅
      </h2>
      {authUser && (
        <input
          name="nickName"
          placeholder="닉네임 입력"
          value={authUser?.name}
          className="input"
          disabled
        />
      )}

      <div className="divMsg">
        {chatList.map((msg, idx) => (
          <div key={idx} className="chatList">
            <strong>{msg.sender} : </strong>
            <span>{msg.message}</span>
          </div>
        ))}
        <div ref={endRef} />
        {/* ref 설정. 스크롤 되도록 empty div를 챗팅 메시지 목록 끝에 위치시킴 */}
      </div>
      <input
        name="message"
        ref={messageRef}
        placeholder="메시지 입력"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="input_msg"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            sendMessage();
          }
        }}
      />
      <button className="btn btn-info mx-1" onClick={sendMessage}>
        Send
      </button>
    </div>
  );
}
