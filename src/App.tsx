import React, { useState, useRef, useEffect } from 'react';
import SocialLinks from './components/SocialLinks';
import { socialLinks } from './const/socialLinks';

type Clip = {
  src: string;
  bank: string;
  text: string;
  bankText: string;
};

type Clips = {
  [key: string]: Clip;
};

const clips: Clips = {
  Q: {
    src: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-1.mp3',
    bank: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3',
    text: 'Heater 1',
    bankText: 'Chord 1',
  },
  W: {
    src: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-2.mp3',
    bank: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3',
    text: 'Heater 2',
    bankText: 'Chord 2',
  },
  E: {
    src: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-3.mp3',
    bank: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3',
    text: 'Heater 3',
    bankText: 'Chord 3',
  },
  A: {
    src: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-4_1.mp3',
    bank: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3',
    text: 'Heater 4',
    bankText: 'Shaker',
  },
  S: {
    src: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-6.mp3',
    bank: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3',
    text: 'Clap',
    bankText: 'Open HH',
  },
  D: {
    src: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Dsc_Oh.mp3',
    bank: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3',
    text: 'Open-HH',
    bankText: 'Close HH',
  },
  Z: {
    src: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Kick_n_Hat.mp3',
    bank: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3',
    text: "Kick-n'-Hat",
    bankText: 'Punchy Kick',
  },
  X: {
    src: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Kick_n_Hat.mp3',
    bank: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3',
    text: 'Kick',
    bankText: 'Side Stick',
  },
  C: {
    src: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Kick_n_Hat.mp3',
    bank: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3',
    text: 'Closed-HH',
    bankText: 'Snare',
  },
};

function App() {
  const [isOn, setIsOn] = useState<boolean>(true);
  const [isBank, setIsBank] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(50);
  const [text, setText] = useState<string>('');
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement | null }>({});

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(event.target.value));
    setText(`Volume: ${event.target.value}`);

    // Reset the background color after 500ms
    setTimeout(() => {
      setText('');
    }, 700);
  };

  const handleTogglePower = () => {
    setIsOn((prevState) => !prevState);
  };

  const handleToggleBank = () => {
    setIsBank((prevState) => !prevState);
  };

  const playClip = (key: keyof typeof clips) => {
    setActiveButton(key as string);

    // Reset the background color after 500ms
    setTimeout(() => {
      setActiveButton(null);
    }, 500);

    if (!isOn) return;
    const audio = audioRefs.current[key];
    if (audio) {
      audio.volume = volume / 100;
      audio.currentTime = 0;
      audio.play();
      setText(isBank ? clips[key].bankText : clips[key].text);
    }
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const key = event.key.toUpperCase();
      if (clips[key]) {
        playClip(key as keyof typeof clips);
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOn, volume]);

  return (
    <div
      id="drum-machine"
      className="flex flex-col justify-center items-center w-screen h-screen bg-violet-600"
    >
      <div className="bg-sky-400 p-8 gap-12 rounded-lg w-[90vw] sm:w-[550px] sm:flex">
        <div>
          <div className="drum-pads grid grid-cols-3 gap-4">
            {Object.keys(clips).map((key) => (
              <button
                key={key}
                className={`drum-pad ${
                  activeButton === key && isOn && 'bg-yellow-500'
                }  ${activeButton === key && !isOn && 'bg-gray-500'}`}
                id={`${key}-button`}
                onClick={() => playClip(key as keyof Clips)}
              >
                <p className="text-2xl sm:text-5xl font-bold">{key}</p>

                <audio
                  id={key}
                  className="clip"
                  ref={(el) => (audioRefs.current[key] = el)}
                  src={!isBank ? clips[key].src : clips[key].bank}
                ></audio>
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <div className="switcher-container flex flex-col">
            <p className="font-bold">Power</p>
            <label className="switch">
              <input
                type="checkbox"
                checked={isOn}
                onChange={handleTogglePower}
              />
              <span className="slider round"></span>
            </label>
          </div>
          <p
            id="display"
            className="display bg-gray-500 h-12 flex items-center justify-center text-white rounded-lg w-full sm:w-40"
          >
            {text}
          </p>
          <div className="w-full">
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={handleVolumeChange}
              className="w-full"
            />
          </div>
          <div className="switcher-container flex flex-col">
            <p className="font-bold">Bank</p>
            <label className="switch">
              <input
                type="checkbox"
                checked={isBank}
                onChange={handleToggleBank}
              />
              <span className="slider round"></span>
            </label>
          </div>
        </div>
      </div>
      <SocialLinks links={socialLinks} />
    </div>
  );
}

export default App;
