// "use client";

// import { useParams, useSearchParams } from "next/navigation";
// import { useEffect, useRef, useState } from "react";
// import Cookies from "js-cookie";

// import Image from "next/image";
// import Link from "next/link";

// import useIsIntersecting from "@/hooks/useIntersecting";

// function VideoPage() {

//    const SERVER_URL = "http://192.168.4.90:30010/"; // TODO: change
//    const videoId = useParams().id;
//    const searchParams = useSearchParams();
 
//    const isPartyText = searchParams.get("party");
//    const streamId = searchParams.get("streamId");

//    const videoRef = useRef(null);
//    const [ws, setWs] = useState(null);
//    const isUpdating = useRef(false);
//    const isSeeking = useRef(false);

//    const [messages, setMessages] = useState([{message: "First Message", name: "Namee"}, {message: "First Message", name: "Namee"}, {message: "First Message", name: "Namee"}, {message: "First Message", name: "Namee"}, {message: "First Message", name: "Namee"}, {message: "First Message", name: "Namee"}, {message: "First Message", name: "Namee"}, {message: "First Message", name: "Namee"}]);
//    const textInputRef = useRef(null);
   
//    const [title, setTitle] = useState("Title"); // TODO: should be an empty string
//    const [description, setDescription] = useState("Descriptionnnnnnnnnn jsndkjsnkjdn"); // TODO: should be an empty string

//    const [isChatOn, setIsChatOn] = useState(false);
//    const bottomDivRef = useRef(null);
//    const scrollerRef = useRef(null);

//    const isIntersecting = useIsIntersecting(bottomDivRef);

//    // useEffect(() => {
//    //    // TODO: get video
//    //    fetch(`${SERVER_URL}/`).then(response => {
//    //       if (response.ok) return response.json();
//    //    }).then(() => {
//    //       // TODO: set videoId, title and description
//    //    })
//    // }, [videoId]);

//    useEffect(() => {
//       if (isPartyText !== "true") return;

//       const websocket = new WebSocket("ws://localhost:3000");
//       setWs(websocket);

//       websocket.onopen = () => {
//          websocket.send(JSON.stringify({ type: 'JOIN', streamId }));
//       };

//       websocket.onmessage = (event) => {
//          isUpdating.current = true;
//          const data = JSON.parse(event.data);

//          switch (data.type) {
//             case "PLAY":
//                videoRef.current.currentTime = data.currentTime;
//                videoRef.current.play();
//                break;
//             case "PAUSE":
//                videoRef.current.currentTime = data.currentTime;
//                videoRef.current.pause();
//                break;
//             // case 'SEEK':
//             //    if (!isSeeking.current) {
//             //       videoRef.current.currentTime = data.currentTime;
//             //       videoRef.current.play();
//             //    }
//             //    break;
//             // case 'CHAT_MESSAGE':
//             //    setMessages((prevMessages) => [...prevMessages, da-++ta]);
//             //    break;
//             // default:
//             //    console.log("Received unknown message type:", data.type);
//          }
//          setTimeout(() => (isUpdating.current = false), 300); // Adjust delay as needed
//       };

//       return () => {
//          websocket.close();
//       };
//    }, [isPartyText, streamId]);

//    function handlePlay() {
//       if (isPartyText !== "true") return;
//       if (!isUpdating.current) {
//          const currentTime = videoRef.current?.currentTime || 0;
//          ws?.send(JSON.stringify({ type: "PLAY", currentTime }));
//       }
//    }

//    function handlePause() {
//       if (isPartyText !== "true") return;
//       if (!isUpdating.current) {
//          const currentTime = videoRef.current?.currentTime || 0;
//          ws?.send(JSON.stringify({ type: "PAUSE", currentTime }));
//       }
//    }

//    function handleSendMessage() {
//       if (isPartyText !== "true") return;
//       const text = textInputRef.current?.value;

//       if (!text) return;

//       const message = {
//          type: 'CHAT_MESSAGE',
//          name: Cookies.get('username'),
//          content: text,
//          timestamp: videoRef.current?.currentTime || 0
//       };
//       setMessages((prevMessages) => [...prevMessages, message]);
//       ws?.send(JSON.stringify(message));
//       textInputRef.current.value = "";
      
//       if (isIntersecting) {
//          scrollerRef.current.scrollIntoView({ behavior: "smooth" });
//       }
      
//    }

//    function handleSeek() {
//       if (isPartyText !== "true") return;
//       if (!isUpdating.current && ws) {
//          isSeeking.current = true;
//          videoRef.current.currentTime = seekTime;
//          videoRef.current.play();
//          ws.send(JSON.stringify({ type: 'SEEK', currentTime: seekTime }));
//          setTimeout(() => {
//             isSeeking.current = false;
//          }, 300);
//       }
//    }


