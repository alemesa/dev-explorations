import React, { memo, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import checkProps from '@jam3/react-check-extra-props';
import { useRouter } from 'next/router';

import { useDispatch } from 'react-redux';

import Nav from '../Nav/Nav';

import { setPrevRoute, setIsWebpSupported } from '../../redux';
import { checkWebpSupport } from '../../utils/detect';

function Layout({ children }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleRouteChange = useCallback(
    (url) => {
      if (router.asPath !== url) dispatch(setPrevRoute(router.asPath));
    },
    [dispatch, router.asPath]
  );

  useEffect(() => {
    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router.events, handleRouteChange]);

  useEffect(() => {
    checkWebpSupport('lossy', (isSupported) => dispatch(setIsWebpSupported(isSupported)));
  }, [dispatch]);

  return (
    <>
      <Nav />
      {children}
    </>
  );
}

Layout.propTypes = checkProps({
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
});

Layout.defaultProps = {};

export default memo(Layout);
