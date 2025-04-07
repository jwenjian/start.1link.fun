import Image from 'next/image';
import Link from 'next/link';
import styles from '@/styles/Header.module.css';

export default function Header({navBarTitle, fullWidth}) {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          <Image src="/logo.png" alt="readzn.com Logo" width={40} height={40}/>
        </Link>
        <div className={styles.titleContainer}>
          <h1>{navBarTitle || "阅读指南"}</h1>
          <span className={styles.domain}>start.1link.fun</span>
          <span className={styles.slogan}>人工维护的高质量站点导航</span>
        </div>

      </div>
      <nav className={styles.nav}>
        <ul>
          <li><Link title="Home" href="/">首页</Link></li>
          <li><Link title="科技周刊" href="https://1link.fun/" target='_blank'>科技周刊</Link></li>
          <li><Link title="Donate Support" href="/donate-support" target='_blank'>捐赠</Link></li>
          <li><Link title="Contact Us" href="/contact">关于我们</Link></li>
        </ul>
      </nav>
    </header>
  );
}
