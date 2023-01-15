import { HeartStraight } from "phosphor-react";
import { useState } from "react";

interface likeMessage {
  count : number
  messageId : string
  isLiked:boolean
  handleInteraction : (messageId : string,isLiked : boolean)=> void
}

export function LikeMessage({count,messageId,handleInteraction,isLiked}:likeMessage) {

  return (
    <div className='flex gap-2 items-center'>
        <p className='text-gray-600'>{count}</p>
        <span onClick={()=>{
          handleInteraction(messageId,isLiked)
        }}>
          {!isLiked ? <HeartStraight size={22} weight="bold" color='#6F4BD8' className="cursor-pointer"/> : <HeartStraight size={22} weight="fill" color='#6F4BD8' className="cursor-pointer"/>}
        </span>
    </div>
  )
}