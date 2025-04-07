import LazyImage from '@/components/LazyImage';
import styles from '@/styles/BookGuide.module.css';
import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { useConfig } from "@/lib/config";
import { getAllPosts } from '@/lib/notion';
import { clientConfig } from '@/lib/server/config';
import BookmarkPrompt from '@/components/BookmarkPrompt';
import SiteInfo from '@/components/SiteInfo';
import LinkStatus from '@/components/LinkStatus';
import DefaultCover from '@/components/DefaultCover';
import SearchComponent from '@/components/SearchComponent';
import { useRouter } from 'next/router';

export async function getStaticProps() {
  const posts = await getAllPosts({ includePages: false, owner: 'resource_nav' })
  // const postsToShow = posts.slice(0, clientConfig.postsPerPage)
  const postsToShow = posts
  const totalPosts = posts.length
  const showNext = totalPosts > clientConfig.postsPerPage
  return {
    props: {
      postsToShow,
      showNext
    },
    revalidate: 1
  }
}

export default function Home({ postsToShow }) {
  const BLOG = useConfig();
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState('zlibrary专栏');

  // 当页面加载完成后，如果URL中有锚点，滚动到对应区域
  useEffect(() => {
    if (router.asPath.includes('#')) {
      const id = router.asPath.split('#')[1];
      scrollToSection(id);
    }
  }, [router.asPath]);

  // 滚动到指定区域
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100; // 偏移量，考虑到固定导航栏的高度
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    setActiveCategory(id);
  };

  // 菜单分类
  const categories = [];
  // 资源网站数据
  const resources = {};

  // 遍历postsToShow，填充菜单和资源网站数据
  postsToShow.forEach(post => {
    if (post.categories && post.categories.length > 0) {
      post.categories.forEach(category => {
        if (!categories.find(cat => cat.id === category)) {
          categories.push({ id: category, name: category });
        }
        // 检查resources[category]是否存在，如果不存在则初始化为空数组
        if (!resources[category]) {
          resources[category] = [];
        }
        resources[category].push({
          id: post.id,
          title: post.title,
          description: post.summary,
          image: post.cover ? "https://gcore.jsdelivr.net/gh/ChrisHyperFunc/static-storage@main" + post.cover : null,
          title: post.title,
          link: post.link,
          tags: post.tags,
          slug: post.slug,
          up: post.up
        });
      });
    }
  });

  return (
    <Layout>
      <div className={styles.container}>
        {/* 顶部横幅 */}
        <div className={styles.hero}>
          <h1 className={styles.heroTitle}>1Link 导航</h1>
          <p className={styles.heroSubtitle}>专注高质量站点导航， 每一条均由人工审核并长期更新</p>
        </div>

        {/* 主内容区域 - 显示资源分类和列表 */}
        <main className={styles.main}>
          {/* 左侧菜单 */}
          <aside className={styles.sidebar}>
            <h2 className={styles.sidebarTitle}>资源分类</h2>
            <ul className={styles.menuList}>
              {categories.map((category) => (
                <li key={category.id} className={styles.menuItem}>
                  <a
                    href={`#${category.id}`}
                    className={`${styles.menuLink} ${activeCategory === category.id ? styles.menuLinkActive : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(category.id);
                    }}
                  >
                    {category.name}
                  </a>
                </li>
              ))}
            </ul>
          </aside>

            {/* 右侧内容区域 */}
            <div className={styles.content}>
              {categories.map((category) => (
                <section key={category.id} id={category.id} className={styles.section}>
                  <h2 className={styles.sectionTitle}>{category.name}</h2>
                  <div className={styles.resourceGrid}>
                    {resources[category.id]?.map((resource, index) => (
                      <div key={index} className={styles.resourceCard}>
                        <a href={`/sites/${resource.slug}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', height: '100%' }}>
                          <div className={styles.cardImage}>
                            {resource.image ? (
                              <LazyImage
                                src={resource.image}
                                alt={`${resource.title} - ${resource.description || '阅读资源'}`}
                                title={resource.title}
                                crossOrigin="anonymous"
                              />
                            ) : (
                              <DefaultCover title={resource.title} />
                            )}
                            {resource.up && resource.up.includes('up') && (
                              <div className={styles.officialRecommend}>✓ 官方推荐</div>
                            )}
                          </div>
                          <div className={styles.cardContent}>
                            <h3 className={styles.cardTitle}>{resource.title}</h3>
                            <p className={styles.cardDescription}>{resource.description}</p>
                            <div className={styles.cardTags}>
                              {resource.tags.map((tag, tagIndex) => (
                                <span key={tagIndex} className={styles.cardTag}>{tag}</span>
                              ))}
                            </div>
                            {/* 添加链接状态指示器 */}
                            <LinkStatus url={resource.link || '#'} />
                            <span className={styles.cardLink}>立即访问</span>
                          </div>
                        </a>
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </main>

          {/* 收藏提示框 */}
          <BookmarkPrompt />

      </div>
    </Layout>
  );
}
