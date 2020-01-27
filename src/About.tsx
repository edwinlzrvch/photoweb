import React, { FunctionComponent } from "react";
import DeskAbout from "./DeskAbout";
import MobAbout from "./MobAbout";
import "./About.css";
import AOS from "aos";
import "aos/dist/aos.css";

const About: FunctionComponent = () => {
  AOS.init();
  return (
    <div className="content">
      <div className="about-info">
        <DeskAbout />
        <MobAbout />
      </div>
    </div>
  );
};

export default About;
