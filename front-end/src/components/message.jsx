function MessageComponent({username, message}) {
   return <div className="max-w-[75%] my-3 px-4 py-2 rounded-md bg-gray-300">
      <p className="mb-2 text-indigo-500">{username}</p>
      <p>{message}</p>
   </div>;
}

export default MessageComponent;