import React from 'react';
import styles from '@/styles/BookmarkPrompt.module.css';

const BookmarkPrompt = () => {
  return (
    <div className={styles.bookmarkPrompt}>
      <div className={styles.bookmarkContent}>
        <div className={styles.bookmarkIcon}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 3H7C5.9 3 5 3.9 5 5V21L12 18L19 21V5C19 3.9 18.1 3 17 3Z" fill="currentColor" />
          </svg>
        </div>
        <div className={styles.bookmarkText}>
          <p>觉得 1Link 导航很不错？那就按住<span className={styles.bookmarkKey}>Ctrl+D</span>键组合，把<span className={styles.bookmarkSite}>start.1link.fun</span>加入你的浏览器收藏夹吧！</p>
        </div>
      </div>
    </div>
  );
};

export default BookmarkPrompt;