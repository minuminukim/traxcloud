import Alert from './Alert';
import './Alert.css';

const AlertList = ({ messages, isError = true }) => {
  return (
    messages.length > 0 && (
      <ul className="alert-list">
        {messages.map((message) => (
          <Alert key={message} message={message} isError={isError} />
        ))}
      </ul>
    )
  );
};

export default AlertList;
