import React, { FunctionComponent } from "react";
import Image from "react-bootstrap/Image";
import "./About.css";

const DeskAbout: FunctionComponent = () => {
  return (
    <div className="desktop-view">
      <div className="text" data-aos="fade-right" data-aos-duration="1500">
        <h2> About me: </h2>
        <p>
          Kirill Andreev is a photographer from Daugavpils, Latvia, who loves to
          capture some beautiful life moments with his film cameras. Kirill's
          inspiration is old Soviet music, films and art. Kirill is always
          triying to find new experience, so be free to contact him!
        </p>
        <h2> My gear: </h2>
        <ul>
          <li>ZORKI-4</li>
          <li>Praktica MTL50</li>
        </ul>
      </div>
      <div className="face" data-aos="fade-left" data-aos-duration="2000">
        <Image
          src="./assets/59951577_2364186883851712_8165583959070081024_o.jpg"
          fluid={true}
        />
      </div>
    </div>
  );
};

export default DeskAbout;
