/* eslint-disable @typescript-eslint/no-explicit-any */
import './style.css'
import { Editor, EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Highlight from '@tiptap/extension-highlight'
import Underline from '@tiptap/extension-underline'
import Placeholder from '@tiptap/extension-placeholder'
import { cn } from '@/utils/cn'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBold,
  faHighlighter,
  faItalic,
  faList,
  faListNumeric,
  faUnderline,
} from '@fortawesome/free-solid-svg-icons'
import Select from 'react-select'
import { useEffect } from 'react'

interface ToolbarProps extends Partial<HTMLElement> {
  editor: Editor
  hasAttachment?: boolean
  hasImage?: boolean
}

const options = [
  { value: '1', label: 'Heading 1' },
  { value: '2', label: 'Heading 2' },
  { value: '3', label: 'Heading 3' },
  { value: '4', label: 'Normal Text' },
]

function Toolbar({ editor, className }: ToolbarProps) {
  const headerChange = (selectedOption: any) => {
    const value = selectedOption.value
    const toRun = editor.chain().focus()
    if (+value < 4)
      toRun.toggleHeading({ level: +value as 1 | 2 | 3 | 4 }).run()
    else toRun.setParagraph().run()
  }

  const findActive = () => {
    for (let level = 1; level < 4; level++) {
      if (editor.isActive('heading', { level }))
        return options.find((opt) => opt.value === String(level))
    }
    return options.find((opt) => opt.value === '4')
  }

  return (
    <div className="mx-0 rounded-t-md border">
      <div className={cn('Toolbar gap-16 bg-background', className)}>
        <Select
          defaultValue={options[3]}
          onChange={headerChange}
          value={findActive()}
          options={options}
          classNamePrefix="react-select"
        />

        <div className="Toolbar items-center gap-8">
          <div
            className={cn('icon', editor.isActive('bold') ? 'is-active' : '')}
            onClick={() => editor.chain().focus().toggleBold().run()}
          >
            <FontAwesomeIcon icon={faBold} />
          </div>
          <div
            className={cn('icon', editor.isActive('italic') ? 'is-active' : '')}
            onClick={() => editor.chain().focus().toggleItalic().run()}
          >
            <FontAwesomeIcon icon={faItalic} />
          </div>
          <div
            className={cn(
              'icon',
              editor.isActive('underline') ? 'is-active' : '',
            )}
            onClick={() => editor.chain().focus().toggleUnderline().run()}
          >
            <FontAwesomeIcon icon={faUnderline} />
          </div>
          <div
            className={cn(
              'icon',
              editor.isActive('highlight') ? 'is-active' : '',
            )}
            onClick={() => editor.chain().focus().toggleHighlight().run()}
          >
            <FontAwesomeIcon icon={faHighlighter} />
          </div>
          <div
            className={cn(
              'icon ml-4',
              editor.isActive('bulletList') ? 'is-active' : '',
            )}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
          >
            <FontAwesomeIcon icon={faList} />
          </div>
          <div
            className={cn(
              'icon',
              editor.isActive('orderedList') ? 'is-active' : '',
            )}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
          >
            <FontAwesomeIcon icon={faListNumeric} />
          </div>
        </div>
      </div>
    </div>
  )
}

interface TiptapProps extends Partial<HTMLElement> {
  content: string
  placeholder?: string
  update?: (e) => void
  toolbarClassName?: string
  hasAttachment?: boolean
  hasImage?: boolean
}

const Tiptap = ({
  content,
  placeholder,
  className,
  toolbarClassName,
  hasAttachment,
  hasImage,
  update,
}: TiptapProps) => {
  const editorProps = {
    attributes: {
      class: cn(
        'mx-0 p-8 border border-t-0 bg-white border-black rounded-b-md border-state-subued border-opacity-30 overflow-y-auto',
        className,
      ),
    },
  }

  const editor = useEditor({
    content,
    editorProps,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Highlight,
      Placeholder.configure({
        placeholder,
      }),
      Underline,
    ],
    onUpdate: ({ editor }) => {
      update(editor.getHTML())
    },
  })

  useEffect(() => {
    if (editor && editor.getHTML() !== content) {
      editor.commands.setContent(content, false)
    }
  }, [content, editor])

  if (!editor) {
    return null
  }

  return (
    <div>
      <Toolbar
        editor={editor}
        className={toolbarClassName}
        hasAttachment={hasAttachment}
        hasImage={hasImage}
      />
      <EditorContent editor={editor} />
    </div>
  )
}

export default Tiptap
