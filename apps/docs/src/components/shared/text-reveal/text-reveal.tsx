import { useInViewport } from 'ahooks';
import {
  CSSProperties, useRef,
} from 'react';

import * as styles from './text-reveal.module.css';

export type TextRevealProps = {
  xOffset?: string;
}

export const TextReveal: FCChildrenClass<TextRevealProps> = ({
  children,
  className,
  xOffset = '-10%',
  style,
  ...otherProps
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [inViewport] = useInViewport(ref, {
    threshold: [0, 0.5],
  });

  const dynamicStyle: CSSProperties = {
    '--x': xOffset,
  };

  return (
    <span
      ref={ref}
      className={styles.TextReveal}
      data-text-reveal-is-running={inViewport}
      style={{ ...dynamicStyle, ...style }}
      {...otherProps}
    >
      {children}
    </span>
  );
};
