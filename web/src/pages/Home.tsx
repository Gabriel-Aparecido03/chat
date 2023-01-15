import { redirect } from 'react-router-dom'
import background from '../assets/img/background-home.svg'
import logo from  '../assets/img/logo.svg'
import { io } from 'socket.io-client'


export function Home() {
    const handleRedirect = (roomName:string) => {
        document.location.href = `/room/${roomName}`
    }
    
    return (
        <div className="justify-center flex flex-row items-center min-h-screen font-poppins">
            <aside className='w-6/12 bg-gray-900 h-screen'>
                <div className='flex h-full justify-center items-center flex-col w-5/6 m-auto'>
                    <h3 className='text-white w-11/12 text-4xl font-bold mt-10 text-center'>Project develop with react and websocket</h3>
                    <p className='text-white w-11/12 mt-4 font-thin text-md text-center'>Insipired on Letmeask by rocketseat</p>
                </div>
            </aside>
            <main className='w-6/12 h-screen bg-gray-100'>
                <div className='h-5/6 flex flex-col m-auto justify-between text-center'>
                    <img src={logo} className='w-1/2 m-auto text-center'/>
                    <span className='text-gray mb-10'>Choosing the rooms below</span>
                    <div className='flex flex-col gap-2 justify-center items-center'>
                        <button 
                            onClick={()=>{handleRedirect('react')}}
                            className='bg-purple-500 w-1/3 rounded-md p-2 text-white text-sm hover:bg-purple-300'
                        >React</button >
                        <button className='bg-purple-500 w-1/3 rounded-md p-2 text-white text-sm hover:bg-purple-300'>Css</button>
                        <button className='bg-purple-500 w-1/3 rounded-md p-2 text-white text-sm hover:bg-purple-300'>Html</button>
                    </div>
                </div>
            </main>
        </div>
    )
}