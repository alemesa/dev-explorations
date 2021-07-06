import React, { memo, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import checkProps from '@jam3/react-check-extra-props';
import gsap from 'gsap';

import styles from './index.module.scss';

import Head from '../../components/Head/Head';

function About({ className }) {
  const containerRef = useRef();

  return (
    <main className={classnames(styles.About, className)} ref={containerRef}>
      <Head title="About" />
      <h1 className={styles.title}>Marquee Motion Hover</h1>
      <div className={styles.container}>
        <MarqueeItem title="Toronto" />
        <MarqueeItem title="Palermo" />
        <MarqueeItem title="Medellin" />
        <MarqueeItem title="Sao Paulo" />
        <MarqueeItem title="Paris" />
      </div>
    </main>
  );
}

About.propTypes = checkProps({
  className: PropTypes.string
});

About.defaultProps = {};

export default memo(About);

const animationDefaults = { duration: 0.6, ease: 'expo' };

function MarqueeItem({ title }) {
  const mainRef = useRef(null);

  const marqueeRef = useRef(null);
  const marqueeInnerRef = useRef(null);
  const linkRef = useRef(null);

  const findClosestEdge = useCallback((ev) => {
    const x = ev.pageX - mainRef.current.offsetLeft;
    const y = ev.pageY - mainRef.current.offsetTop;
    return closestEdge(x, y, mainRef.current.clientWidth, mainRef.current.clientHeight);
  }, []);

  const handleMouseEnter = useCallback(
    (ev) => {
      const edge = findClosestEdge(ev);

      gsap
        .timeline({ defaults: animationDefaults })
        .set(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
        .set(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0)
        .to([marqueeRef.current, marqueeInnerRef.current], { y: '0%' }, 0);
    },
    [findClosestEdge]
  );

  const handleMouseLeave = useCallback(
    (ev) => {
      const edge = findClosestEdge(ev);

      gsap
        .timeline({ defaults: animationDefaults })
        .to(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
        .to(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0);
    },
    [findClosestEdge]
  );

  return (
    <div className={styles.item} ref={mainRef}>
      <span
        className={styles.itemLink}
        href="#"
        ref={linkRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {title}
      </span>
      <div className={styles.marquee} ref={marqueeRef}>
        <div className={styles.marqueeInnerWrap} ref={marqueeInnerRef}>
          <div className={styles.marqueeInner} aria-hidden="true">
            <span>Frank Tower</span>
            <img
              className={styles.marqueeImg}
              src="https://picsum.photos/150/100?random=9"
              alt="W"
              decoding="async"
              loading="lazy"
            />
            <span>Dom Dom</span>
            <img
              className={styles.marqueeImg}
              src="https://picsum.photos/150/100?random=10"
              alt="W"
              decoding="async"
              loading="lazy"
            />
            <span>Santa Maria</span>
            <img
              className={styles.marqueeImg}
              src="https://picsum.photos/150/100?random=11"
              alt="W"
              decoding="async"
              loading="lazy"
            />
            <span>Big Molly</span>
            <img
              className={styles.marqueeImg}
              src="https://picsum.photos/150/100?random=12"
              alt="W"
              decoding="async"
              loading="lazy"
            />
            <span>Frank Tower</span>
            <img
              className={styles.marqueeImg}
              src="https://picsum.photos/150/100?random=13"
              alt="W"
              decoding="async"
              loading="lazy"
            />
            <span>Dom Dom</span>
            <img
              className={styles.marqueeImg}
              src="https://picsum.photos/150/100?random=14"
              alt="W"
              decoding="async"
              loading="lazy"
            />
            <span>Santa Maria</span>
            <img
              className={styles.marqueeImg}
              src="https://picsum.photos/150/100?random=15"
              alt="W"
              decoding="async"
              loading="lazy"
            />
            <span>Big Molly</span>
            <img
              className={styles.marqueeImg}
              src="https://picsum.photos/150/100?random=16"
              alt="W"
              decoding="async"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const closestEdge = (x, y, w, h) => {
  const topEdgeDist = distMetric(x, y, w / 2, 0);
  const bottomEdgeDist = distMetric(x, y, w / 2, h);
  const min = Math.min(topEdgeDist, bottomEdgeDist);
  return min === topEdgeDist ? 'top' : 'bottom';
};

// Distance Formula
// from https://codepen.io/johnstew/pen/zxYJZP?editors=0010
const distMetric = (x, y, x2, y2) => {
  const xDiff = x - x2;
  const yDiff = y - y2;
  return xDiff * xDiff + yDiff * yDiff;
};
