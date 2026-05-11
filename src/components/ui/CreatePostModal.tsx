"use client"
import { ArrowLeft, Image, LucideProps, SquarePlay, X, ZoomIn } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { useState, useEffect, useRef} from "react"
function CreatePostModal(){

    const boxRef = useRef<HTMLDivElement | null>(null)
    const inputFileRef = useRef<HTMLInputElement | null>(null)
    const router = useRouter()
    const [step, setStep] = useState(1)
    const [imageFile, setImageFile] = useState<File | null>(null)
    
    //disables scrolling on modal load
    useEffect(() => {
        document.body.classList.add("overflow-hidden") 
        return () => document.body.classList.remove("overflow-hidden")
    },[])

    //checks clicks outside the modal to close it
    useEffect(() => {
        const handleClickOutside = (e : MouseEvent) => {
            if(boxRef.current && !boxRef.current.contains(e.target as Node)){
                router.push("/", { scroll: false})
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
            console.log(fileList[0])
            setImageFile(fileList[0])
        }
    }

    const getStepView = () => {
        let view = null
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
                node: <CropMediaStep imageFile={imageFile} />
            }
        }else if(step === 3){
            view = {
                title: "Final Touch",
                node: <FinalStep />
            }
        }

        return view
    }

    const getBackBtn = () => (step !== 1) ? (<button type="button" onClick={handleBackStep} ><ArrowLeft size={25}/></button>) : null

    const getNextBtn = () => (step === 2 ) ? <button type="button" className="text-sm font-bold bg-blue-700 rounded-md px-3 py-1 hover:bg-blue-600 transition-all" onClick={handleNextStep}>Next</button> : null

    const handleBackStep = (e: React.MouseEvent<HTMLButtonElement>) => {
        console.log("clicked!")
        setStep(prevState => prevState - 1)
    }

    const handleNextStep = (e: React.MouseEvent<HTMLButtonElement>) => {
        setStep(prevState => prevState + 1)
    }
    console.log(`********* STEP #${step} **********`)

    const stepView = getStepView() ?? { title: "", node: <></>}

    return (<div className="fixed w-screen h-screen bg-black/85 flex justify-center items-center z-10">
        <Link  className="absolute right-[25px] top-[25px]" href="/">
            <X size="30"/>
        </Link>
        <div className="bg-gray-900 w-xl " ref={boxRef}>
            <header className="w-full bg-gray-950 py-2 px-4 flex justify-between items-center">
                {getBackBtn()}
                <h3 className="text-md font-bold m-auto">{stepView.title}</h3>
                {getNextBtn()}
            </header>
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
    return (<section className="flex flex-col items-center justify-center my-30">
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
    imageFile 
} :
{
    imageFile: File | null
} ){
    const [zoomValue, setZoomValue] = useState("1")
    const objectUrl = imageFile ? URL.createObjectURL(imageFile) : ""
    const imgAlt = imageFile?.name ?? ""


    const handleZoom = (e: React.ChangeEvent<HTMLInputElement>) => {

    console.log(e.target.value)
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
                <input type="range" min="1" max="3" step="0.1" onChange={handleZoom} value={0} />

            </div>
        </section>
    )
}

function FinalStep(){
    return (<section className="w-full">
        <div className="grid grid-cols-2 gap-0">
             <div className="relative overflow-hidden">
                <img src="https://cdn.pixabay.com/photo/2025/06/20/10/47/dog-9670619_1280.jpg"
                     alt="Meanwhile"
                     width="300px" />
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
                    rows={10} ></textarea>
            </div>
        </div>
    </section>)
}
export {CreatePostModal}