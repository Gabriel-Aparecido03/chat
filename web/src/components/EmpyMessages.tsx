import emptyRoomImg from '../assets/img/empty-room.svg'

export function EmptyMessages() {
  return (
    <div className='flex flex-col justify-center items-center h-full mt-10'>
        <img src={emptyRoomImg} alt="imagem de sala vazia" />
        <p className='mt-5 font-bold text-lg text-center'>Without message</p>
        <span className='text-center text-gray-500 text-sm font-semibold'>You can be the first to send message here.</span>
    </div>
  )
}