'use client';
import { useEffect } from 'react';

export default function AdSlot({
  slot,
  style,
}: {
  slot?: string;
  style?: React.CSSProperties;
}) {
  useEffect(() => {
    try {
      (window as any).adsbygoogle = (window as any).adsbygoogle || [];
      (window as any).adsbygoogle.push({});
    } catch {}
  }, []);
  return (
    <ins
      className='adsbygoogle'
      style={style || { display: 'block' }}
      data-ad-client='ca-pub-XXXXXXXXXXXXXXXX'
      data-ad-slot={slot || '0000000000'}
      data-ad-format='auto'
      data-full-width-responsive='true'
    />
  );
}
