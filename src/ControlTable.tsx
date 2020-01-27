import React, { useState, useEffect, FunctionComponent } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Image from "react-bootstrap/Image";

export interface IData {
  photoID: number;
  width: number;
  height: number;
  src: string;
}

const ControlTable: FunctionComponent<IData> = () => {
  const [data, setData] = useState<IData[]>([]);
  useEffect(() => {
    let unmounted = false;
    const source = axios.CancelToken.source();
    axios
      .get("/api/admin/getPhotos", {
        cancelToken: source.token
      })
      .then(resp => {
        if (!unmounted) {
          setData(resp.data);
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

  const deletePhoto = (item: IData) => {
    const index = data.indexOf(item);
    setData(
      data.filter((_, i) => {
        return index !== i;
      })
    );
    axios.post("/api/admin/deletePhoto", {
      width: item.width,
      height: item.height,
      src: item.src,
      photoID: item.photoID
    });
  };
  const content = (
    <tbody>
      {data.map(item => (
        <tr key={item.photoID}>
          <td>
            <Button onClick={() => deletePhoto(item)}>Delete</Button>
          </td>
          <td> {item.photoID}</td>
          <td> {item.height}</td>
          <td> {item.width}</td>
          <td>
            {" "}
            <Image style={{ height: 300, width: 300 }} src={item.src} />
          </td>
        </tr>
      ))}
    </tbody>
  );

  return (
    <Table striped={true} bordered={true} hover={true} variant="dark">
      <thead>
        <tr>
          <th />
          <th>ID</th>
          <th>height</th>
          <th>width</th>
          <th>photo</th>
        </tr>
      </thead>
      {content}
    </Table>
  );
};

export default ControlTable;
