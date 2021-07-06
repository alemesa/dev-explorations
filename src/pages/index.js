import React, { useRef, memo } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import checkProps from '@jam3/react-check-extra-props';
import Link from 'next/link';

import styles from './index.module.scss';

import Head from '../components/Head/Head';

import routes from '../data/routes';

function Landing({ className }) {
  const containerRef = useRef();

  return (
    <main className={classnames(styles.Landing, className)} ref={containerRef}>
      <Head />
      <section className={styles.hero}>
        <h1 className={styles.title}>Glossary</h1>

        <ul className={styles.row}>
          {Object.values(routes).map(({ path, title }) => (
            <li>
              <Link href={path}>
                <a aria-label="Home">{path}</a>
              </Link>
              - {title}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

Landing.propTypes = checkProps({
  className: PropTypes.string
});

Landing.defaultProps = {};

export default memo(Landing);
