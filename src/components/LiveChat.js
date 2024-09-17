const LiveChat = ({ name, message }) => {
    return (
      <div className="flex shadow-lg bg-gray-200 m-2 rounded-lg">
        <img
          className="h-8 cursor-pointer rounded-lg m-2"
          src="https://static.vecteezy.com/system/resources/previews/004/607/791/non_2x/man-face-emotive-icon-smiling-male-character-in-blue-shirt-flat-illustration-isolated-on-white-happy-human-psychological-portrait-positive-emotions-user-avatar-for-app-web-design-vector.jpg"
          alt="user-icon"
        />
        <h3 className="p-2 font-bold">{name}</h3>
        <p className="p-2">{message}</p>
      </div>
    );
  };
  
  export default LiveChat;