import { useEffect, useRef, useState } from "react";
import Pictures from "./Pictures";

function App() {
  const [imageList, setImageList] = useState([]);
  const lastImageId = useRef(1);

  useEffect(() => {
    getImages(7).then((images) => {
      setImageList(images);
    });
  }, []);

  async function fetchImages(count) {
    const imagePromises = [];
    for (let i = 0; i < count; i++) {
      imagePromises.push(
        fetch(
          `https://api.slingacademy.com/v1/sample-data/photos/${lastImageId.current++}`
        )
      );
    }

    return await Promise.all(imagePromises)
      .then(async (responses) => {
        const images = [];
        for (const response of responses) {
          images.push((await response.json()).photo);
        }
        // console.log(images);
        return images;
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  }

  async function getImages(count) {
    try {
      const images = await fetchImages(count);
      return images;
    } catch (error) {
      return [];
    }
  }

  if (imageList.length > 0) {
    return <Pictures imageList={imageList} />;
  } else {
    return null;
  }
}

export default App;
