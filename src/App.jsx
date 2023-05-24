import { useEffect, useState } from "react";
import "./App.css";

var lastImageId = 1;

function App() {
  const [imageList, setImageList] = useState([]);

  async function getImages(count) {
    try {
      const images = await fetchImages(count);
      return images;
    } catch (error) {
      return [];
    }
  }

  useEffect(() => {
    getImages(7).then((images) => {
      const mainContainer = document.querySelector(".container");

      const initialImages = images.map((image) => {
        return (
          <Image
            key={image.id}
            id={image.id}
            title={image.title}
            url={image.url}
          />
        );
      });

      setImageList(images);
      console.log(initialImageLoaded, "truthy");
      ReactDOM.render(initialImages, mainContainer);
    });
  }, []);

  function observe() {
    const lastImageContainer = document.querySelector(
      ".image-container:last-child"
    );
    console.log("hello: ", lastImageContainer);

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        console.log(entries);
      },
      { threshold: 0.5 }
    );

    intersectionObserver.observe(lastImageContainer);

    console.log(initialImageLoaded, "falsy");
  }

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

  async function fetchImages(count) {
    const imagePromises = [];
    for (let i = 0; i < count; i++) {
      imagePromises.push(
        fetch(
          `https://api.slingacademy.com/v1/sample-data/photos/${lastImageId++}`
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
