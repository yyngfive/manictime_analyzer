
import Link from 'next/link';
import Image from "next/image";
import avatarMe from '../../public/images/Of_Monsters_and_Men_-_Fever_Dream.png';

export default function NavBar({ navLinks }) {
    return (
        <div className="navbar bg-base-100 sticky top-0 z-50">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </label>
                    <ul tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-lg">
                        {navLinks.map((navLink) => (
                            <li key={navLink.name}><Link href={navLink.href}>{navLink.name}</Link></li>
                        ))}
                    </ul>
                </div>
                <a className="btn btn-ghost normal-case text-xl">ManicTime Analyzer</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 text-lg">
                    {navLinks.map((navLink) => (
                        <li key={navLink.name}><Link href={navLink.href}>{navLink.name}</Link></li>
                    ))}
                </ul>
            </div>
            <div className="navbar-end">
                <div class="avatar mx-3">
                    <div class="w-10 rounded-full">
                        <Link href='/me'>
                        <Image src={avatarMe} alt='Me'/>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}