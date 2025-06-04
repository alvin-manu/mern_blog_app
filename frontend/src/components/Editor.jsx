// Editor.jsx
import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default function Editor({ data, onChange }) {
  return (
    <CKEditor
      editor={ClassicEditor}
      data={data}
      onChange={(e, editor) => onChange(e, editor, editor.getData())}
    />
  );
}
