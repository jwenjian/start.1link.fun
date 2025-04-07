import Head from 'next/head';
import Image from 'next/image';
import Layout from '@/components/Layout';
import styles from '@/styles/ContactUs.module.css';
import { useConfig } from '@/lib/config';
import DonationRanking from '@/components/DonationRanking';

export default function Donate() {
  const BLOG = useConfig();
  return (
    <Layout>
      <Head>
        <title>捐赠支持 - 1Link 导航</title>
        <meta name="description" content="通过捐赠支持 1Link 导航，帮助我们持续提供优质的电子书资源导航和阅读工具服务。" />
      </Head>

      <div className={styles.contactContainer}>
        <div className={styles.contactHeader}>
          <h1>捐赠支持</h1>
          <p>您的支持是我们前进的动力</p>

          <div className={styles.aboutUs}>
            <h2>关于捐赠</h2>
            <p>1Link 导航目前是一个完全免费的平台，我们致力于为广大读者提供优质的电子书资源和阅读工具服务。</p>
            <p>如果您觉得我们的服务对您有所帮助，欢迎通过以下方式支持我们的工作（留下您的名字），让我们能够持续提供更好的服务。</p>

            <div style={{ display: 'flex', justifyContent: 'center', margin: '30px 0' }}>
              <div style={{ textAlign: 'center' }}>
                <Image
                  src="https://gcore.jsdelivr.net/gh/ChrisHyperFunc/readzn@main/zhan-shang.jpg"
                  alt="赞赏码"
                  width={300}
                  height={300}
                  style={{ borderRadius: '8px' }}
                />
                <p style={{ marginTop: '10px', fontSize: '0.9em', color: '#666' }}>使用微信扫描上方二维码进行捐赠</p>
              </div>
            </div>

            <h2>捐赠用途</h2>
            <p>您的每一笔捐赠都将用于：</p>
            <ul>
              <li>域名和服务器维护费用</li>
              <li>网站功能开发和优化</li>
              <li>内容资源的收集和整理</li>
              <li>开源工具的开发和维护</li>
            </ul>

            <h2>特别感谢</h2>
            <p>感谢每一位支持阅读指南的朋友，您的鼓励是我们前进的最大动力！</p>
            <p>我们会定期在此页面更新捐赠记录，以表达我们的感谢。</p>

            {/* 捐赠排行榜组件 */}
            <DonationRanking />
          </div>
        </div>

        <div className={styles.contactInfo}>
          <h2>联系我们</h2>
          <p>如有任何关于捐赠的疑问，请通过以下方式联系我们：</p>
          <a href={`mailto:${BLOG.email}`} className={styles.emailLink}>{BLOG.email}</a>
          <p className="responseNote">我们承诺在48小时内回复您的消息。</p>
        </div>
      </div>
    </Layout>
  );
}
