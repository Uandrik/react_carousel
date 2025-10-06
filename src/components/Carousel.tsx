import React, { useState } from 'react';
import './Carousel.scss';

interface CaoruselProps {
  images: string[];
  gap: number;
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
}

const Carousel: React.FC<CaoruselProps> = ({
  images,
  gap,
  itemWidth,
  frameSize,
  animationDuration,
  infinite,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const [initialItemWidth, setInitialItemWidth] = useState(itemWidth);
  const [initialFrameSize, setInitialFrameSize] = useState(frameSize);
  const [initialStep, setInitialStep] = useState(3);
  const [initialAnimationDuration, setInitialAnimationDuration] =
    useState(animationDuration);

  const itemWidthWithGap = initialItemWidth + gap;
  const transformValue = -currentIndex * itemWidthWithGap;
  const maxStartIndex = Math.max(0, images.length - initialFrameSize);

  console.log(currentIndex, initialStep, images.length - initialStep);

  return (
    <>
      <div className="inputs__container">
        <input
          onChange={event => setInitialItemWidth(Number(event.target.value))}
          type="number"
          placeholder="Width"
        />
        <input
          onChange={event => setInitialFrameSize(Number(event.target.value))}
          type="number"
          placeholder="Frame size"
        />
        <input
          onChange={event => setInitialStep(Number(event.target.value))}
          type="number"
          placeholder="Step"
        />
        <input
          onChange={event =>
            setInitialAnimationDuration(Number(event.target.value))
          }
          type="number"
          placeholder="Animation duration"
        />
      </div>

      <div className="Carousel">
        <div
          className="Carousel__container"
          style={{ width: `${initialFrameSize * itemWidthWithGap}px` }}
        >
          <ul
            style={{
              gap: `${gap}px`,
              transform: `translateX(${transformValue}px)`,
              transition: `transform ${initialAnimationDuration}ms ease`,
            }}
            className="Carousel__list"
          >
            {images.map((i, index) => (
              <li key={index} className="list__item">
                <img
                  className="list__img"
                  style={{
                    width: `${initialItemWidth}px`,
                    height: `${initialItemWidth}px`,
                  }}
                  src={i}
                  alt={`${index}`}
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="buttons">
          <button
            onClick={() => {
              if (infinite && currentIndex === 0) {
                setCurrentIndex(images.length - initialStep);

                return;
              }

              setCurrentIndex(c => Math.max(0, c - initialStep));
            }}
            disabled={!infinite && currentIndex === 0}
            className="button"
            type="button"
          >
            &#x25C0;
          </button>
          <button
            data-cy="next"
            onClick={() => {
              if (infinite && currentIndex === images.length - initialStep) {
                setCurrentIndex(0);

                return;
              }

              setCurrentIndex(c => Math.min(maxStartIndex, c + initialStep));
            }}
            disabled={!infinite && currentIndex === maxStartIndex}
            className="button"
            type="button"
          >
            &#x25B6;
          </button>
        </div>
      </div>
    </>
  );
};

export default Carousel;
