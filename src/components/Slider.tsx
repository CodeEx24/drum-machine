import React, { useState } from 'react';

const Slider: React.FC = () => {
  const [value, setValue] = useState<number>(50);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(event.target.value));
  };

  return (
    <div className="w-full">
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={handleChange}
        className="w-full"
      />
    </div>
  );
};

export default Slider;
