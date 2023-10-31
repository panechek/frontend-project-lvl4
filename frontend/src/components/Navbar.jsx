import { Button, Navbar as NavbarBootstrap } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { useAuth } from '../contexts/AuthContext.jsx';

const AuthOutButton = () => {
  const auth = useAuth();
  const { t } = useTranslation();

  return (
    auth.loggedIn && <Button type="button" onClick={auth.logOut}>{t('navbar.goOut')}</Button>
  );
};

const Navbar = () => {
  const { t } = useTranslation();
  return (
    <NavbarBootstrap expand="lg" className="shadow-sm bg-white">
      <div className="container">
        <NavbarBootstrap.Brand href="/">
          {t('navbar.logo')}
        </NavbarBootstrap.Brand>
        <AuthOutButton />
      </div>
    </NavbarBootstrap>
  );
};

export default Navbar;
