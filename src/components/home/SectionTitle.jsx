import React from 'react';

export default function SectionTitle({ title }) {
  const style = {
    color: '#fff',
    fontSize: '22px',
    margin: '24px 10px 16px 10px',
    fontWeight: 700,
    padding: '0 0 0 12px',
    borderLeft: '4px solid #2dd238',
  };

  return <h2 style={style}>{title}</h2>;
}
