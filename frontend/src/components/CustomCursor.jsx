import React, { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [ringPos, setRingPos] = useState({ x: -100, y: -100 });
  const [clicking, setClicking] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only enable on non-touch devices
    if ('ontouchstart' in window) return;

    const move = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };

    const down = () => setClicking(true);
    const up = () => setClicking(false);

    const checkHover = (e) => {
      const target = e.target;
      const isLink = target.closest('a, button, [role="button"], input, textarea, select');
      setHovering(!!isLink);
    };

    const leave = () => setVisible(false);

    window.addEventListener('mousemove', move);
    window.addEventListener('mousemove', checkHover);
    window.addEventListener('mousedown', down);
    window.addEventListener('mouseup', up);
    document.addEventListener('mouseleave', leave);

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mousemove', checkHover);
      window.removeEventListener('mousedown', down);
      window.removeEventListener('mouseup', up);
      document.removeEventListener('mouseleave', leave);
    };
  }, []);

  // Smooth follow for ring
  useEffect(() => {
    let animFrame;
    const follow = () => {
      setRingPos(prev => ({
        x: prev.x + (pos.x - prev.x) * 0.15,
        y: prev.y + (pos.y - prev.y) * 0.15
      }));
      animFrame = requestAnimationFrame(follow);
    };
    animFrame = requestAnimationFrame(follow);
    return () => cancelAnimationFrame(animFrame);
  }, [pos]);

  if (!visible) return null;

  return (
    <>
      {/* Inner dot */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          transform: `translate(${pos.x - 4}px, ${pos.y - 4}px)`,
          width: clicking ? '6px' : '8px',
          height: clicking ? '6px' : '8px',
          borderRadius: '50%',
          backgroundColor: '#F0F4FF',
          transition: 'width 0.1s, height 0.1s'
        }}
      />
      {/* Outer ring */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          transform: `translate(${ringPos.x - (hovering ? 20 : 16)}px, ${ringPos.y - (hovering ? 20 : 16)}px)`,
          width: hovering ? '40px' : '32px',
          height: hovering ? '40px' : '32px',
          borderRadius: '50%',
          border: '1.5px solid rgba(123, 94, 234, 0.35)',
          transition: 'width 0.2s, height 0.2s, border-color 0.2s',
          borderColor: hovering ? 'rgba(167, 139, 250, 0.5)' : 'rgba(123, 94, 234, 0.35)'
        }}
      />
    </>
  );
};

export default CustomCursor;