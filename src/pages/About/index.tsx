import { Link } from 'react-router-dom';

export const About = () => {
  return (
    <div>
      <h1>About</h1>
      <Link to='/requests'>Go back to Request</Link>
    </div>
  );
};
