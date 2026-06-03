import React, { useRef, useEffect } from 'react';

interface FadingVideoProps {
  src: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function FadingVideo({ src, className, style }: FadingVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafIdRef = useRef<number | null>(null);
  const fadingOutRef = useRef<boolean>(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Set initial opacity
    video.style.opacity = '0';

    const FADE_MS = 500;
    const FADE_OUT_LEAD = 0.55;

    const fadeTo = (targetOpacity: number, duration: number = FADE_MS) => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }

      const startOpacity = parseFloat(video.style.opacity || '0');
      const startTime = performance.now();

      const animate = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Linear interpolation
        const currentOpacity = startOpacity + (targetOpacity - startOpacity) * progress;
        video.style.opacity = currentOpacity.toString();

        if (progress < 1) {
          rafIdRef.current = requestAnimationFrame(animate);
        } else {
          rafIdRef.current = null;
        }
      };

      rafIdRef.current = requestAnimationFrame(animate);
    };

    const handleLoadedData = () => {
      video.style.opacity = '0';
      video.play().catch(() => {});
      fadeTo(1);
    };

    const handleTimeUpdate = () => {
      const duration = video.duration;
      const currentTime = video.currentTime;
      if (!isNaN(duration) && duration > 0) {
        if (!fadingOutRef.current && (duration - currentTime <= FADE_OUT_LEAD) && (duration - currentTime > 0)) {
          fadingOutRef.current = true;
          fadeTo(0);
        }
      }
    };

    const handleEnded = () => {
      video.style.opacity = '0';
      setTimeout(() => {
        if (!videoRef.current) return;
        video.currentTime = 0;
        video.play().catch(() => {});
        fadingOutRef.current = false;
        fadeTo(1);
      }, 100);
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);

    // If already loaded
    if (video.readyState >= 2) {
      handleLoadedData();
    }

    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      src={src}
      className={className}
      style={{ ...style, transition: 'none' }}
      muted
      playsInline
      preload="auto"
    />
  );
}
