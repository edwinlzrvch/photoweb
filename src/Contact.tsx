import React, { useState, FunctionComponent } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import aos from "aos";

const Contact: FunctionComponent = () => {
  aos.init();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [ref, setRef] = useState(true);
  const recaptchaRef = React.createRef<ReCAPTCHA>();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const currCaptcha = recaptchaRef.current;
    if (currCaptcha !== null) {
      const recaptchaValue = currCaptcha.getValue();
      if (recaptchaValue) {
        await axios.post("/form/", { name, email, message });
      } else {
        console.error("Please, enter captcha");
      }
    }
  };

  return (
    <div className="content">
      <h1 style={{ textAlign: "center" }} data-aos="fade-down">
        {" "}
        Contact me{" "}
      </h1>
      <Form onSubmit={handleSubmit} data-aos="fade-up">
        <Form.Group>
          <Form.Label htmlFor="name"> Name </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            onChange={(e: React.FormEvent) =>
              setName((e.target as HTMLInputElement).value)
            }
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="e-mail"> E-mail </Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your e-mail"
            onChange={(e: React.FormEvent) =>
              setEmail((e.target as HTMLInputElement).value)
            }
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="message"> Message </Form.Label>
          <Form.Control
            as="textarea"
            onChange={(e: React.FormEvent) =>
              setMessage((e.target as HTMLInputElement).value)
            }
          />
        </Form.Group>
        {ref ? (
          <Button
            type="submit"
            style={{ background: "black", borderColor: "black" }}
            disabled={true}
          >
            {" "}
            Submit{" "}
          </Button>
        ) : (
          <Button
            type="submit"
            style={{ background: "black", borderColor: "black" }}
          >
            Submit
          </Button>
        )}
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey="6LeDbMoUAAAAABLFUkrcBYm2qkc-l7xwaD9Hn2e3"
          onChange={() => setRef(false)}
        />
      </Form>
    </div>
  );
};

export default Contact;
