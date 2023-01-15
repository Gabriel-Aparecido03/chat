import { Copy } from 'phosphor-react'
import logoimg from '../assets/img/logo.svg'

interface propsHeader {
    roomName? : string
}

export function Header({roomName}:propsHeader) {
    return(
        <header 
            className='w-full bg-gray-200 border-b-[1px] border-b-gray-400 flex justify-between h-[10vh]'>
            <img src={logoimg} alt="imagem do logo letmeask" className='w-[8%]' />
            <div className='flex gap-6 items-center pr-10'>
                <button className='border-red-500 bg-red-500 border-spacing-1 border-2 rounded-md text-white flex font-bold text-sm justify-between items-center p-2 w-24'>
                    <span className='text-center w-full'>Get out</span>
                </button>
            </div>
        </header>
    )
}