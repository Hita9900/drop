import { CornerRightDown } from "lucide-react";
import Link from "next/link";

export function ButtonStandard({title, icon, address}) {
    return(
       <a href={address}>
      <button className="button">
        {icon && <i className="demo-icon">{icon}</i>}
        {icon && <>&nbsp;</>}
        {title}
      </button>
    </a>
    );
}

export function ButtonMinimal({title, address}){
  return(
    <Link href={address}>
   <button className="bg-primary-accent h-10 px-4 text-primary-dark rounded-full">
     <p className="flex items-center">{title}&nbsp;<CornerRightDown size={16}/></p>
   </button>
 </Link>
 );
}

