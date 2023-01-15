import { HeartStraight, UserCircle } from "phosphor-react";
import { Message } from "./Message";
import { Socket } from "socket.io-client";
import { useEffect, useState } from "react";
import { EmptyMessages } from "./EmpyMessages";

interface MessageProps {
    content :  string
    _id : string
    date : Date
    userId : string
    userName : string
    like : { count:number , id :string }
}

interface FeedProps {
    messageList : any
    handleInteraction : (messageId : string,isLiked : boolean)=> void
    id? : string
}

export function Feed({messageList,handleInteraction,id}:FeedProps) {
    
    return ( 
        <div className='h-full mb-10 max-h-[400px] overflow-y-scroll'>
            { 
                (messageList?.length > 0) ?
                messageList?.map((item:any)=>(
                    <Message 
                        key={item._id}
                        userId={id}
                        content={item.content}
                        date={item.date} 
                        userName={item.userName} 
                        like={item.like}
                        id={item._id}
                        handleInteraction={handleInteraction}
                    />
                )):
                <EmptyMessages />
            }
        </div>
    )
}