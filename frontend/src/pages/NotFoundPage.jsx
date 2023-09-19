import React from 'react';
import { Link } from 'react-router-dom';
import pageErrorImg from '../assets/page_error.svg';

export default function NotFoundPage() {
  return (
    <div className='text-center'>
        <img src={pageErrorImg} alt="Страница не найдена" className='img-fluid h-25'/>
        <h1 className='h4 text-muted'>Страница не найдена</h1>
        <p className='text-muted'>Но вы можете перейти <Link to='/'>на главную страницу</Link></p>
    </div>
  );
}
