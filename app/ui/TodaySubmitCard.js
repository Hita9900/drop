import Link from "next/link";
import TodaySubmits from "../actions/TodaySubmits";
import Image from 'next/image';

export default async function TodaySubmitCard() {
    const allsongs = await TodaySubmits();
    const songs = allsongs.slice(0, 5);

    return (

        <div className="flex">
            {songs.map((song, index) => (
                <div key={index} style={{ marginBottom: '8px' }}>
                    <Image src={song.cover_art} width={100} height={100} alt={song.title + " by " + song.artist}></Image>

                </div>
            ))}
            <Link href={"/vote"}>
            <div style={{ backgroundColor: 'green', height: '100px', width: '100px' }}>
                see more etc
            </div>
            </Link>
        </div>
    );
}