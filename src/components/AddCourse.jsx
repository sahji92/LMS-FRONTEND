import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import React, { useState } from 'react'
import { getSession } from '../utils/sessionMethods';
import { apiEndpoints, httpMethods } from '../constants/constants';
import apiConnection from '../apiConnection';

export default function AddCourse (props) {

    const [formData,setFormData] = useState({
        name: '',
        description:'',
        price: '',
        discounted_price: '',
        teacher_id: getSession('userid')
    })

    const [image,setImage] = useState()

    const [error,setError] = useState('')
      
    const [showError,setShowError] = useState(false)

    const getData = (e) =>{
    setFormData({...formData, [e.target.name]: e.target.value})
    }

    const uploadImage = async () => {
        console.log('Entered to update data',image)
        const data = await apiConnection(
            apiEndpoints.UPLOAD_COURSE_IMAGE_ENDPOINT,
            httpMethods.POST,
            {courseImage: image},
            {'Content-Type': 'multipart/form-data'}
            )
        return data
    }

    const createCourse = async (e) => {
        e.preventDefault();
        if(parseInt(formData.discounted_price) > parseInt(formData.price)) {
            setError('Discount can not be greater than price.')
            setShowError(true)
            return;
        }
        const uploadImageRes = await uploadImage()
        if(uploadImageRes.data.status !== 200) {
            setError('Some technical error. Please try again later.')
            setShowError(true)
            return;
        }
        const data = await apiConnection(apiEndpoints.CREATE_COURSE_ENDPOINT,httpMethods.POST,{...formData,image: uploadImageRes.data})

        if(data.status === 201) {
            setFormData({
                name: '',
                description:'',
                price: '',
                discounted_price: '',
                teacher_id: getSession('userid')
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
            <Form>
                <Form.Group className='mb-3' as={Col} controlId="formGridName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control value={formData.name} name="name" required type="text" placeholder="Enter name" onChange={(e)=>getData(e)}/>
                </Form.Group>

                <Form.Group className='mb-3' as={Col} controlId="formGridDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control value={formData.description} name="description" required type="email" placeholder="Enter description" onChange={(e)=>getData(e)}/>
                </Form.Group>

                <Form.Group className='mb-3' as={Col} controlId="formGridPrice">
                    <Form.Label>Price</Form.Label>
                    <Form.Control value={formData.price} name="price" required type="number" placeholder="Enter price" onChange={(e)=>getData(e)}/>
                </Form.Group>

                <Form.Group className='mb-3' as={Col} controlId="formGridDiscountedPrice">
                    <Form.Label>Discounted Price</Form.Label>
                    <Form.Control value={formData.discounted_price} name="discounted_price" required type="number" placeholder="Enter discounted price" onChange={(e)=>getData(e)}/>
                </Form.Group>

                <Form.Group controlId="courseImage" className="mb-3">
                    <Form.Label>Upload image for course</Form.Label>
                    <Form.Control type="file" name='courseImage' required onChange={(e) => setImage(e.target.files[0])}/>
                </Form.Group>

                <Button className='mb-3 w-100 rounded rounded-3' variant="primary" type="submit" onClick={(e)=>createCourse(e)}>
                   Create Course
                </Button>
                {showError && <p className="text-danger" >{error}</p>}
            </Form>
        </Modal.Body>
        <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
    </Modal>
  )
}