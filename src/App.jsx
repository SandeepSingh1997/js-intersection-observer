import { useEffect, useState } from "react";
import "./App.css";

var lastImageId = 1;

function App() {
  const [imageList, setImageList] = useState([]);

  useEffect(() => {
    getImages(5)
      .then((images) => {
        setImageList(images);
      })
      .catch((error) => {
        setImageList([]);
      });

    // const lastImageContainer = document.querySelector(
    //   ".image-container:last-child"
    // );

    // const intersectionObserver = new IntersectionObserver(
    //   (entries) => {
    //     console.log(entries);
    //   },
    //   { threshold: 0.5 }
    // );

    // intersectionObserver.observe(lastImageContainer);
  }, []);

  function images() {
    return imageList.map((image) => {
      return (
        <Image
          key={image.id}
          id={image.id}
          title={image.title}
          url={image.url}
        />
      );
    });
  }

  async function getImages(count) {
    const imagePromises = [];
    for (let i = 0; i < count; i++) {
      imagePromises.push(
        fetch(`https://jsonplaceholder.typicode.com/photos/${lastImageId++}`)
      );
    }
    return await Promise.all(imagePromises)
      .then(async (responses) => {
        const images = [];
        for (const response of responses) {
          images.push(await response.json());
        }
        return images;
      })
      .catch((error) => {
        throw error;
      });
  }

  return <div className="container">{images()}</div>;
}

function Image({ id, title, url }) {
  return (
    <div className="image-container">
      <img src={url} className="image" alt="image" />
      <span>{title}</span>
    </div>
  );
}

export default App;
