"use client";

import React, {
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

export type RichTextEditorHandle = {
  getContent: () => string;
  setContent: (content: string) => void;
  clearContent: () => void;
};

interface EditRichTextEditorProps {
  initialContent?: string;
  onChange?: (content: string) => void;
}

const EditRichTextEditor = forwardRef<
  RichTextEditorHandle,
  EditRichTextEditorProps
>(({ initialContent = "", onChange }, ref) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);

  useEffect(() => {
    if (editorRef.current && !quillRef.current) {
      const editorContainer = document.createElement("div");
      editorRef.current.appendChild(editorContainer);

      quillRef.current = new Quill(editorContainer, {
        theme: "snow",
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
            ["clean"],
          ],
        },
        placeholder: "Write your article content here...",
      });

      // Handle text change
      quillRef.current.on("text-change", () => {
        if (onChange && quillRef.current) {
          onChange(quillRef.current.root.innerHTML);
        }
      });
    }

    return () => {
      if (quillRef.current) {
        quillRef.current.off("text-change");
      }
    };
  }, [onChange]);

  // Ini yang penting: Handle perubahan initialContent setelah editor siap
  useEffect(() => {
    if (quillRef.current && initialContent !== undefined) {
      // Optional: Cek kalau konten editor masih kosong
      const currentContent = quillRef.current.root.innerHTML;
      const emptyContent = "<p><br></p>"; // default kosongnya Quill
      if (currentContent === emptyContent || currentContent.trim() === "") {
        quillRef.current.clipboard.dangerouslyPasteHTML(0, initialContent);
      }
    }
  }, [initialContent]);

  useImperativeHandle(ref, () => ({
    getContent: () => {
      return quillRef.current?.root.innerHTML || "";
    },
    setContent: (content: string) => {
      if (quillRef.current) {
        quillRef.current.clipboard.dangerouslyPasteHTML(0, content);
      }
    },
    clearContent: () => {
      if (quillRef.current) {
        quillRef.current.setText("");
      }
    },
  }));

  return (
    <div className="overflow-hidden rounded-md border border-gray-300 bg-white">
      <div ref={editorRef} style={{ height: "400px" }} />
    </div>
  );
});

EditRichTextEditor.displayName = "EditRichTextEditor";
export default EditRichTextEditor;
