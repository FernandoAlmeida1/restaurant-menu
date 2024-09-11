import React from 'react';
import './Card.css';

interface CardProps {
  title: string;
  content: React.ReactNode;
  width: string;
  height: string;
  opacity?: number;
  gap?: string;
  mobile?: boolean;
}

const Card: React.FC<CardProps> = ({
  title,
  content,
  width,
  height,
  opacity = 1,
  gap = '0px',
  mobile = false
}) => {
  return (
    <div className={`card ${mobile ? 'card-mobile' : 'card-desktop'}`} style={{ width, height, opacity, gap }}>
      <h3>{title}</h3>
      <div className="card-content">{content}</div>
    </div>
  );
};

export default Card;
