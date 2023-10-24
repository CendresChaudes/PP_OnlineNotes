import { Layout } from 'antd';
import { Footer } from '@/widgets/footer';
import { Header } from '@/widgets/header';
import { NotesList } from '@/widgets/notesList';
import styles from './styles.module.scss';

const { Content } = Layout;

export function MainPage() {
  return (
    <Layout className={styles.layout}>
      <Header />

      <Content className={styles.content}>
        <h1 className="visually-hidden">{'Сервис "Online Notes".'}</h1>
        <NotesList />
      </Content>

      <Footer />
    </Layout>
  );
}
