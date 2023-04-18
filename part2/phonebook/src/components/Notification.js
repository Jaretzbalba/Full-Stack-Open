const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  let className = `notification ${message.type}`;
  console.log(className);
  return <div className={className}>{message.text}</div>;
};

export default Notification;
