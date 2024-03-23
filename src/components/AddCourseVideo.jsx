import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import React, {useState } from 'react'

import Loader from './Loader';
import apiConnection from '../apiConnection';
import { apiEndpoints, httpMethods } from '../constants/constants';

export default function AddCourseVideo(props) {

    const [isLoading,setIsLoading] = useState(false);


    const [formData,setFormData] = useState({
        name: '',
        thumbnail:'',
        video_url: '',
        description: '',
        course_id: props.course_id,
        pdf: ''
    })

    const [image,setImage] = useState(null)

    const [pdf,setPdf] = useState(null)

    const [error,setError] = useState('')
      
    const [showError,setShowError] = useState(false)

    const getData = (e) =>{
    setFormData({...formData, [e.target.name]: e.target.value})
    }

    const uploadFiles = async () => {
        console.log('Entered to uploadFiles image',image)
        console.log('Entered to uploadFiles pdf',pdf)

        const data = await apiConnection(
            apiEndpoints.UPLOAD_VIDEO_FILES_ENDPOINT,
            httpMethods.POST,
            {
                thumbnail: image,
                pdf: pdf 
            },
            {'Content-Type': 'multipart/form-data'}
            )
        console.log('Here is call ended')

        return data
    }

    const createVideo = async (e) => {
        e.preventDefault();
        const uploadFilesRes = await uploadFiles()
        console.log(uploadFilesRes)
        if(uploadFilesRes.data.status !== 200) {
            setError('Some technical error. Please try again later.')
            setShowError(true)
            return;
        }
        const data = await apiConnection(apiEndpoints.CREATE_COURSE_VIDEO_ENDPOINT,httpMethods.POST,{...formData,thumbnail: uploadFilesRes.data.data.thumbnail,pdf: uploadFilesRes.data.data.pdf})
        setIsLoading(false)
        if(data.data.status === 201) {
            setFormData({
                name: '',
                thumbnail:'',
                video_url: '',
                description: '',
                course_id: props.course_id,
                pdf: ''
            })
            props.onHide()
        } else {
            setError('Some technical error. Please try again later.')
            setShowError(true)
            return;
        }
    }

  return (
    <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
    >
        <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
            Add course
        </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {isLoading ? <Loader /> :
            <Form>
                <Form.Group className='mb-3' as={Col} controlId="formGridName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control value={formData.name} name="name" required type="text" placeholder="Enter name" onChange={(e)=>getData(e)}/>
                </Form.Group>

                <Form.Group controlId="thumbnail" className="mb-3">
                    <Form.Label>Upload thumbnail for video</Form.Label>
                    <Form.Control type="file" name='thumbnail' required onChange={(e) => setImage(e.target.files[0])}/>
                </Form.Group>

                <Form.Group className='mb-3' as={Col} controlId="formVideoUrl">
                    <Form.Label>Video Url</Form.Label>
                    <Form.Control value={formData.video_url} name="video_url" required type="text" placeholder="Enter url" onChange={(e)=>getData(e)}/>
                </Form.Group>

                <Form.Group className='mb-3' as={Col} controlId="formDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control value={formData.description} name="description" required type="text" placeholder="Enter description" onChange={(e)=>getData(e)}/>
                </Form.Group>

                <Form.Group controlId="pdf" className="mb-3">
                    <Form.Label>Upload PDF for video</Form.Label>
                    <Form.Control type="file" name='pdf' onChange={(e) => setPdf(e.target.files[0])}/>
                </Form.Group>

                <Button className='mb-3 w-100 rounded rounded-3' variant="primary" type="submit" onClick={(e)=>createVideo(e)}>
                   Create Video
                </Button>
                {showError && <p className="text-danger" >{error}</p>}
            </Form>
            }
        </Modal.Body>
        <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
    </Modal>
  )
}