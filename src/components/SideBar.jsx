import Link from "next/link";

export default function SideBar({menu}) {

    return (
        <ul className=" pt-10 menu p-4 h-full bg-base-100 shadow-md rounded-xl text-base-content w-full">

            {menu.map((e,i)=>[
                <li key={i}><Link href={`#${e.id}`}>{e.name}</Link></li>
            ])}

        </ul>
    );
}