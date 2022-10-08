import { Button, Navbar as NavbarBootstrap } from 'react-bootstrap';
import useAuth from '../hooks/index.jsx';

const AuthOutButton = () => {
  const auth = useAuth();

  return (
    auth.loggedIn && <Button type="button" onClick={auth.logOut}>Выйти</Button>
  );
};

const Navbar = () => (
      <NavbarBootstrap expand="lg" className="shadow-sm bg-white">
        <div className='container'>
        <NavbarBootstrap.Brand href='/'>Pan Chat</NavbarBootstrap.Brand>
        <AuthOutButton />
        </div>
      </NavbarBootstrap>
);

export default Navbar;
