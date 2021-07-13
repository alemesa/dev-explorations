import React, { memo, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import checkProps from '@jam3/react-check-extra-props';
import gsap from 'gsap';

import styles from './index.module.scss';

import Head from '../../components/Head/Head';

function MarqueeMotion({ className }) {
  const containerRef = useRef();

  return (
    <main className={classnames(styles.MarqueeMotion, className)} ref={containerRef}>
      <Head title="Marquee Motion" />
      <div className={styles.container}>
        <MarqueeItem
          title="Toronto"
          items={['CN', 'Tower', 'Ontario', 'Canada', 'Blue Jays', 'Lorem Ipsum']}
          index={0}
        />
        <MarqueeItem
          title="Palermo"
          items={['Pizza', 'Sicily', 'Romans', 'Italy', 'Mafia', 'Lorem Ipsum', 'Panettone']}
          index={1}
        />
        <MarqueeItem
          title="Medellin"
          items={['Bandeja Paisa', 'Pablo Escobar', 'Envigado', 'Colombia', 'Antioquia', 'Lorem Ipsum']}
          index={2}
        />
        <MarqueeItem
          title="Rio di Janeiro"
          items={['Carnival', 'Concert', 'Beach', 'Brazil', 'Ipanema', 'Lorem Ipsum']}
          index={3}
        />
        <MarqueeItem
          title="Paris"
          items={['Eiffel', 'Tower', 'Napoleon', 'France', 'Notredame', 'Lorem Ipsum']}
          index={4}
        />
      </div>
    </main>
  );
}

MarqueeMotion.propTypes = checkProps({
  className: PropTypes.string
});

MarqueeMotion.defaultProps = {};

export default memo(MarqueeMotion);

const animationDefaults = { duration: 0.6, ease: 'expo' };

function MarqueeItem({ title, items, index }) {
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
    <div className={styles.item} ref={mainRef} key={index}>
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
            {items.map((item, i) => (
              <React.Fragment key={i}>
                <span>{item}</span>
                <img className={styles.marqueeImg} {...unsplashImage(i)} alt="Alt" decoding="async" loading="lazy" />
              </React.Fragment>
            ))}
            {items.map((item, i) => (
              <React.Fragment key={i + items.length}>
                <span>{item}</span>
                <img className={styles.marqueeImg} {...unsplashImage(i)} alt="Alt" decoding="async" loading="lazy" />
              </React.Fragment>
            ))}
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

function unsplashImage(i) {
  return {
    src: `https://source.unsplash.com/random/500x500?sig=${i}`
  };
}
