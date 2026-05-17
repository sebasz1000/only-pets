"use client"
import { ViewType } from "@/types"
import { ArrowLeft, Image, SquarePlay, X, ZoomIn } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import React, { useState, useEffect, useRef, useCallback} from "react"
function CreatePostModal(){

    const boxRef = useRef<HTMLDivElement | null>(null)
    const inputFileRef = useRef<HTMLInputElement | null>(null)
    const router = useRouter()
    const pathName = usePathname()
    const [step, setStep] = useState(1)
    const [imageFile, setImageFile] = useState<File | null>(null)
    const zoomValueRef = useRef("")
    
    //disables scrolling on modal load
    useEffect(() => {
        document.body.classList.add("overflow-hidden") 
        return () => document.body.classList.remove("overflow-hidden")
    },[])

    //checks clicks outside the modal to close it
    useEffect(() => {
        const handleClickOutside = (e : MouseEvent) => {
            if(boxRef.current && !boxRef.current.contains(e.target as Node)){
                handleClosePostModal(0)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)

        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [router])

    //Takes to step #2 once we get an imageFile uploaded
    useEffect(() => {
        if(!imageFile) return
        setStep(2)
        
    }, [imageFile])

  
    const handleFileUpload = (e: React.MouseEvent<HTMLButtonElement>) => {
        if(inputFileRef.current) inputFileRef.current.click()
    }

    const handleInputFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileList: FileList | null = e.target.files
        if(fileList && fileList?.length > 0){
            setImageFile(fileList[0])
        }
    }

    const handleZoomValue = (zoomValue: string) => {
        zoomValueRef.current = zoomValue
    }

    const handleClosePostModal = ( delay = 0 ) => {
      setTimeout(() => {
          router.push(pathName, { scroll: false})
      }, delay)
     
    }

    const getStepView = useCallback( (step: number) : ViewType => {
        let view: ViewType | null = null
        if(step === 1){
            view = { 
                title : "Create new post", 
                node: <UploadMediaStep onFileUpload={handleFileUpload}
                             onInputFileChange={handleInputFileChange}
                             inputFileRef={inputFileRef}/>
            }
        }else if(step === 2){
            view = {
                title: "Crop",
                node: <CropMediaStep imageFile={imageFile} 
                                     onZoomValueChange={handleZoomValue} />
            }
        }else if(step === 3){
            view = {
                title: "Final Touch",
                node: <FinalStep  onPublish={(e) => handleNextStep(e)}
                                  imageFile={imageFile}
                                  zoomValue={zoomValueRef.current} />
            }
        }else{
            view = {
                node:  <PublishedMessage onClose={handleClosePostModal} />
            }
        }
        return view
    },[step])


    const getBackBtn = () => (step !== 1) ? (<button type="button" onClick={handleBackStep} ><ArrowLeft size={25}/></button>) : null

    const getNextBtn = () => (step === 2 ) ? <button type="button" className="text-sm font-bold bg-blue-700 rounded-md px-3 py-1 hover:bg-blue-600 transition-all" onClick={handleNextStep}>Next</button> : null

    const handleBackStep = (e: React.MouseEvent<HTMLButtonElement>) => {
        setStep(prevState => prevState - 1)
    }

    const getHeader = () => {
        return ( step !== 4 )  
                    ? (<header className="w-full bg-gray-950 py-2 px-4 flex justify-between items-center">
                        {getBackBtn()}
                        <h3 className="text-md font-bold m-auto">{stepView.title}</h3>
                        {getNextBtn()}
                      </header>)
                    : null
    }

    const handleNextStep = (e: React.MouseEvent<HTMLButtonElement>) => {
        setStep(prevState => prevState + 1)
    }

    const stepView = getStepView(step) ?? { title: "", node: <></>}

    return (<div className="fixed w-screen h-screen bg-black/85 flex justify-center items-center z-10">
        <Link  className="absolute right-[25px] top-[25px]" href={pathName}>
            <X size="30"/>
        </Link>
        <div className="bg-gray-900 w-xl min-w-lg min-h-[400px] " ref={boxRef}>
            { getHeader() }
            { stepView.node }
        </div>
    </div>)
}

function UploadMediaStep({ 
    onFileUpload,
    onInputFileChange,
    inputFileRef
}: {
    onFileUpload: (e: React.MouseEvent<HTMLButtonElement>) => void
    onInputFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    inputFileRef: React.RefObject<HTMLInputElement | null>
}){
    return (<section className="flex flex-col items-center justify-center my-30 animate-fade-in">
                <div className="relative w-27 h-24 borde-1 border-white ">
                    <Image size={70} className="absolute -rotate-6 top-0"/>
                    <SquarePlay size={70} className="absolute rotate-6 bg-gray-900 top-5 left-10"/>
                </div>
                <p className="text-xl">Drag photos and videos here</p>
                <button type="button" 
                        aria-label="Select files" className="text-sm font-bold bg-blue-700 rounded-md px-3 py-2 my-7"
                        onClick={onFileUpload}>
                            Select from computer
                </button>
                <input type="file" 
                       ref={inputFileRef} 
                       className="hidden"
                       onChange={onInputFileChange} />
            </section>)
}

function CropMediaStep({ 
    imageFile, 
    onZoomValueChange
} :
{
    imageFile: File | null
    onZoomValueChange: (zoomValue: string) => void
} ){
    const [zoomValue, setZoomValue] = useState("1")
    const objectUrl = imageFile ? URL.createObjectURL(imageFile) : ""
    const imgAlt = imageFile?.name ?? ""


    const handleZoom = (e: React.ChangeEvent<HTMLInputElement>) => {
    onZoomValueChange(e.target.value)
    setZoomValue(e.target.value)

    }

    return (
        <section className="flex justify-center items-center w-lg flex-col mx-auto py-4">
            <div className="relative w-[300px] overflow-hidden">
                <div id="grid" className="absolute top-0 left-0 grid grid-flow-col grid-rows-3 grid-cols-3 opacity-40 w-full h-full ">
                    <div className="bg-transparent border-1 border-white"></div>
                    <div className="bg-transparent border-1 border-white"></div>
                    <div className="bg-transparent border-1 border-white"></div>
                    <div className="bg-transparent border-1 border-white"></div>
                    <div className="bg-transparent border-1 border-white"></div>
                    <div className="bg-transparent border-1 border-white"></div>
                    <div className="bg-transparent border-1 border-white"></div>
                    <div className="bg-transparent border-1 border-white"></div>
                    <div className="bg-transparent border-1 border-white"></div>
                </div>
                <img src={objectUrl} 
                     alt={imgAlt} 
                     width="300px"
                     style={{ transform: `scale(${zoomValue})` }} />
            </div>
            <div className="flex items-center my-5 py-3 px-4 rounded-xl bg-slate-950">
                <ZoomIn size={22} className="mr-3"/>
                <input type="range" min="1" max="3" step="0.1" onChange={handleZoom}  />
            </div>
        </section>
    )
}

function FinalStep({ 
    onPublish,
    imageFile,
    zoomValue
}: {
    onPublish: (e : React.MouseEvent<HTMLButtonElement>) => void
    imageFile: File | null
    zoomValue: string
}){

    const objectUrl = imageFile ? URL.createObjectURL(imageFile) : ""

    return (<section className="w-full">
        <div className="grid grid-cols-2 gap-0">
             <div className="relative overflow-hidden">
                <img src={objectUrl}
                     alt="Cropped image"
                     width="300px"
                      style={{ transform: `scale(${zoomValue})` }} />
            </div>
            <div className="p-4">
                <div className="flex">
                    <div className="w-[44px] h-[44px] md:w-[50px] md:h-[50px] rounded-full overflow-hidden border-1 border-white mr-3">
                        <img src="https://cdn.pixabay.com/photo/2025/06/20/10/47/dog-9670619_1280.jpg"
                        className="w-full h-full object-cover"
                            alt="Pepito Perez" 
                            width="64px"
                            height="64px"/>
                    </div>
                    <div className="flex flex-col">
                        <h4>Pepito Perez</h4>
                        <p className="text-xs">Bulldog</p>
                    </div>
                </div>
                <textarea className="w-full bg-slate-800 mt-4 p-2 text-sm" placeholder="Write what you think!" 
                    rows={13} ></textarea>
                    <button className="bg-blue-700 hover:bg-blue-600 p-2 w-full rounded-lg mt-3 font-bold text-sm"
                            onClick={onPublish}>
                        Publish
                    </button>
            </div>
        </div>
    </section>)
}

function PublishedMessage({ onClose } : { onClose: (delay: number) => void}){

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getServerOk()
    },[])

    const getServerOk = async () =>  {
        await new Promise( resolve =>  setTimeout(resolve, 3000))
        setIsLoading(false)
        onClose(3000)
    }

    const getSuccessMsg = () =>  (<><img src="https://lh5.googleusercontent.com/proxy/8FzlLwmcTLuoHdYnTn1CHSwoJ-oi5UTDORu7BG1v1XmYquGZIko0i3GzpaXRR4qn17cv89z6Y9Bgk04v2KP-3mMMI9SX4BjaSpbG_H26TFYYJVVT2nvnMRKV"
            alt="Hurra! gif"
            width="200px"
            height="auto" 
            className="mx-auto mt-4"/>
        <h3 className="text-3xl text-center mb-13">Post published!</h3></>)
    
    const getLoader = () => <div><img src="https://mir-s3-cdn-cf.behance.net/project_modules/max_632/04de2e31234507.564a1d23645bf.gif" 
                                 width="100px" 
                                 height="100px"
                                 className="mx-auto my-4" /></div>

    return (<section className="w-full h-96 flex justify-center items-center flex-col">
            {
                isLoading 
                    ? getLoader()
                    : getSuccessMsg()
            }
         </section>)
}


export {CreatePostModal}