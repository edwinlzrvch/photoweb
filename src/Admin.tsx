import React, { useState, FunctionComponent } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import ControlTable from "./ControlTable";

const Admin: FunctionComponent = () => {
  const [imagePreview, setImagePreview] = useState("");
  const [width, setWidth] = useState();
  const [height, setHeight] = useState();
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    await axios.post("/api/admin/addPhoto", {
      width,
      height,
      src: imagePreview
    });
  };

  const handlePhotoChange = (e: React.FormEvent) => {
    e.preventDefault();
    const reader = new FileReader();
    const res = reader.result;
    const file = (e.target as HTMLInputElement).files;
    if (file !== null) {
      if (typeof res === "string") {
        reader.onloadend = () => {
          setImagePreview(res);
        };
        reader.readAsDataURL(file[0]);
      }
    } else {
      console.log(file);
    }
  };
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Control
            name="file"
            type="file"
            placeholder="Upload Photo"
            onChange={handlePhotoChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Choose width</Form.Label>
          <Form.Control
            as="select"
            name="width"
            onChange={(e: React.FormEvent) =>
              setWidth((e.target as HTMLInputElement).value)
            }
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Choose height</Form.Label>
          <Form.Control
            as="select"
            name="height"
            onChange={(e: React.FormEvent) =>
              setHeight((e.target as HTMLInputElement).value)
            }
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          Upload photo!
        </Button>
        <Image src={imagePreview} style={{ width: 300, height: 300 }} />
      </Form>
      <Accordion>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
              Click me!
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <ControlTable photoID={12} src={"source"} width={2} height={2} />
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </>
  );
};

export default Admin;
