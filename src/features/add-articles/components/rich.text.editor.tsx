"use client";

import React, {
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css"; // Import Quill styles

// Define the ref type for the RichTextEditor component
export type RichTextEditorHandle = {
  getContent: () => string;
  setContent: (content: string) => void;
};

const RichTextEditor = forwardRef<RichTextEditorHandle>((_, ref) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    // Prevent multiple initializations
    if (editorRef.current && !initializedRef.current) {
      // Destroy any previous instances first (if they exist)
      if (editorRef.current.querySelector(".ql-toolbar")) {
        // Clean up previous toolbar if it exists
        editorRef.current.innerHTML = "";
      }

      // Create a clean editor container
      const editorContainer = document.createElement("div");
      editorRef.current.appendChild(editorContainer);

      // Initialize Quill
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
        placeholder: "Write something...",
      });

      initializedRef.current = true;
    }

    return () => {
      // Cleanup properly on unmount
      if (quillRef.current) {
        // We don't destroy Quill directly as it doesn't have a clean destroy method
        // Instead, we'll let the DOM cleanup handle it
      }
      initializedRef.current = false;
    };
  }, []);

  // Expose the getContent and setContent functions to the parent component
  useImperativeHandle(ref, () => ({
    getContent: () => {
      if (quillRef.current) {
        return quillRef.current.root.innerHTML; // Return the HTML content
      }
      return "";
    },
    setContent: (content: string) => {
      if (quillRef.current) {
        quillRef.current.clipboard.dangerouslyPasteHTML(content);
      }
    },
  }));

  return (
    <div className="quill-container">
      <div ref={editorRef} style={{ height: "300px" }} />
    </div>
  );
});

RichTextEditor.displayName = "RichTextEditor";
export default RichTextEditor;
