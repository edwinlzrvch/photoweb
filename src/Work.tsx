import React, { useState, useCallback, FunctionComponent } from "react";
import Gallery from "react-photo-gallery";
import Spinner from "react-bootstrap/Spinner";
// @ts-ignore
import Carousel, { Modal, ModalGateway } from "react-images";
import AOS from "aos";
import axios from "axios";
import { IData } from "./ControlTable";
import "aos/dist/aos.css";
import "./Work.css";

import { useEffect } from "react";

const Work: FunctionComponent<IData> = () => {
  AOS.init();
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const [photos, setPhotos] = useState<IData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let unmounted = false;
    const source = axios.CancelToken.source();
    axios
      .get("/api/admin/getPhotos", {
        cancelToken: source.token
      })
      .then(res => {
        if (!unmounted) {
          setPhotos(res.data);
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.log(error);
      });
    return () => {
      unmounted = true;
      source.cancel("Cancelling in cleanup");
    };
  }, []);
  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  return isLoading ? (
    <div className="load-spin">
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  ) : (
    <div className="content">
      <div className="gallery" data-aos="fade-up">
        <Gallery photos={photos} onClick={openLightbox} />
      </div>
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox}>
            <Carousel
              currentIndex={currentImage}
              views={photos.map(x => ({
                ...x
              }))}
            />
          </Modal>
        ) : null}
      </ModalGateway>
    </div>
  );
};

export default Work;
