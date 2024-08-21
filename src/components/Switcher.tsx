import { useState } from 'react';

const Switcher = ({ title }: { title: string }) => {
  const [isOn, setIsOn] = useState<boolean>(false);

  const handleToggle = () => {
    setIsOn((prevState) => !prevState);
  };

  return (
    <div className="switcher-container flex flex-col">
      <p className="font-bold">{title}</p>
      <label className="switch">
        <input type="checkbox" checked={isOn} onChange={handleToggle} />
        <span className="slider round"></span>
      </label>
    </div>
  );
};

export default Switcher;
