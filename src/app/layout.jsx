import './globals.css';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Manictime Analyzer',
  description: '',
}
const navLinks = [{ href: '/', name: 'Home' },
                 {href:'/doc',name:'Doc'},
                 {href:'/about',name:'About'},];

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
        <NavBar navLinks={navLinks}/>
        <div className="flex flex-row">

          {children}

        </div>

        <Footer/>
      </body>
    </html>
  );
}
