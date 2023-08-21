
import Link from "next/link";

export default function About() {
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-5xl font-bold">Hello</h1>
                    <p className="py-6">

                        This is a unofficial dashboard website for <Link href="https://www.manictime.com/" className="bg-primary-content">ManicTime</Link>(a time tracker software). You can import your data and analyze them online.

                        This is also a practice project for my full-stack development, using <Link href="https://nextjs.org/" className="bg-primary-content">Next.js</Link> as the front-end, <Link href="https://daisyui.com/" className="bg-primary-content">daisyUI</Link> for UI, <Link href="https://fastapi.tiangolo.com/" className="bg-primary-content">FastAPI</Link> as the back-end, and <Link href="https://www.mongodb.com/" className="bg-primary-content">MongoDB</Link> as the database.
                    </p>
                    <div className="join">
                    <button className="btn btn-outline join-item"><Link href="/">Get Started</Link></button>
                    <button className="btn btn-neutral join-item"><Link href="/doc">Read Docs</Link></button>
                    </div>
                </div>
            </div>
        </div>
    );
}