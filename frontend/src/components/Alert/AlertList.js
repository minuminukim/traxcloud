import Alert from './Alert';
import './Alert.css';

const AlertList = ({ messages }) => {
  return (
    messages &&
    messages.length > 0 && (
      <ul className="alert-list">
        {messages.map((message) => (
          <Alert key={message} message={message} />
        ))}
      </ul>
    )
  );
};

export default AlertList;
