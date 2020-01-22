import React from 'react';
import { Form, Input, Button } from 'antd';

const WrappedNoteForm = props => {
  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {

      if (!err) {
        if (!props.isEditing) {
          props.updateNote(values.text);
          props.form.resetFields();
          props.showForm(false);
        } else {
          props.updateNote(values.text);
          props.showForm(false);
        }
      }
    });
  };

  const { getFieldDecorator } = props.form;

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Item>
        {getFieldDecorator('text', {
          rules: [{ required: true, message: 'Please input your note!' }],
        })(
          <Input
            placeholder="Note"
          />,
        )}
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {props.isEditing ? 'Update Note' : 'Add Note'}
        </Button>
        <Button type="danger" onClick={() => props.showForm(false)}>
          Cancel
          </Button>
      </Form.Item>
    </Form>
  );
};

const NoteForm = Form.create({ name: 'note_form' })(WrappedNoteForm);

export default NoteForm;