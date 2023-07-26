import { Link } from 'react-router-dom';

export const Landing = () => {
  return (
    <div>
      <h1>Landing Page</h1>
      <Link to='/requests'>Go to Requests</Link>
    </div>
  );
};
