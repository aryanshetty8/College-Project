"use client";

import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";

import { useTheme } from "next-themes";
import { useEdgeStore } from "@/lib/edgestore";

interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;

  // 🔔 REQUIRED REMINDER HANDLER
  onSetReminder: () => void;
}

const Editor = ({
  onChange,
  initialContent,
  editable,
  onSetReminder,
}: EditorProps) => {
  const { resolvedTheme } = useTheme();
  const { edgestore } = useEdgeStore();

  const handleUpload = async (file: File) => {
    const res = await edgestore.publicFiles.upload({ file });
    return res.url;
  };

  const editor: BlockNoteEditor = useBlockNote({
    editable,
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,
    onEditorContentChange: (editor) => {
      onChange(JSON.stringify(editor.topLevelBlocks, null, 2));
    },
    uploadFile: handleUpload,
  });

  return (
    <div className="relative">
      {/* 🔔 REMINDER BUTTON */}
      <div className="flex justify-end mb-2">
        <button
          onClick={onSetReminder}
          className="px-3 py-1 text-sm rounded bg-gray-700 text-white hover:bg-gray-600"
        >
          ⏰ Set Reminder
        </button>
      </div>

      {/* 📝 BLOCKNOTE EDITOR */}
      <BlockNoteView
        editor={editor}
        theme={resolvedTheme === "dark" ? "dark" : "light"}
      />
    </div>
  );
};

export default Editor;
