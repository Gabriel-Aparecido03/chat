interface TitleHeader {
  roomName?:string
  questionsCount?:string
}

export function TitleHeader({roomName,questionsCount}:TitleHeader) {
  return (
    <header className='flex gap-5 items-center'>
        <h2 className='font-bold text-black text-2xl capitalize'>Sala {roomName}</h2>
        <span className='bg-pink-500 p-1 px-4 rounded-full text-white font-semibold'>
          {questionsCount ? questionsCount !== '1' ? `${questionsCount} questions` : `${questionsCount} question` : 'empty messages'}
        </span>
    </header>
  )
}