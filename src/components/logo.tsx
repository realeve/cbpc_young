import React from 'react';
export default ({
  color = '#e60012',
  style,
  className,
}: {
  color?: string;
  style?: React.CSSProperties;
  className?: string;
}) => (
  <div className={className}>
    <svg xmlns="http://www.w3.org/2000/svg" style={style} viewBox="0 0 88 88">
      <path
        d="M21.6 30.4c0-2.3 1-4.4 4.8-4.3h10.5v8.5h-6v7.3h4.7v4.3h-4.7v7.3h6V62H26.3c-3.6 0-4.8-1.5-4.8-4.6v-27zm17.9-8.8h9v44.9h-9V21.6zM62 26c2.1 0 4.5 1.2 4.5 4.4v27c0 2.6-2.1 4.6-4.5 4.6H51.2v-8.4h6v-19h-6V26H62zM44 0c24.3 0 44 19.7 44 44S68.3 88 44 88 0 68.3 0 44 19.7 0 44 0zm0 79.9c19.8 0 35.8-16.1 35.8-35.8S63.8 8.2 44 8.2C24.2 8.2 8.2 24.2 8.2 44c0 19.8 16 35.9 35.8 35.9z"
        fill={color}
      />
    </svg>
  </div>
);
