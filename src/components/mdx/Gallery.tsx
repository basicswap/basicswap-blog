import React, { useState, useRef, MouseEvent, useEffect } from 'react';
import Image from 'next/image';

interface GalleryImage {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

interface GalleryProps {
  images: GalleryImage[];
  maxImagesPerRow?: number;
  fixedHeight?: number;
}

const MAX_GALLERY_IMAGE_HEIGHT = 400;

const Gallery: React.FC<GalleryProps> = ({ images, maxImagesPerRow = 3, fixedHeight }) => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [transformOrigin, setTransformOrigin] = useState('center center');

  const zoomLevels = [1, 1.5, 2, 3];
  const imageRef = useRef<HTMLImageElement>(null);

  const effectiveFixedHeight = fixedHeight || (images.length > 0 && images[0].height ? images[0].height : 300);
  const galleryImageHeight = Math.min(effectiveFixedHeight, MAX_GALLERY_IMAGE_HEIGHT);

  const openModal = (image: GalleryImage) => {
    setSelectedImage(image);
    setIsModalOpen(true);
    setZoomLevel(1);
    setTransformOrigin('center center');
  };

  const closeModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
    setZoomLevel(1);
    setTransformOrigin('center center');
  };

  const handleImageClick = (e: MouseEvent<HTMLImageElement>) => {
    if (zoomLevel === zoomLevels[zoomLevels.length - 1]) {
      setZoomLevel(1);
      setTransformOrigin('center center');
    } else {
      const currentIndex = zoomLevels.indexOf(zoomLevel);
      const nextIndex = (currentIndex + 1) % zoomLevels.length;
      const newZoomLevel = zoomLevels[nextIndex];
      setZoomLevel(newZoomLevel);

      if (imageRef.current && newZoomLevel > 1) {
        const { left, top, width, height } = imageRef.current.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;
        setTransformOrigin(`${x}% ${y}%`);
      } else {
        setTransformOrigin('center center');
      }
    }
  };

  const [modalImageDimensions, setModalImageDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (isModalOpen && selectedImage) {
      const screenWidth = window.innerWidth - 40;
      const screenHeight = window.innerHeight - 40;

      const originalWidth = selectedImage.width || 1;
      const originalHeight = selectedImage.height || 1;

      const aspectRatio = originalWidth / originalHeight;

      let newWidth = screenWidth;
      let newHeight = screenHeight;

      if (newWidth / newHeight > aspectRatio) {
        newWidth = newHeight * aspectRatio;
      } else {
        newHeight = newWidth / aspectRatio;
      }

      setModalImageDimensions({ width: newWidth, height: newHeight });
    }
  }, [isModalOpen, selectedImage]);


  if (!images || images.length === 0) {
    return null;
  }

  return (
    <>
      <div className="flex flex-wrap justify-center gap-4 gallery-spacing">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative cursor-pointer"
            style={{
              width: `calc(${100 / Math.min(images.length, maxImagesPerRow)}% - ${((Math.min(images.length, maxImagesPerRow) - 1) * 16) / Math.min(images.length, maxImagesPerRow)}px)`,
              height: `${galleryImageHeight}px`,
            }}
            onClick={() => openModal(image)}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              style={{ objectFit: 'cover', objectPosition: 'top' }}
              unoptimized
              className="rounded-md"
            />
          </div>
        ))}
      </div>

      {isModalOpen && selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div
            className="relative"
            onClick={(e) => e.stopPropagation()}
            style={{ cursor: zoomLevel > 1 ? 'grab' : 'zoom-in' }}
          >
            <button
              className="absolute top-2 right-2 text-white text-3xl font-bold z-10"
              onClick={closeModal}
            >
              &times;
            </button>
            <Image
              ref={imageRef}
              src={selectedImage.src}
              alt={selectedImage.alt}
              width={modalImageDimensions.width}
              height={modalImageDimensions.height}
              style={{
                objectFit: 'contain',
                transform: `scale(${zoomLevel})`,
                transformOrigin: transformOrigin,
                transition: 'transform 0.2s ease-in-out',
              }}
              unoptimized
              className="rounded-md cursor-pointer"
              onClick={handleImageClick}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Gallery;
