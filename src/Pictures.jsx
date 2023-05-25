import { useEffect } from "react";
import "./App.css";

export default function Pictures({ imageList, updateImageList }) {
  useEffect(() => {
    const lastImageContainer = document.querySelector(
      ".image-container:last-child"
    );

    console.log("Observing ", lastImageContainer);

    const intersectionObserver = new IntersectionObserver((entries) => {
      console.log(entries);
      const lastImage = entries[0];
      if (lastImage.isIntersecting) {
        console.log("last image", lastImage.target);
        updateImageList();
        intersectionObserver.unobserve(lastImage.target);
      }
    });
    intersectionObserver.observe(lastImageContainer);
  }, []);

  function images() {
    return imageList.map((image) => {
      return (
        <Image
          //   key={image.id}
          id={image.id}
          title={image.title}
          url={image.url}
        />
      );
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
