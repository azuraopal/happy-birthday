import React, { useEffect, useRef, useState } from 'react'

// 1. IMPORT GAMBAR DARI FOLDER ASSETS
// Pastikan path-nya sesuai dengan lokasi file kamu
import orihime from "../assets/orihime.jpg";
import safa1 from "../assets/safa1.jpeg";
import safa2 from "../assets/safa2.jpeg";
import safa3 from "../assets/safa3.jpeg";
import safa4 from "../assets/safa4.jpeg";
import safa6 from "../assets/safa6.jpeg";
import safa7 from "../assets/safa7.jpeg";
import safa8 from "../assets/safa8.jpeg";
import safa9 from "../assets/safa9.jpeg";
import safa10 from "../assets/safa10.jpeg";
// Ganti dengan nama file aslimu
// Lanjutkan import gambar lainnya...

const LoveLetter = () => {
    
    // 2. MASUKKAN VARIABEL GAMBAR KE DALAM DATA
    const lettersData = [
        {
            id: 1,
            img: safa1,
        },
        {
            id: 2,
            img: safa2,
        },
        {
            id: 3,
            img: safa3,
        },
        {
            id: 4,
            img: safa4,
        },
        {
            id: 5,
            img: safa6,
        },
        {
            id: 6,
            img: safa7,
        },
        {
            id: 7,
            img: safa8,
        },
        {
            id: 8,
            img: safa9,
        },
        {
            id: 9,
            img: safa10,
        },
    ];

    const [openEnvelope, setOpenEnvelope] = useState(false);
    const [letters, setLetters] = useState([]);
    const [zIndexCounter, setZIndexCounter] = useState(10);
    const lettersContainerRef = useRef(null);

    useEffect(() => {
        setLetters(lettersData);
    }, []);

    const handleMouseDown = (e) => {
        const isTouch = e.type === "touchstart";
        const startEvent = isTouch ? e.touches[0] : e;

        if (startEvent.target.tagName === "BUTTON") return;

        const letterEl = e.currentTarget;
        const rect = letterEl.getBoundingClientRect();
        const offsetX = startEvent.clientX - rect.left;
        const offsetY = startEvent.clientY - rect.top;
        const startLeft = rect.left + window.scrollX;
        const startTop = rect.top + window.scrollY;

        letterEl.style.transform = "none";
        letterEl.classList.remove("-translate-x-1/2");
        letterEl.classList.remove("-translate-y-1/2");

        letterEl.style.position = "absolute";
        letterEl.style.left = `${startLeft}px`;
        letterEl.style.top = `${startTop}px`;
        letterEl.style.margin = 0;
        
        const newZ = zIndexCounter + 1;
        setZIndexCounter(newZ);
        letterEl.style.zIndex = newZ;

        const moveAt = (posX, posY) => {
            letterEl.style.left = `${posX - offsetX}px`;
            letterEl.style.top = `${posY - offsetY}px`;
        };

        const onMouseMove = (moveEvent) => {
            const ev = isTouch ? moveEvent.touches[0] : moveEvent;
            moveAt(ev.clientX, ev.clientY);
        };

        const onMouseUp = () => {
            if (isTouch) {
                document.removeEventListener("touchmove", onMouseMove);
                document.removeEventListener("touchend", onMouseUp);
            } else {
                document.removeEventListener("mousemove", onMouseMove);
                document.removeEventListener("mouseup", onMouseUp);
            }
        };

        if (isTouch) {
            document.addEventListener("touchmove", onMouseMove);
            document.addEventListener("touchend", onMouseUp);
        } else {
            document.addEventListener("mousemove", onMouseMove);
            document.addEventListener("mouseup", onMouseUp);
        }
    };

    const handleCloseLetter = (id) => {
        setLetters((prev) => prev.filter((l) => l.id !== id));
    };

    return (
        <main className='munna bg-[#8b0000] h-screen w-full overflow-hidden'>
            <section className="munna cssletter z-10">
                <div className={`envelope ${openEnvelope ? "active" : ""}`}>
                    <button
                        className="munna heart"
                        id="openEnvelope"
                        onClick={() => setOpenEnvelope(true)}
                    >
                        <span className="munna heart-text">Open</span>
                    </button>
                    <div className="munna envelope-flap text-black relative">
                        <div className='munna absolute left-1/2 top-[20%] -translate-x-1/2 flex items-center justify-center flex-col md:gap-y-2'>
                            <span className='munna font-sriracha md:text-2xl text-lg'> Love Envelope Gallery</span>
                            <span className='munna font-dancingScript md:text-3xl text-xl'>Dear Safa</span>
                        </div>
                    </div>
                    <div className="munna envelope-folds">
                        <div className="munna envelope-left"></div>
                        <div className="munna envelope-right"></div>
                        <div className="munna envelope-bottom"></div>
                    </div>
                </div>

                <div className="munna letters" ref={lettersContainerRef}>
                    {letters.map((letter) => (
                        <div // Ganti blockquote jadi div biasa agar lebih fleksibel
                            key={letter.id}
                            className="munna letter center -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center p-1 bg-white shadow-lg"
                            id={letter.id}
                            tabIndex={0}
                            style={{
                                position: 'absolute',
                                top: window.innerWidth < 768 ? '53%' : '50%',
                                left: window.innerWidth < 768 ? '50%' : '50%',
                                transform: 'none',
                                borderRadius: '4px',
                                width: '220px', // Lebar kartu
                                height: 'auto', // Tinggi menyesuaikan gambar
                                cursor: 'grab'
                            }}
                            onMouseDown={(e) => handleMouseDown(e)}
                            onTouchStart={handleMouseDown}
                        >
                            <button
                                className="munna closeLetter absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs shadow-md z-20 hover:bg-red-700"
                                title="Close"
                                onClick={() => handleCloseLetter(letter.id)}
                            >
                                X
                            </button>
                            
                            {/* 3. TAMPILAN GAMBAR SAJA */}
                            <div className="w-full h-full overflow-hidden border border-gray-100">
                                <img 
                                    src={letter.img} 
                                    alt="Memory" 
                                    className="w-full h-auto object-cover block"
                                    // PENTING: draggable="false" wajib ada agar gambar tidak 'terseret' sendiri
                                    // melainkan seluruh kartu yang terseret.
                                    draggable="false" 
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Bagian Animasi Jantung dan Salju (Tidak Berubah) */}
            <div className="munna heart-container absolute top-[20%] md:left-20 left-6">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="munna heartBeating md:w-[150px] w-[110px] h-[200px]">
                    <path d="M471.7 73.6c-54.5-46.4-136-38.3-186.4 15.8L256 120.6l-29.3-31.2C176.3 35.3 94.8 27.2 40.3 73.6-18 125.4-13.3 221 43 273.7l187.3 177.6a24 24 0 0032.4 0L469 273.7c56.3-52.8 61-148.3 2.7-200.1z" fill="#b10505" />
                </svg>
            </div>
            <div className="munna heart-container absolute bottom-[10%] md:right-20 right-6 rotate-180">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="munna heartBeating md:w-[150px] w-[110px] h-[200px]">
                    <path d="M471.7 73.6c-54.5-46.4-136-38.3-186.4 15.8L256 120.6l-29.3-31.2C176.3 35.3 94.8 27.2 40.3 73.6-18 125.4-13.3 221 43 273.7l187.3 177.6a24 24 0 0032.4 0L469 273.7c56.3-52.8 61-148.3 2.7-200.1z" fill="#b10505" />
                </svg>
            </div>
        </main>
    )
}

export default LoveLetter