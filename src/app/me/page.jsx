import Image from "next/image";
import albumLogo from '../../../public/images/Of_Monsters_and_Men_-_Fever_Dream.png';


export default function Me() {
    return (
        <div className="avatar">
            <div className="w-60 rounded">
                <Image 
                src={albumLogo}
                alt=""
              />
            </div>
        </div>
    );
}