import { Row, Col } from 'antd';
import { DeleteNote, EditNote } from '@/features/noteMenu';
import { Note } from '@/entities/note';
import styles from './styles.module.scss';
import { mockNotes as notes } from '@/mock/notes';

export function NotesList() {
  return (
    <Row
      gutter={[
        { xs: 25, sm: 15, md: 20, lg: 25, xl: 30, xxl: 35 },
        { xs: 25, sm: 15, md: 20, lg: 25, xl: 30, xxl: 35 },
      ]}
    >
      {notes.map((note) => (
        <Col
          className={styles.col}
          key={note.id}
          xs={{ span: 24 }}
          sm={{ span: 12 }}
          lg={{ span: 8 }}
          xl={{ span: 6 }}
        >
          <Note
            actionSlot={[<EditNote key="edit" />, <DeleteNote key="delete" />]}
            {...note}
          />
        </Col>
      ))}
    </Row>
  );
}