//    return <div className="overflow-hidden md:w-[60%] h-[100svh]">
//       <main>
//          <video
//             ref={videoRef}
//             width="100%"
//             controls
//             onPlay={handlePlay}
//             onPause={handlePause}
//             // onClick={(e) => {
//             //    const rect = e.currentTarget.getBoundingClientRect();
//             //    const offsetX = e.clientX - rect.left;
//             //    const width = rect.width;
//             //    const seekTime = (offsetX / width) * videoRef.current.duration;
//             //    handleSeek(seekTime);
//             // }}
//             muted
//          >
//             <source src={`${SERVER_URL}${videoId}.mp4`} type="video/mp4" />
//             Your browser does not support the video tag.
//          </video>
//       </main>
//       <div className="relative h-[60%] md:h-[100%]">
//       <div className="relative h-full">
//          <section className="py-3 px-5">
//             <h2 className="mb-3 text-xl">{title}</h2>
//             <div className={`grid ${/* userId === uploadedUserId */ false ? 'grid-cols-2' : 'grid-cols-1'} justify-around align-middle`}>
//                {isPartyText !== "true" /* && userId === uploadedUserId */ && <Link href={`edit?videoId=${videoId}`} className="w-fit mx-auto">
//                   <center><Image src="/icons/edit.png" alt="edit icon" width={35} height={35} className="mb-1" /></center>
//                   Edit
//                </Link>}
//                {isPartyText !== "true" ? <button className="w-fit mx-auto" > {/* only if it's not a watch party */}
//                   <center><Image src="/icons/live.png" alt="edit icon" width={35} height={35} className="mb-1" /></center>
//                   Create Watch Party
//                </button>
//                : <button className="w-fit mx-auto" onClick={(e) => setIsChatOn(true)}> {/* only if it's a watch party */}
//                   <center><Image src="/icons/chat.png" alt="edit icon" width={35} height={35} className="mb-1" /></center>
//                   Live Chat
//                </button>}
//             </div>
//             <p className="text-lg mt-5 mb-2">Description</p>
//             <p className="">{description}</p>
//          </section>
//          <section className={`no-scrollbar px-5 md:fixed absolute left-0 right-0 transition-all ${isPartyText === "true" && isChatOn ? "top-0 bottom-0 h-full" : "top-[100%] bottom-0 h-0"} md:left-[60%] md:right-0`}>
//             <div className="no-scrollbar overflow-y-scroll h-[80%] bg-blue-300" ref={scrollerRef}>
//                {messages.map((message, i) =>
//                   <MessageComponent
//                      key={i}
//                      message={message.content}
//                      username={message.name}
//                   />)}
//                <div className="w-full h-3" ref={bottomDivRef} />
//             </div>
//             <div className=" h-10" />
//             <div className={`w-full opacity-0 bg-white ${isPartyText === "true" && isChatOn ? "fixed bottom-0 opacity-100" : ""}`}>
//                <div className="mb-5 grid grid-cols-[50%_35%] md:grid-cols-1 align-middle justify-center">
//                   <input
//                      ref={textInputRef}
//                      type="text"
//                      name="message"
//                      id="message"
//                      className="w-full md:w-[35%] md:my-2 px-2 py-1 mr-3 border-[1px] rounded-md border-gray-300 focus:border-gray-500 active:border-gray-500 focus:outline-none active:outline-none"
//                   />
//                   <div className="ml-5 h-full">
//                      <button className="mr-3 px-2 h-full rounded-md w-fit bg-indigo-500" onClick={handleSendMessage}>Send</button>
//                      <button className="px-2 md:py-1 h-full rounded-md w-fit bg-red-500" onClick={(e) => setIsChatOn(false)}>Close</button>
//                   </div>
//                </div>
//             </div>
//          </section>
//          </div>
//          </div>
         
//    </div>;
// }

// export default VideoPage;




"use client";
import Image from "next/image";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import '../../../app/globals.css'

