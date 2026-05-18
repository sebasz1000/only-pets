"use client"
import { useClickOutside } from "@/hooks/useClickOutside";
import { useDisableScrolling } from "@/hooks/useDisableScrolling";
import { X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function PhotoDetailModal({ photoId }: { photoId: string }) {

    const boxRef = useRef<HTMLDivElement | null>(null)

    useDisableScrolling()

    useClickOutside(boxRef)


    return (<div className="fixed w-screen h-screen bg-black/85 flex justify-center items-center z-10 top-0 left-0 animate-fade-in">
        <Link className="absolute right-[25px] top-[25px]" href="/">
            <X size="30" />
        </Link>
        <div ref={boxRef} className="bg-gray-900 w-xl min-w-lg min-h-[400px] " >
            <section className="w-full">
                <div className="grid grid-cols-2 gap-0">
                    <div className="relative overflow-hidden ">
                        <img src={`https://picsum.photos/id/${photoId}/400/600`}
                            alt="Cropped image"
                            width="300px"
                            className="object-contain" />
                    </div>
                    <div className="p-4">
                        <article className="flex">
                            <div className="w-[44px] h-[44px] md:w-[50px] md:h-[50px] rounded-full overflow-hidden border-1 border-white mr-3">
                                <img src="https://cdn.pixabay.com/photo/2025/06/20/10/47/dog-9670619_1280.jpg"
                                    className="w-full h-full object-cover"
                                    alt="Pepito Perez"
                                    width="64px"
                                    height="64px" />
                            </div>
                            <div className="flex flex-col">
                                <h4>Pepito Perez</h4>
                                <p className="text-xs">Bulldog</p>
                            </div>
                        </article>
                        <article>
                            <p className="my-4 text-sm">
                                Aquellos lo suficientemente valientes comparten sus experiencias personales de este incidente emblemático. Este documental reexamina los acontecimientos del supuesto encuentro y avistamiento OVNI, con relatos de Jesse Marcel, Frankie Rowe y Walter Haut. ¿Fue un globo meteorológico el que se estrelló en Nuevo México? ¿O fue algo más?
                            </p>
                        </article>
                    </div>
                </div>
            </section>
        </div>
    </div>)
}