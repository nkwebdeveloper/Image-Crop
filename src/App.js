import React, { useState, useRef } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import './App.css';

function App() {
  const [src, setSrc] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [showCroppingArea, setShowCroppingArea] = useState(true);
  const cropperRef = useRef(null);

  const onFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedImage = e.target.files[0];
      setSrc(URL.createObjectURL(selectedImage));
      setShowCroppingArea(true); // Show cropping area when a new image is selected
    }
  };

  const handleCrop = () => {
    if (cropperRef.current) {
      const croppedCanvas = cropperRef.current.cropper.getCroppedCanvas();
      if (croppedCanvas) {
        croppedCanvas.toBlob((blob) => {
          if (blob) {
            const croppedImageUrl = URL.createObjectURL(blob);
            setCroppedImage(croppedImageUrl);
            setShowCroppingArea(false); // Hide cropping area after successful crop
          } else {
            console.error('Failed to create a blob.');
          }
        }, 'image/jpeg');
      }
    }
  };

  return (
    <div className="App">
      <input type="file" accept="image/*" onChange={onFileChange} />
      {src && (
        <div className="crop-container">
          {showCroppingArea && (
            <Cropper
              ref={cropperRef}
              src={src}
              style={{ height: 300, width: '100%' }}
              aspectRatio={4 / 3}
              guides={true}
            />
          )}
          {showCroppingArea && <button onClick={handleCrop}>Crop</button>}
        </div>
      )}
      <div className="preview-image">
        {croppedImage && <img src={croppedImage} alt="Cropped" />}
      </div>
    </div>
  );
}

export default App;
