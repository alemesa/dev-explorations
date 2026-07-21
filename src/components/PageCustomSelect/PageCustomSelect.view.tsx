import type { FC } from 'react';
import type { ControllerProps, SelectOption } from './PageCustomSelect.controller';

import { useGSAP } from '@gsap/react';
import classNames from 'classnames';
import { gsap } from 'gsap';

import { useRef } from 'react';

import { useRefs } from '@/hooks/use-refs';

import css from './PageCustomSelect.module.scss';

gsap.registerPlugin(useGSAP);

export interface ViewProps extends ControllerProps {
  options: SelectOption[];
}

export type ViewRefs = {
  root: HTMLElement;
};

export const View: FC<ViewProps> = ({ className, options }) => {
  const createRef = useRefs<ViewRefs>();
  const rootRef = createRef('root');
  const rootElement = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
      }

      gsap.from('[data-intro]', {
        autoAlpha: 0,
        duration: 0.64,
        ease: 'power3.out',
        stagger: 0.12,
        y: 18,
      });
    },
    { scope: rootElement },
  );

  const setRootRef = (element: HTMLElement | null) => {
    rootRef(element);
    rootElement.current = element;
  };

  return (
    <main className={classNames('PageCustomSelect', css.root, className)} ref={setRootRef}>
      <section aria-labelledby="custom-select-title" className={css.content}>
        <p className={css.eyebrow} data-intro>
          Base select exploration
        </p>
        <h1 data-intro id="custom-select-title">
          Choose a country.
        </h1>
        <p className={css.description} data-intro>
          A real native select, with flags and rich option content in browsers that support{' '}
          <code>appearance: base-select</code>.
        </p>
        <label className={css.label} data-intro htmlFor="country">
          Country
        </label>
        <select
          aria-describedby="custom-select-note"
          className={css.select}
          data-intro
          dangerouslySetInnerHTML={{ __html: createSelectMarkup(options) }}
          id="country"
          name="country"
        />
        <p className={css.note} data-intro id="custom-select-note">
          It falls back to the platform select when customizable selects are unavailable.
        </p>
      </section>
    </main>
  );
};

View.displayName = 'PageCustomSelect_View';

const createSelectMarkup = (options: SelectOption[]) => {
  return [
    `<button class="${css.trigger}" type="button"><selectedcontent></selectedcontent></button>`,
    ...options.map(
      ({ description, icon, label, value }) => `
        <option class="${css.option}" value="${escapeHtml(value)}">
          <span aria-hidden="true" class="${css.optionIcon}">${escapeHtml(icon)}</span>
          <span class="${css.optionCopy}">
            <strong>${escapeHtml(label)}</strong>
            <small>${escapeHtml(description)}</small>
          </span>
        </option>
      `,
    ),
  ].join('');
};

const escapeHtml = (value: string) => {
  return value.replace(/[&<>"']/g, (character) => {
    switch (character) {
      case '&':
        return '&amp;';
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '"':
        return '&quot;';
      case "'":
        return '&#039;';
      default:
        return character;
    }
  });
};
