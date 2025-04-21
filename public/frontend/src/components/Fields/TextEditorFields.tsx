import React, {
    ChangeEvent,
    Dispatch,
    forwardRef,
    SetStateAction,
    useEffect,
    useImperativeHandle,
    useRef,
  } from "react";
  
  import { LexicalComposer } from "@lexical/react/LexicalComposer";
  import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
  import { ContentEditable } from "@lexical/react/LexicalContentEditable";
  import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
  import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
  import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
  import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
  import { $getRoot, $createTextNode } from "lexical";
  
  const theme = {};
  
  interface TextEditorFieldsProps {
    initialValue: string;
    onChange: Dispatch<SetStateAction<string>>;
  }
  
  const TextEditorFields = forwardRef((props: TextEditorFieldsProps, ref) => {
    const { initialValue } = props;
  
    const onError = () => null;
  
    const editorRef = useRef<any>(null);
  
    const initialConfig = {
      namespace: "MyEditor",
      theme,
      onError,
      editor__DEPRECATED: (editor) => {
        editorRef.current = editor;
      },
    };
  
    useImperativeHandle(ref, () => ({
      getEditor: () => editorRef.current,
      getText: () => {
        let text = "";
        editorRef.current?.update(() => {
          const root = $getRoot();
          text = root.getTextContent();
        });
        return text;
      },
      setText: (newText: string) => {
        editorRef.current?.update(() => {
          const root = $getRoot();
          root.clear();
          root.append($createTextNode(newText));
        });
      },
    }));
  
    return (
      <LexicalComposer initialConfig={initialConfig}>
        <div className="flex items-center gap-x-3 mb-4 w-full">
          {/* Add buttons if needed */}
        </div>
  
        <RichTextPlugin
          contentEditable={
            <ContentEditable
              className="rounded-md border-2 border-gray-300 px-2 py-2 outline-none"
              placeholder={<p>Buat berita disini</p>}
              aria-placeholder="Buat berita disini"
            />
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <AutoFocusPlugin />
      </LexicalComposer>
    );
  });
  
  export default TextEditorFields;
  