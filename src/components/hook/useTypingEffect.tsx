import { useState, useEffect } from 'react';

export const useTypingEffect = (
  text: string,
  speed: number = 1,
  callback?: () => void
) => {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);
  const [showFullText, setShowFullText] = useState(false);

  useEffect(() => {
    setDisplayedText('');
    setIndex(0);
    setShowFullText(false);
  }, [text]);

  useEffect(() => {
    if (index < text.length && !showFullText) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    } else if (index === text.length && callback) {
      callback(); // 텍스트 타이핑 완료 후 callback 호출
    }
  }, [index, text, speed, showFullText, callback]);

  const handleClick = () => {
    setShowFullText(true);
    setDisplayedText(text);
    if (callback) callback(); // 클릭 시에도 callback 호출
  };

  return { displayedText, handleClick };
};
