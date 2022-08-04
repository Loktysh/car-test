import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import NotFoundPage from '../NotFoundPage';
import './Header.scss';

const Header = () => {
  return (
    <header>
      <div className='header'>
        <nav>
          <button className='header__link'>
            <Link to='/profile'>Profile</Link>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
