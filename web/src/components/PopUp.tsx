import { X } from "phosphor-react"
import { ReactNode } from "react"

interface typePropsPopUp {
    children : ReactNode
    onClose : any // bug
    open: boolean
    showButtonClose? : boolean
}

export function PopUp({children,onClose,open,showButtonClose}:typePropsPopUp) {
    return (
        open ?
        <div className="absolute h-screen w-screen bg-black bg-opacity-80 flex items-center justify-center">
            <div className="w-1/2 bg-white m-auto rounded-sm flex-col gap-2 p-10">
                { showButtonClose && 
                <header>
                    <button onClick={onClose} ><X/></button>
                </header>}
                <div>
                    {children}
                </div>
            </div>
        </div>:
        <></>
    )
}