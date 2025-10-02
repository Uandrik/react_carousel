import React, { useState } from 'react';
import './Carousel.scss';

interface CaoruseImages {
  images: string[];
  gap: number;
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
}

const Carousel: React.FC<CaoruseImages> = ({
  images,
  gap,
  step,
  itemWidth,
  frameSize,
  animationDuration,
  infinite,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemWidthWithGap = itemWidth + gap;
  const transformValue = -currentIndex * itemWidthWithGap;

  return (
    <div className="Carousel">
      <div className="Carousel__container">
        <ul
          style={{
            width: `${itemWidthWithGap * frameSize - gap}px`,
            transform: `translateX(${transformValue}px)`,
            transition: `transform ${animationDuration}ms ease`,
          }}
          className="Carousel__list"
        >
          {images.map((i, index) => (
            <li key={index} className="list__item">
              <img
                className="list__img"
                style={{ width: `${itemWidth}`, height: `${itemWidth}` }}
                src={i}
                alt={`${index}`}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="buttons">
        <button
          data-cy="next"
          onClick={() => {
            setCurrentIndex(c => {
              if (c === 0) {
                return infinite ? images.length - step : 0;
              }

              return c - step;
            });
          }}
          disabled={!infinite && currentIndex === 0}
          className="button"
          type="button"
        >
          &#x25C0;
        </button>
        <button
          onClick={() => {
            setCurrentIndex(c => {
              if (c >= images.length - step) {
                return infinite ? 0 : images.length - step;
              }

              return c + step;
            });
          }}
          disabled={!infinite && currentIndex === images.length - step}
          className="button"
          type="button"
        >
          &#x25B6;
        </button>
      </div>
    </div>
  );
};

export default Carousel;
