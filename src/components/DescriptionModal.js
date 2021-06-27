import React from "react";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
const DescriptionModal = (props) => {
  const [modalShow, setModalShow] = React.useState(false);
  return (
    <>
      <Button variant="info" onClick={() => setModalShow(true)}>
        Description
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        matter={props.matter}
        onHide={() => setModalShow(false)}
      />
    </>
  );
};

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Description
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p style={{ textAlign: "justify" }}>{props.matter}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DescriptionModal;
