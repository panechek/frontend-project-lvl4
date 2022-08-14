import { Button, Navbar as NavbarBootstrap } from 'react-bootstrap';
import useAuth from '../hooks/index.jsx';

const AuthOutButton = () => {
  const auth = useAuth();

  return (
    auth.loggedIn && <Button type="button" className="btn btn-primary" onClick={auth.logOut}>Выйти</Button>
  );
};

const Navbar = () => (
      <NavbarBootstrap expand="lg" className="shadow-sm bg-light">
        <div className='container'>
        <NavbarBootstrap.Brand>Pan Chat</NavbarBootstrap.Brand>
        <AuthOutButton />
        </div>
      </NavbarBootstrap>
);

export default Navbar;
