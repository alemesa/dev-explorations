import type { FC } from 'react';
import type { ControllerProps, Marquee } from './PageMarqueeMotion.controller';

import classNames from 'classnames';

import { useRefs } from '@/hooks/use-refs';

import css from './PageMarqueeMotion.module.scss';

export interface ViewProps extends ControllerProps {
  marquees: Marquee[];
}

export type ViewRefs = {
  root: HTMLElement;
};

export const View: FC<ViewProps> = ({ className, marquees }) => {
  const createRef = useRefs<ViewRefs>();
  const rootRef = createRef('root');

  return (
    <main className={classNames('PageMarqueeMotion', css.root, className)} ref={rootRef}>
      <div className={css.container}>
        {marquees.map((marquee) => (
          <MarqueeItem key={marquee.title} marquee={marquee} />
        ))}
      </div>
    </main>
  );
};

View.displayName = 'PageMarqueeMotion_View';

const MarqueeItem: FC<{ marquee: Marquee }> = ({ marquee }) => {
  const repeatedItems = [...marquee.items, ...marquee.items];

  return (
    <article className={css.item}>
      <button className={css.itemLink} type="button">
        {marquee.title}
      </button>
      <div aria-hidden="true" className={css.marquee}>
        <div className={css.marqueeInnerWrap}>
          <div className={css.marqueeInner}>
            {repeatedItems.map((item, index) => (
              <span key={`${item}-${index}`}>
                <strong>{item}</strong>
                <img alt={marquee.imageAlt} loading="lazy" src={marquee.imageSrc} />
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};
