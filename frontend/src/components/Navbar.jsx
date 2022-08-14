import { Navbar as NavbarBootstrap } from 'react-bootstrap';

const Navbar = () => (
      <NavbarBootstrap expand="lg" className="shadow-sm bg-light">
        <div className='container'>
        <NavbarBootstrap.Brand>Pan Chat</NavbarBootstrap.Brand>
        </div>
      </NavbarBootstrap>
);

export default Navbar;
