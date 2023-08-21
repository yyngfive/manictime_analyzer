import githubLogo from '../../public/images/github.svg'
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {

    return (
        <footer className=" bottom-0 left-0 footer items-center p-4 bg-neutral text-neutral-content">
            <div className="items-center grid-flow-col">
                
                <p>ManicTime Analyzer</p>
            </div>
            <div className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
                <Link href='https://github.com/yyngfive' target='_blank'><Image src={githubLogo} className='h-6 w-6' alt='Github'/>
                </Link>

            </div>
        </footer>
    );
}