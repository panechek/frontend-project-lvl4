import { Button, Navbar as NavbarBootstrap } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import useAuth from '../hooks/index.jsx';

const Navbar = () => {
  const { t } = useTranslation();

  const AuthOutButton = () => {
    const auth = useAuth();
    return (
      auth.loggedIn && <Button type="button" onClick={auth.logOut}>{t('navbar.goOut')}</Button>
    );
  };

  return (
      <NavbarBootstrap expand="lg" className="shadow-sm bg-white">
        <div className='container'>
        <NavbarBootstrap.Brand href='/'>{t('navbar.logo')}</NavbarBootstrap.Brand>
        <AuthOutButton />
        </div>
      </NavbarBootstrap>
  );
};

export default Navbar;
