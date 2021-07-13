import React from 'react';
import classnames from 'classnames';
import checkProps from '@jam3/react-check-extra-props';
import Link from 'next/link';

import { HomeIcon } from '@radix-ui/react-icons';
import styles from './Nav.module.scss';

function Nav() {
  return (
    <nav className={classnames(styles.Nav)}>
      <div className={styles.wrapper}>
        <Link href="/">
          <a aria-label="Home">
            <HomeIcon />
          </a>
        </Link>
      </div>
    </nav>
  );
}

Nav.propTypes = checkProps({});

Nav.defaultProps = {};

export default Nav;
