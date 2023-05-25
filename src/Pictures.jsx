import { useState, useEffect, useRef } from "react";
import "./App.css";

export default function Pictures({ imageList }) {
  useEffect(() => {
    const lastImageContainer = document.querySelector(
      ".image-container:last-child"
    );

    console.log("hello: ", lastImageContainer);

    const intersectionObserver = new IntersectionObserver((entries) => {
      console.log(entries);
    });
    intersectionObserver.observe(lastImageContainer);
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
