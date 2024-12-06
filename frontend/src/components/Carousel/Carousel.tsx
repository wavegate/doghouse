import { SlButton } from "@shoelace-style/shoelace/dist/react";
import { useEffect, useState } from "react";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import {
  FaSquareFacebook,
  FaSquareInstagram,
  FaSquarePinterest,
} from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [secondaryIndex, setSecondaryIndex] = useState(0);

  const [open, setOpen] = useState(false);

  const images = [
    {
      mediaType: "video",
      thumbnail:
        "https://customer-9sybz5o876ulud6h.cloudflarestream.com/161cee4f4afd94813eab5b15c0fcea6f/thumbnails/thumbnail.jpg",
      src: "https://customer-9sybz5o876ulud6h.cloudflarestream.com/161cee4f4afd94813eab5b15c0fcea6f/iframe?poster=https%3A%2F%2Fcustomer-9sybz5o876ulud6h.cloudflarestream.com%2F161cee4f4afd94813eab5b15c0fcea6f%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600",
      date: "December 30th, 2024",
      createdBy: "Brother",
      title: "Apple Generated",
    },
    {
      mediaType: "video",
      thumbnail:
        "https://customer-9sybz5o876ulud6h.cloudflarestream.com/91d35d13c3237e9d32226d55976ce9dd/thumbnails/thumbnail.jpg",
      src: "https://customer-9sybz5o876ulud6h.cloudflarestream.com/91d35d13c3237e9d32226d55976ce9dd/iframe?poster=https%3A%2F%2Fcustomer-9sybz5o876ulud6h.cloudflarestream.com%2F91d35d13c3237e9d32226d55976ce9dd%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600",
      date: "September 30th, 2024",
      createdBy: "Brother",
      title: "Smelly Melly",
    },
    {
      mediaType: "image",
      src: "https://pub-45779459613f492fa1ccc087f8c48998.r2.dev/IMG_0685.jpg",
      date: "September 30th, 2024",
      createdBy: "Brother",
      title: "File 3",
    },
    {
      mediaType: "image",
      src: "https://pub-45779459613f492fa1ccc087f8c48998.r2.dev/IMG_0878.jpg",
      date: "November 30th, 2024",
      createdBy: "Frank",
      title: "One-Tailed Fox",
    },
    {
      mediaType: "image",
      src: "https://pub-45779459613f492fa1ccc087f8c48998.r2.dev/IMG_0774.jpg",
      date: "September 30th, 2024",
      createdBy: "Dad",
      title: "Melly's Second Day",
    },
    {
      mediaType: "image",
      src: "https://pub-45779459613f492fa1ccc087f8c48998.r2.dev/IMG_0732.jpg",
      date: "September 30th, 2024",
      createdBy: "Dad",
      title: "Melly's Second Day",
    },
    {
      mediaType: "image",
      src: "https://pub-45779459613f492fa1ccc087f8c48998.r2.dev/IMG_0387.jpg",
      date: "September 30th, 2024",
      createdBy: "Dad",
      title: "Melly's Second Day",
    },
  ];

  const chunkImages = (arr, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      chunks.push(arr.slice(i, i + chunkSize));
    }
    return chunks;
  };

  const imageChunks = chunkImages(images, 4);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);

      if ((currentIndex - 1) % 4 === 3) {
        setSecondaryIndex((prevIndex) => prevIndex - 1);
      }
    }
  };

  const handleNext = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);

      if ((currentIndex + 1) % 4 === 0) {
        setSecondaryIndex((prevIndex) => prevIndex + 1);
      }
    }
  };

  const handleSecondaryPrev = () => {
    if (secondaryIndex > 0) {
      setSecondaryIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleSecondaryNext = () => {
    if (secondaryIndex < imageChunks.length - 1) {
      setSecondaryIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handleItemClick = (imageChunkIndex, indexWithinChunk) => {
    const actualIndex = imageChunkIndex * 4 + indexWithinChunk;
    setCurrentIndex(actualIndex);
  };

  useEffect(() => {
    if (open) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [open]);

  return (
    <div className={`relative`}>
      {open && (
        <>
          <div
            className={`fixed z-10 w-[100dvw] h-[100dvh] top-0 left-0 bg-black opacity-80`}
          ></div>
          <div
            className={`fixed z-10 w-[90dvw] h-[90dvh] left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 rounded-[20px] overflow-hidden`}
          >
            <img
              className={`object-contain bg-black w-full h-full`}
              src={images[currentIndex].src}
            ></img>
            <SlButton
              onClick={() => setOpen(false)}
              className={`absolute right-[24px] top-[24px] flex justify-center items-center`}
            >
              <IoCloseSharp className={`text-[36px]`} />
            </SlButton>
          </div>
        </>
      )}
      <div className={`flex flex-col gap-[24px]`}>
        <div
          className={`flex justify-between max-sm:flex-col max-sm:gap-[20px]`}
        >
          <div
            className={`self-end max-sm:self-start flex flex-col gap-[12px] max-sm:gap-[6px]`}
          >
            <div className="tracking-widest font-light">
              {images[currentIndex].date}
            </div>
            <h1
              className={`text-[36px] font-medium leading-[36px] max-sm:text-[30px]`}
            >
              {images[currentIndex].title}
            </h1>
          </div>
          <div
            className={`flex flex-col gap-[16px] sm:pl-[84px] sm:pr-[24px] max-sm:gap-[4px]`}
          >
            <div className={`flex gap-[18px] items-end`}>
              <div
                className={`text-[24px] leading-[30px] text-nowrap max-sm:text-[18px]`}
              >
                <span className={`opacity-50 pr-[12px] font-light`}>
                  Photo by:{" "}
                </span>{" "}
                <span className={`font-medium`}>
                  {images[currentIndex].createdBy}
                </span>
              </div>
            </div>
            <div className={`flex gap-[12px] sm:self-end`}>
              <FaSquarePinterest className={`text-[36px] max-sm:text-[24px]`} />
              <FaSquareInstagram className={`text-[36px] max-sm:text-[24px]`} />
              <FaSquareFacebook className={`text-[36px] max-sm:text-[24px]`} />
            </div>
          </div>
        </div>

        <div className={`relative`}>
          <button
            onClick={handlePrev}
            className={`absolute left-[12px] sm:left-0 sm:pr-[12px] sm:-translate-x-full h-full z-10 text-white`}
          >
            <FaChevronCircleLeft className={`text-[28px] sm:text-[40px]`} />
          </button>
          <button
            onClick={handleNext}
            className={`absolute right-[12px] sm:right-0 h-full sm:pl-[12px] sm:translate-x-full z-10 text-white`}
          >
            <FaChevronCircleRight className={`text-[28px] sm:text-[40px]`} />
          </button>
          <div className={`overflow-hidden rounded-[24px] sm:rounded-[36px]`}>
            <div
              className={`flex transition-transform duration-300`}
              style={{
                transform: `translateX(-${
                  (currentIndex * 100) / images.length
                }%)`,
                width: `${100 * images.length}%`,
              }}
            >
              {images.map((image, index) => {
                if (image.mediaType === "image") {
                  return (
                    <img
                      key={index}
                      className={`aspect-video object-contain bg-black px-[1px] cursor-pointer`}
                      src={image.src}
                      onClick={() => setOpen(true)}
                      style={{
                        width: `${100 / images.length}%`,
                      }}
                    ></img>
                  );
                } else if (image.mediaType === "video") {
                  return (
                    <div
                      key={index}
                      className={`aspect-video object-contain bg-black px-[1px] cursor-pointer `}
                      style={{
                        width: `${100 / images.length}%`,
                      }}
                    >
                      <div className={`relative w-full h-full`}>
                        <iframe
                          src={currentIndex === index ? image.src : ""}
                          loading="lazy"
                          className={`border-none absolute top-0 left-0 h-full w-full`}
                          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                          allowFullScreen={true}
                        ></iframe>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </div>
        <div className={`relative`}>
          <button
            onClick={handleSecondaryPrev}
            className={`absolute left-[12px] sm:left-0 sm:pr-[12px] sm:-translate-x-full h-full z-10 text-white`}
          >
            <FaChevronCircleLeft className={`text-[20px] sm:text-[40px]`} />
          </button>
          <button
            onClick={handleSecondaryNext}
            className={`absolute right-[12px] sm:right-0 h-full sm:pl-[12px] sm:translate-x-full z-10 text-white`}
          >
            <FaChevronCircleRight className={`text-[20px] sm:text-[40px]`} />
          </button>
          <div className={`overflow-hidden`}>
            <div
              className={`flex transition-transform duration-300`}
              style={{
                transform: `translateX(-${
                  (secondaryIndex * 100) / imageChunks.length
                }%)`,
                width: `${100 * imageChunks.length}%`,
              }}
            >
              {imageChunks.map((chunk, index) => (
                <div
                  key={index}
                  className={`grid grid-cols-4 w-full px-[1px]`}
                  style={{
                    width: `${100 / imageChunks.length}%`,
                  }}
                >
                  {chunk.map((image, i) => {
                    return (
                      <div
                        className={`p-[6px] sm:p-[14px] cursor-pointer ${
                          image === images[currentIndex]
                            ? `bg-blue-400`
                            : `bg-black`
                        } ${
                          i === 0 && `rounded-l-[12px] sm:rounded-l-[20px]`
                        } ${
                          i === chunk.length - 1 &&
                          `rounded-r-[12px] sm:rounded-r-[20px]`
                        }`}
                        onClick={() => handleItemClick(index, i)}
                        key={i}
                      >
                        <div className="aspect-video bg-black rounded-[6px] sm:rounded-[20px] overflow-hidden">
                          <img
                            key={i}
                            className={`object-contain w-full h-full`}
                            src={
                              image.mediaType === "video"
                                ? image.thumbnail
                                : image.src
                            }
                            alt={`Image ${index * 4 + i + 1}`}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
