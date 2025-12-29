import Link from "next/link";
import TodaySubmits from "../actions/TodaySubmits";
import { ButtonMinimal } from "./Buttons";

export default async function TodaySubmitCard() {
    const allsongs = await TodaySubmits();
    const songs = allsongs.slice(0, 5);
    
    if (allsongs.length <= 0 ){
        
        return(
            <div className="flex flex-col text-center">
            <p className="text-small opacity-60 mt-8">the list updates every 15 minutes</p>
            <p className="mb-2">Be the first to submit a song!</p>
            <span className="self-center flex">
            <ButtonMinimal title='Submit' address='/submit'/>
            </span>
            </div>
        );
    }

    return (


            <div className="max-w-xl mx-auto grid grid-cols-3 gap-3 sm:gap-4 md:gap-6">
            

            { songs.map((song, index) => (
                <div key={index} className={'aspect-square rounded-[10px]'} style={{backgroundImage: "url(" + song.cover_art + ")", backgroundSize: '100%', backgroundRepeat: 'no-repeat'}} >
                    
                    

                </div>
            ))}
            <Link href={"/vote"}>
            <div className='bg-primary-accent text-primary-dark aspect-square rounded-[10px] overlflow-hidden p-3' style={{backgroundImage: "url(./images/voteLinkImage.svg)", backgroundSize: '100%', backgroundRepeat: 'no-repeat'}}>
                <p className="small-text">See all & Vote</p>
            </div>
            </Link>
        </div>
    );
}