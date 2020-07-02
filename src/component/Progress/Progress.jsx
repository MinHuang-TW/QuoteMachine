import React from 'react';
import styles from './Progress.module.css';

const Progress = () => (
  <div className={styles.loadingioSpinnerWedges}>
    <div className={styles.ldio}>
      <div>
        <div><div /></div>
        <div><div /></div>
        <div><div /></div>
        <div><div /></div>
      </div>
    </div>
  </div>
);

export default Progress;