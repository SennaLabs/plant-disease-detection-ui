import React, { useState, useRef } from 'react';
import axios from 'axios';

import LoadingBar from './loadingBar';

import uploadImage from '../../assets/uploadImage.svg';
import multipleImageShadow from '../../assets/multipleImageShadow.png';
import leftArrow from '../../assets/leftArrow.png';
import rightArrow from '../../assets/rightArrow.png';

export async function getBase64(file: File) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            resolve(reader.result);
        };
        reader.onerror = reject;
    });
}

interface ImageDimensions {
    imgNo: number;
    width: number;
    height: number;
}

const Inspect: React.FC = () => {
    const [selectedFiles, setSelectedFiles] = useState<File[] | null>(null);
    const [progress, setProgress] = useState(0);
    const [loading, setLoading] = useState(true);
    const [currentImage, setCurrentImage] = useState(0);
    const [imageDimensions, setImageDimensions] = useState<ImageDimensions[]>(
        []
    );
    const [defectedRes, setDefectedRes] = useState<any[]>([]);

    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const handleClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleClickNext = () => {
        if (currentImage === selectedFiles!.length - 1) {
            setCurrentImage(0);
        } else setCurrentImage((prev) => prev + 1);
    };

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const files = event.target.files
            ? Array.from(event.target.files)
            : null;

        setSelectedFiles(files);
        if (files) {
            console.log('Selected files:', files);
            setLoading(true);
            setProgress(5);
            let newImageDimensions: ImageDimensions[] = [];
            let newDefectedRes: any[] = [];

            for (let i = 0; i < files.length; i++) {
                const imageBase64 = await getBase64(files[i]);
                setProgress(((i + 1) / files.length) * 100);
                const res = await axios({
                    method: 'POST',
                    url: 'https://detect.roboflow.com/pineapple-and-coconut-inspection/2',
                    params: {
                        api_key: 'DeWDinm8uWqF5jeiBrVV',
                    },
                    data: imageBase64,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                });

                const reader = new FileReader();
                reader.onload = (e) => {
                    const img = new Image();
                    img.onload = () => {
                        newImageDimensions.push({
                            imgNo: i,
                            width: img.width,
                            height: img.height,
                        });
                        if (newImageDimensions.length === files.length) {
                            setImageDimensions(newImageDimensions);
                        }
                    };
                    if (e.target?.result) {
                        img.src = e.target.result as string;
                    }
                };
                reader.readAsDataURL(files[i]);

                newDefectedRes.push({
                    predictions: res.data.predictions,
                    imgNo: i,
                });
            }

            setDefectedRes(newDefectedRes);
            setProgress(100);
            setTimeout(() => {}, 500);
            setLoading(false);
        }
    };

    const getCurrentImagePredictions = () => {
        const currentRes = defectedRes.find(
            (res) => res.imgNo === currentImage
        );
        return currentRes ? currentRes.predictions : [];
    };

    const numberOfDefectedAreas = getCurrentImagePredictions().length;

    const downloadImageWithRectangles = () => {
        if (!canvasRef.current || !selectedFiles) return;

        const currentFile = selectedFiles[currentImage];
        const currentImageDimension = imageDimensions.find(
            (dim) => dim.imgNo === currentImage
        );
        if (!currentImageDimension) return;

        const img = new Image();
        img.src = URL.createObjectURL(currentFile);

        img.onload = () => {
            const canvas = canvasRef.current!;
            canvas.width = currentImageDimension.width;
            canvas.height = currentImageDimension.height;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            ctx.drawImage(img, 0, 0);

            getCurrentImagePredictions().forEach((prediction: any) => {
                const scaleX = canvas.width / currentImageDimension.width;
                const scaleY = canvas.height / currentImageDimension.height;

                const x = (prediction.x - prediction.width / 2) * scaleX;
                const y = (prediction.y - prediction.height / 2) * scaleY;
                const width = prediction.width * scaleX;
                const height = prediction.height * scaleY;

                ctx.strokeStyle = 'red';
                ctx.lineWidth = 2;
                ctx.strokeRect(x, y, width, height);
            });

            const link = document.createElement('a');
            link.download = `detected_${currentImage}.png`;
            link.href = canvas.toDataURL();
            link.click();
        };
    };

    return (
        <>
            <div className='mt-20'>
                {selectedFiles && (
                    <>
                        {loading && (
                            <div className='ml-40 flex'>
                                <div className='w-[600px]'>
                                    <div className='pt-[100%] relative w-full'>
                                        <img
                                            className='absolute inset-0 w-full h-full border border-gray-300 object-contain bg-white shadow-xl'
                                            src={URL.createObjectURL(
                                                selectedFiles[0]
                                            )}
                                        />
                                        {selectedFiles.length > 1 && (
                                            <img
                                                className='absolute left-[30px] top-[20px] inset-0 w-[600px] h-[620px]'
                                                style={{ zIndex: -1 }}
                                                src={multipleImageShadow}
                                            />
                                        )}
                                    </div>
                                </div>
                                {(loading || progress < 100) && (
                                    <div className='ml-[150px] w-[300px] content-center'>
                                        <div className='text-2xl mb-6 flex justify-center'>
                                            Loading Result ....
                                        </div>
                                        <LoadingBar progress={progress} />
                                    </div>
                                )}
                            </div>
                        )}
                        {!loading && progress === 100 && (
                            <>
                                <div className='ml-32 flex'>
                                    <div className='justify-center content-center mr-4'>
                                        <img src={leftArrow} alt='' />
                                    </div>
                                    <div className='w-[600px] flex-row'>
                                        <div className='pt-[100%] relative w-full'>
                                            <img
                                                className='absolute inset-0 w-full h-full border border-gray-300 object-contain bg-white shadow-xl'
                                                src={URL.createObjectURL(
                                                    selectedFiles[currentImage]
                                                )}
                                                style={{ zIndex: -1 }}
                                            />
                                            <div
                                                style={{ zIndex: 100 }}
                                                className='absolute top-0 w-full h-full'
                                            >
                                                <svg className='w-full h-full'>
                                                    {getCurrentImagePredictions().map(
                                                        (
                                                            prediction: any,
                                                            index: any
                                                        ) => {
                                                            const imageDimension =
                                                                imageDimensions.find(
                                                                    (dim) =>
                                                                        dim.imgNo ===
                                                                        currentImage
                                                                );
                                                            if (!imageDimension)
                                                                return null;

                                                            const scaleX =
                                                                600 /
                                                                imageDimension.width;
                                                            const scaleY =
                                                                600 /
                                                                imageDimension.height;

                                                            const x =
                                                                (prediction.x -
                                                                    prediction.width /
                                                                        2) *
                                                                scaleX;
                                                            const y =
                                                                (prediction.y -
                                                                    prediction.height /
                                                                        2) *
                                                                scaleY;
                                                            const width =
                                                                prediction.width *
                                                                scaleX;
                                                            const height =
                                                                prediction.height *
                                                                scaleY;

                                                            return (
                                                                <rect
                                                                    key={index}
                                                                    className='fill-transparent stroke-red-500 stroke-2'
                                                                    x={x}
                                                                    y={y}
                                                                    width={
                                                                        width
                                                                    }
                                                                    height={
                                                                        height
                                                                    }
                                                                />
                                                            );
                                                        }
                                                    )}
                                                </svg>
                                            </div>
                                        </div>
                                        <div className='flex justify-end mt-4'>
                                            {currentImage + 1}/
                                            {selectedFiles.length}
                                        </div>
                                    </div>
                                    <div className='justify-center content-center ml-4'>
                                        <img
                                            src={rightArrow}
                                            alt=''
                                            onClick={handleClickNext}
                                        />
                                    </div>
                                    <div className='ml-[50px] max-w-[200px] content-center flex-row'>
                                        <div className='text-4xl mb-6 flex '>
                                            Result
                                        </div>
                                        <div className='text-xl flex '>
                                            {`Found ${numberOfDefectedAreas} defected area(s)`}
                                        </div>
                                        <button
                                            onClick={
                                                downloadImageWithRectangles
                                            }
                                            className='mt-10 bg-blue-500 text-white px-4 py-2 rounded'
                                        >
                                            Download Result
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </>
                )}
                {!selectedFiles && (
                    <div>
                        <div>
                            <h1 className='text-6xl font-bold flex item-center justify-center'>
                                Inspect Your Produce
                            </h1>
                        </div>
                        <div className='flex item-center justify-center mt-[20px]'>
                            <p>Upload images/videos to check for diseases</p>
                        </div>
                        <div className='flex item-center justify-center mt-[40px]'>
                            <img src={uploadImage} alt='' />
                        </div>
                        <div className='flex item-center justify-center'>
                            <button
                                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded  mt-[40px] '
                                onClick={handleClick}
                            >
                                Upload
                            </button>
                            <input
                                type='file'
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                style={{ display: 'none' }}
                                multiple
                            />
                        </div>
                    </div>
                )}
            </div>
            <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
        </>
    );
};

export default Inspect;