import MessageComponent from "@/components/message";
function VideoPage() {
   const SERVER_URL = "/";
   const videoId = useParams().id;
   const searchParams = useSearchParams();

   const isPartyText = searchParams.get("party");

   const videoRef = useRef(null);
   const [ws, setWs] = useState(null);
   const isUpdating = useRef(false);
   const isSeeking = useRef(false); // Define isSeeking ref

   const [title, setTitle] = useState("Title");
   const [description, setDescription] = useState("Description");

   const [isChatOn, setIsChatOn] = useState(false);

   const [chatMessages, setChatMessages] = useState([]); // State to store chat messages
   const [newMessage, setNewMessage] = useState(''); // State for the new message input

   

   useEffect(() => {
      const chatMessages = JSON.parse(localStorage.getItem('localMessages'));
   if (chatMessages) {
    setChatMessages(chatMessages);
   }
    }, []);

   useEffect(() => {
      const websocket = new WebSocket('ws://localhost:3000');
      setWs(websocket);

      websocket.onopen = () => {
         websocket.send(JSON.stringify({ type: 'JOIN', streamId: videoId }));
      };

      websocket.onmessage = (event) => {
         isUpdating.current = true;
         const data = JSON.parse(event.data);

         switch (data.type) {
            case 'PLAY':
               videoRef.current.currentTime = data.currentTime;
               videoRef.current.play();
               break;
            case 'PAUSE':
               videoRef.current.currentTime = data.currentTime;
               videoRef.current.pause();
               break;
            case 'SEEK':
               if (!isSeeking.current) {
                  videoRef.current.currentTime = data.currentTime;
                  videoRef.current.play();
               }
               break;
            case 'CHAT_MESSAGE':
               // Add the incoming chat message to the chatMessages state
               setChatMessages((prevMessages) => [...prevMessages, data]);
               break;
            default:
               console.log("Received unknown message type:", data.type);
         }
         setTimeout(() => isUpdating.current = false, 300);
         
      };

      return () => {
         websocket.close();
      };
   }, []);

   const handlePlay = () => {
      if (!isUpdating.current) {
         const currentTime = videoRef.current?.currentTime || 0;
         ws?.send(JSON.stringify({ type: 'PLAY', currentTime }));
      }
   };

   const handlePause = () => {
      if (!isUpdating.current) {
         const currentTime = videoRef.current?.currentTime || 0;
         ws?.send(JSON.stringify({ type: 'PAUSE', currentTime }));
      }
   };

   const handleSeek = (seekTime) => {
      if (!isUpdating.current && ws) {
         isSeeking.current = true;
         videoRef.current.currentTime = seekTime;
         videoRef.current.play();
         ws.send(JSON.stringify({ type: 'SEEK', currentTime: seekTime }));
         setTimeout(() => {
            isSeeking.current = false;
         }, 300);
      }
   };
   const sendChatMessage = () => {
      const message = {
         type: 'CHAT_MESSAGE',
         name:localStorage.getItem('username'),
         content: newMessage,
         timestamp: videoRef.current?.currentTime || 0
      };
      setChatMessages((prevMessages) => [...prevMessages, message]);
      ws?.send(JSON.stringify(message));
      setNewMessage(''); // Clear the message input after sending
      localStorage.setItem('localMessages', JSON.stringify(chatMessages));
   };

   // function handleSendMessage() {
      //       if (isPartyText !== "true") return;
      //       const text = textInputRef.current?.value;
      
      //       if (!text) return;
      
      //       const message = {
      //          type: 'CHAT_MESSAGE',
      //          name: Cookies.get('username'),
      //          content: text,
      //          timestamp: videoRef.current?.currentTime || 0
      //       };
      //       setMessages((prevMessages) => [...prevMessages, message]);
      //       ws?.send(JSON.stringify(message));
      //       textInputRef.current.value = "";
            
      //       if (isIntersecting) {
      //          scrollerRef.current.scrollIntoView({ behavior: "smooth" });
      //       }
            
         // }
   return (
      <div className="overflow-hidden h-[100svh]">
         <main className="md:w-[60%]">
            <video
               ref={videoRef}
               width="100%"
               controls
               onPlay={handlePlay}
               onPause={handlePause}
               onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const offsetX = e.clientX - rect.left;
                  const width = rect.width;
                  const seekTime = (offsetX / width) * videoRef.current.duration;
                  handleSeek(seekTime);
               }}
               muted
            >
               <source src={`http://localhost:3000/api/streams/${videoId}`} type="video/mp4" />
               Your browser does not support the video tag.
            </video>
         </main>
         <section className={`no-scrollbar px-5 md:fixed absolute left-0 right-0 transition-all "top-[100%] bottom-0 h-0"} md:left-[60%] md:right-0`}>
             <div className="no-scrollbar overflow-y-scroll h-[80%] bg-blue-300">
                {chatMessages.map((message, i) =>
                  <MessageComponent
                     key={i}
                     message={message.content}
                     username={message.username}
                  />)}
               <div className="w-full h-3" />
            </div>
            <div className=" h-10" />
            <div className={`w-full  bg-white `}>
               <div className="mb-5 grid grid-cols-[50%_35%] md:grid-cols-1 align-middle justify-center">
                  <input
                     type="text"
                     value={newMessage}
                     name="message"
                     id="message"
                     placeholder="Type a message..."
                     onChange={(e) => setNewMessage(e.target.value)}
                     // className="w-full md:w-[35%] md:my-2 px-2 py-1 mr-3 border-[1px] rounded-md border-gray-300 focus:border-gray-500 active:border-gray-500 focus:outline-none active:outline-none"
                  />
                  <div className="ml-5 h-full">
                     <button className="mr-3 px-2 h-full rounded-md w-fit bg-indigo-500" onClick={sendChatMessage}>Send</button>
                     <button className="px-2 md:py-1 h-full rounded-md w-fit bg-red-500" onClick={(e) => setIsChatOn(false)}>Close</button>
                  </div>
               </div>
            </div>
         </section>
         {/* <div className="chat-container">
                <div className="chat-messages">
                    {chatMessages.map((msg, index) => (
                        <div key={index} className="chat-message">
                            <span className="chat-timestamp">[{msg.timestamp.toFixed(2)}]</span>
                            <span className="chat-content">{msg.content}</span>
                        </div>
                    ))}
                </div>
                <input
                    type="text"
                    value={newMessage}
                     placeholder="Type a message..."
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <button onClick={sendChatMessage}>Send</button>
            </div>*/}
      </div> 
   );
}

export default VideoPage;
