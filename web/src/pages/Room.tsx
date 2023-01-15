import { useEffect, useRef, useState } from 'react'
import { Feed } from '../components/Feed'
import { PopUp } from '../components/PopUp'
import { Header } from '../components/Header'
import { TitleHeader } from '../components/TitleHeader'
import { useParams } from 'react-router-dom'
import { socket } from '../services/socket'

export function Room() {
    const { nameRoom } = useParams()

    const [name,setName] = useState<string>('')
    const [textName,setTextName] = useState<string>('')
    const [showPopUp,setShowPopUp] = useState<boolean>(true)
    const [errName,setErrName] = useState<boolean>(false)
    const [message,setMessage] = useState<string>('')
    
    const [lastMessage,setLastMessage] = useState<string>()
    const [lastLike,setLastLike] = useState<any>()
    const [lastDeslike,setLastDeslike] = useState<any>('')
   
    const [id,setId] = useState<string | undefined>()

    const [messagesDelivered,setMessagesDelivered] = useState<any>()

    useEffect(() => {
        return ()=>{
            socket.emit("user-connected-room",nameRoom)
            socket.once("user-getting-all-messages",(datas)=>{
                setMessagesDelivered(datas)
            })
        }
    },[])

    useEffect(()=>{
        return ()=>{
            socket.on("user-last-message",async (datas)=>{
                setMessagesDelivered((prevState:any) => [...prevState, datas]);
            })
        }
    },[socket])

    useEffect(()=>{
        return ()=>{
            socket.on("user-get-last-like",async (datas)=>{
                setLastLike(datas)
            })
        }
    },[socket])

    useEffect(()=>{
        if(lastLike) {
            const copy = [...messagesDelivered]
            copy.map((item:any,index:any)=>{
                if(item._id == lastLike._id) {
                    copy[index] = lastLike
                }
            })

            setMessagesDelivered(copy)
        }
    },[lastLike])

    useEffect(()=>{
        return ()=>{
            socket.on("user-get-last-deslike",async (datas)=>{
                setLastDeslike(datas)
            })
        }
    },[socket])

    useEffect(()=>{
        if(lastDeslike) {
            const copy = [...messagesDelivered]
            copy.map((item:any,index:any)=>{
                if(item._id == lastDeslike._id) {
                    copy[index] = lastDeslike
                }
            })
            setMessagesDelivered(copy)
        }
    },[lastDeslike])

    function handleClosePopUp() {
        setShowPopUp(false)
    }

    function handleConfirmName() {
        if(!textName) return false
        if(textName.length === 0) {
            setErrName(true)
        }
        else {
            setName(textName)
            setErrName(false)
            setShowPopUp(false)
        }
    }

    function handleInteractionMessage(messageId:string,isLiked:boolean) {
        if(!isLiked) {
            socket.emit("user-like-message",{messageId})
        }
        else {
            socket.emit("user-deslike-message",{messageId})
        }
    }
    return (
        <>
            <PopUp 
                onClose={handleClosePopUp} 
                open={showPopUp} 
            >
                <div className='flex flex-col gap-7'>
                    <h1 className='text-center text-2xl text-gray-800'>Insert your name</h1>
                    <span className='text-center text-lg text-slate-400'>You can't send message without your name.</span>
                    <textarea 
                        className='border-purple-300 border rounded-md p-4 resize-none text-gray-900 placeholder:text-gray-400 focus:outline-purple-300 '
                        placeholder='Type your name here'
                        onChange={e => setTextName(e.target.value)}
                    />
                    <button 
                        className={`bg-purple-500 w-1/2 mx-auto rounded-full p-2 px-4 text-white font-bold text-sm ${name ? 'hover:bg-purple-300':'hover:disabled'}`}
                        onClick={()=>{
                            console.log('..')
                            if(textName.length > 0 ) {
                                setShowPopUp(false)
                                setName(textName)
                            }
                        }}>
                    Confirm your name
                    </button>
                </div>
            </PopUp>
            <div className="flex flex-col min-h-screen bg-gray-200 justify-start">
                <Header roomName={nameRoom?.toString()}/>
                <main className='flex flex-col h-[90vh] w-2/3 mx-auto justify-between items-stretch'>
                    <div className='h-[600px]'>
                        <div className='mt-10 flex flex-col gap-5'>
                            <TitleHeader roomName={nameRoom} questionsCount={messagesDelivered?.length}/>
                        </div>
                        <div className=''>
                            <Feed 
                                messageList={messagesDelivered} 
                                handleInteraction={handleInteractionMessage}
                                id={socket.id}
                            />
                            
                        </div>
                    </div>
                    <div className='h-[120px] flex flex-col items-end w-full justify-end mb-5 gap-2'>
                        <p 
                            className='text-gray-500 font-semibold text-sm w-full'
                        >
                            {!name ? 
                            <> To send message,<span className='text-purple-500 cursor-pointer' onClick={()=>{setShowPopUp(true)}}>insert yout name here.</span></>
                            :
                            <p>Type your message</p>
                        }
                        </p>
                        <div className="flex bg-white p-4 items-stretch w-full">
                            <input 
                                value={message}
                                className='w-full border-none rounded-md resize-none outline-none' 
                                onChange={e => setMessage(e.target.value)}
                            />
                            <button 
                                className={`${name ? 'bg-purple-500 ' : 'bg-purple-200 ' } rounded-md w-1/5 py-2 text-white font-bold text-sm ${name ? 'hover:bg-purple-300':'hover:disabled'}`}
                                onClick={()=>{
                                if(message.length > 0 ) {
                                    
                                    socket.emit("user-send-message",{content : message , userName : name})
                                    setMessage('')
                                }
                                }}>
                            Send message
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}