import React from "react";
import { Modal } from "react-bootstrap";

export default function AddCourse(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id='"contained-modal-title-vcenter"'>
          Add Course
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Centered Modal</h4>
        <p>
           iam paragraph just beside the h4 Tag ide the h4 Tag ide the h4 Tag 
           ide the h4 Tag ide the h4 Tag am paragraph just 
        </p>
      </Modal.Body>
      <Modal.Footer onClick={props.onHide}>Close</Modal.Footer>
    </Modal>
  );
}
