import Search from '../components/ui/Search';

import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <div className="container mx-auto flex">
        <div className="logo">
          <Link to={'/'}>
            <img src={logo} className="h-16" alt="" />
          </Link>
        </div>

        <Search className="max-w-[400px] w-full ml-auto" placeholder="Найти игру" />
      </div>
    </header>
  );
}

export default Header;
