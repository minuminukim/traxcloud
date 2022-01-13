import { BiSearchAlt } from 'react-icons/bi';
import Button from '../common/Button';
import './PageNotFound.css';

export const PageNotFound = () => {
  return (
    <div className="page-container error-page">
      <div className="error-icon">
        <BiSearchAlt className="error-icon-large" />
      </div>
      <div className="error-page bottom">
        <h1 className="heading-error heading-large">
          We can't find that resource.
        </h1>
        <h2 className="heading-caption">
          A report has been sent to our tech team, and they're looking into the
          problem. Please check back in a bit.
        </h2>
      </div>
    </div>
  );
};
