import { HeartStraight, UserCircle } from "phosphor-react";
import { LikeMessage } from "./LikeMessage";

interface MessageComponentProps {
    id:string
    userName:string
    content : string
    date :Date
    userId:any
    like : { count:number , likeUsers :string }
    handleInteraction : (messageId : string,isLiked : boolean)=> void
}

export function Message({id,userName,userId,like,content,handleInteraction}:MessageComponentProps) {
    return (
        <div className='flex gap-5 mt-5'>
            <div className='flex flex-col w-full shadow-sm p-4 rounded-md bg-white justify-between min-h-[8rem]'>
                <div>
                    <p className='font-normal text-gray-600'>
                        {content}
                    </p>
                </div>
                <div className='flex justify-between'>
                    <div className='flex gap-2 items-center'>
                        <span><UserCircle size={22} weight="bold" /></span><p className='text-gray-400'>{userName}</p>
                    </div>
                    <LikeMessage 
                        isLiked={like.likeUsers.includes(userId)}
                        count={like.count}
                        messageId={id}
                        handleInteraction={handleInteraction}
                    />
                </div>
            </div>
        </div>
    )
}