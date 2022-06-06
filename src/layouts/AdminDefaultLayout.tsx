import Header from './header';
import Footer from './footer/AdminDefaultFooter';
import { Outlet } from 'react-router';
import { LayoutDefaultProps } from '@types';

export default function DefaultLayoutAdmin({children}:LayoutDefaultProps) {
  return (
    <div>
      <Header/>
        <main>
          {children || <Outlet/>}
        </main>
      <Footer/>
    </div>
  );
}