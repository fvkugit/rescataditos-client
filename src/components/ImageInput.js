import React, {useState} from "react";
import { Form, Image, Spinner } from "react-bootstrap";
import { uploadImage } from "../services/ImageUploader";

function ImageInput({ image, setImage }) {
  const [imageUploading, setimageUploading] = useState(false);
  const [isSubmited, setIsSubmited] = useState(false);

  // Change image based on the input
  const handleImage = async (e) => {
    try{
      setimageUploading(true);
      setIsSubmited(true);
      const newImage = e.target.files[0];
      const imageUrl = await uploadImage(newImage);
      console.log(imageUrl)
      setImage(imageUrl);
      setimageUploading(false);
    }
    catch{
      setImage(image || "https://alkemy196.s3.sa-east-1.amazonaws.com/images/np7-whj-2x4x-image-placeholder.jpg")
      setimageUploading(false);
    }
  };

  return (
    <>
      <Form.Group controlId="formFileSm" className="my-auto">
        
        {image && !imageUploading ? (
          <Form.Label className="mb-1 w-100">
          <Image fluid thumbnail className="d-block mx-auto mb-2 w-50" src={image} />
          </Form.Label>
        ) : (isSubmited && (
          <Form.Label className="mb-1 w-100">
            <Spinner
            className="mx-auto d-block my-3"
            animation="border"
            variant="light"
            />
            </Form.Label>
        ))}
        
        <Form.Control type="file" size="sm" onChange={handleImage} />
      </Form.Group>
    </>
  );
}

export default ImageInput;