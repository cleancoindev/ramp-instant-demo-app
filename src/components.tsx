import React from 'react';

import styles from './components.module.scss';

export const BetaBanner: React.FC = () => {
  return (
  <div className={styles.betaBanner}>
    This demo app demonstrates a beta version of the Ramp Instant widget.
  </div>);
};

