import { nanoid } from '@reduxjs/toolkit';
import { Modal, Form, Input, Typography, Button, Flex } from 'antd';
import clsx from 'clsx';
import { ChangeEvent } from 'react';
import { Mode, changeMode, postNote } from '@/entities/note';
import { useBreakpoint, isMobile, useAppDispatch } from '@/shared/lib';
import styles from './styles.module.scss';

const { Title } = Typography;
const { Item } = Form;
const { TextArea } = Input;

export function AddNoteModal() {
  const dispatch = useAppDispatch();
  const currentBreakpoint = useBreakpoint();
  const [form] = Form.useForm();

  const handleTitleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    form.setFieldsValue({ title: evt.target.value });
  };

  const handleTextChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    form.setFieldsValue({ text: evt.target.value });
  };

  const handleFormReset = () => {
    form.resetFields();
  };

  const handleModeChange = () => {
    dispatch(changeMode(Mode.Idle));
  };

  const handleModalClose = () => {
    handleFormReset();
    handleModeChange();
  };

  const handleFormSubmit = ({
    title,
    text,
  }: Pick<INoteData, 'title' | 'text'>) => {
    dispatch(
      postNote([
        {
          id: nanoid(),
          title,
          text,
          date: Date.now(),
        },
        handleModeChange,
      ])
    );
  };

  const buttonSize = isMobile(currentBreakpoint) ? 'large' : 'middle';

  return (
    <Modal open centered footer={false} onCancel={handleModalClose}>
      <Title className={clsx(styles.title, styles['title--center'])} level={2}>
        Новая заметка
      </Title>

      <Form
        form={form}
        layout="vertical"
        autoComplete="off"
        onFinish={handleFormSubmit}
      >
        <Item
          className={styles.label}
          label="Заголовок"
          name="title"
          rules={[{ required: true, message: 'Обязательное поле' }]}
        >
          <Input
            className={styles.input}
            allowClear
            onChange={handleTitleChange}
          />
        </Item>

        <Item
          className={styles.label}
          label="Текст"
          name="text"
          rules={[{ required: true, message: 'Обязательное поле' }]}
        >
          <TextArea
            className={styles.textarea}
            rows={8}
            allowClear
            onChange={handleTextChange}
          />
        </Item>

        <Flex
          className={styles.buttons}
          vertical={isMobile(currentBreakpoint)}
          justify="center"
          gap="middle"
        >
          <Button
            htmlType="submit"
            type="primary"
            size={buttonSize}
          >
            Добавить
          </Button>

          <Button
            htmlType="button"
            type="default"
            size={buttonSize}
            onClick={handleFormReset}
          >
            Сбросить
          </Button>

          <Button
            htmlType="button"
            danger
            size={buttonSize}
            onClick={handleModalClose}
          >
            Отменить
          </Button>
        </Flex>
      </Form>
    </Modal>
  );
}