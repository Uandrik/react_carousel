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
  const track = images.length * itemWidthWithGap;
  const maxStartIndex = Math.max(0, images.length - frameSize);

  return (
    <div className="Carousel">
      <div className="Carousel__container" style={{ width: `${track}` }}>
        <ul
          style={{
            width: `${itemWidthWithGap * frameSize}px`,
            gap: `${gap}px`,
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
          data-cy="prev"
          onClick={() => {
            setCurrentIndex(c => {
              return Math.min(maxStartIndex, c - step);
            });
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
            setCurrentIndex(c => {
              return Math.min(maxStartIndex, c + step);
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
