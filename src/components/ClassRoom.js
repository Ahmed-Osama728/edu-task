import React from 'react';

const ClassRoom = ({ results, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <ul className="list-group mb-4">
      {results.map((result) => (
        <li key={result.category.id} className="list-group-item">
          {result.category.name}
        </li>
      ))}
    </ul>
  );
};

export default ClassRoom;
