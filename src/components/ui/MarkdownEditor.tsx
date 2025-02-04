import { cn } from '@/lib/utils';
import { forwardRef, useRef, useState } from 'react';
import { TextArea } from './TextArea';
import { Button } from './button';
import {
  Eye,
  Edit,
  Bold,
  Italic,
  Strikethrough,
  Heading2,
  Heading3,
  Link as LinkIcon,
  Code,
  ListOrdered,
  List,
  Quote,
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ToolbarButton {
  icon: React.ElementType;
  name: string;
  syntax: string;
  prefix?: boolean;
}

const toolbarButtons: ToolbarButton[] = [
  { icon: Bold, name: 'Bold', syntax: '**Bold**' },
  { icon: Italic, name: 'Italic', syntax: '*Italic*' },
  { icon: Strikethrough, name: 'Strikethrough', syntax: '~~Strikethrough~~' },

  { icon: Heading2, name: 'H2', syntax: '## ', prefix: true },
  { icon: Heading3, name: 'H3', syntax: '### ', prefix: true },
  { icon: LinkIcon, name: 'Link', syntax: '[Link](url)' },
  { icon: Code, name: 'Code', syntax: '`code`' },
  { icon: ListOrdered, name: 'Ordered List', syntax: '1. ', prefix: true },
  { icon: List, name: 'Bullet List', syntax: '- ', prefix: true },
  { icon: Quote, name: 'Quote', syntax: '> ', prefix: true },
];

export interface MarkdownEditorProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
  helperText?: string;
  preview?: boolean;
  onPreviewToggle?: (isPreview: boolean) => void;
}

const MarkdownEditor = forwardRef<HTMLTextAreaElement, MarkdownEditorProps>(
  (
    {
      className,
      error,
      helperText,
      preview: controlledPreview,
      onPreviewToggle,
      value,
      onChange,
      maxLength,
      ...props
    },
    forwardedRef
  ) => {
    const [internalPreview, setInternalPreview] = useState(false);
    const isPreview = controlledPreview ?? internalPreview;
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const combinedRef = (node: HTMLTextAreaElement) => {
      textAreaRef.current = node;
      if (typeof forwardedRef === 'function') {
        forwardedRef(node);
      } else if (forwardedRef) {
        forwardedRef.current = node;
      }
    };

    const handlePreviewToggle = () => {
      const newPreviewState = !isPreview;
      setInternalPreview(newPreviewState);
      onPreviewToggle?.(newPreviewState);
    };

    const insertMarkdown = (button: ToolbarButton) => {
      if (!textAreaRef.current) return;

      const start = textAreaRef.current.selectionStart;
      const end = textAreaRef.current.selectionEnd;
      const text = textAreaRef.current.value;
      const selectedText = text.substring(start, end);

      let newText;
      if (button.prefix) {
        const lines = selectedText.split('\n');
        const modifiedLines = lines.map((line) => button.syntax + line);
        newText =
          text.substring(0, start) +
          modifiedLines.join('\n') +
          text.substring(end);
      } else {
        const wrapper = button.syntax.split(button.name);
        newText =
          text.substring(0, start) +
          wrapper[0] +
          (selectedText || button.name) +
          wrapper[1] +
          text.substring(end);
      }

      const event = {
        target: {
          name: textAreaRef.current.name,
          value: newText,
        },
      } as React.ChangeEvent<HTMLTextAreaElement>;
      onChange?.(event);
    };

    const renderMarkdown = (content: string) => {
      return (
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          className={cn(
            'prose prose-purple dark:prose-invert max-w-none',
            'prose-h1:text-2xl prose-h1:font-bold',
            'prose-h2:text-xl prose-h2:font-bold',
            'prose-h3:text-lg prose-h3:font-bold',
            'prose-a:text-purple-600 dark:prose-a:text-purple-400',
            'prose-a:no-underline hover:prose-a:underline',
            'prose-ul:list-disc prose-ol:list-decimal',
            'prose-code:bg-purple-100 prose-code:text-purple-900',
            'dark:prose-code:bg-purple-900/30 dark:prose-code:text-purple-300',
            'prose-code:rounded prose-code:px-1',
            'prose-blockquote:border-l-4 prose-blockquote:border-purple-500',
            'prose-blockquote:pl-4 prose-blockquote:italic',
            'prose-table:border-collapse prose-td:border prose-th:border',
            'prose-td:px-3 prose-td:py-2 prose-th:px-3 prose-th:py-2',
            'prose-th:bg-purple-100 dark:prose-th:bg-purple-900/30'
          )}
        >
          {content}
        </ReactMarkdown>
      );
    };

    return (
      <div className='w-full space-y-2'>
        <div className='flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-2'>
          <div className='flex flex-wrap gap-1'>
            {toolbarButtons.map((button) => (
              <Button
                key={button.name}
                type='button'
                variant='ghost'
                size='sm'
                onClick={() => insertMarkdown(button)}
                className='p-2'
                title={button.name}
                disabled={isPreview}
              >
                <button.icon className='h-4 w-4' />
              </Button>
            ))}
          </div>
          <Button
            type='button'
            variant='ghost'
            size='sm'
            onClick={handlePreviewToggle}
            className={cn(
              'flex items-center gap-2',
              isPreview
                ? 'text-purple-500 dark:text-purple-400'
                : 'text-gray-500 dark:text-gray-400'
            )}
          >
            {isPreview ? (
              <>
                <Edit className='h-4 w-4' />
                Edit
              </>
            ) : (
              <>
                <Eye className='h-4 w-4' />
                Preview
              </>
            )}
          </Button>
        </div>

        <div className='relative'>
          {isPreview ? (
            <div
              className={cn(
                'prose prose-purple dark:prose-invert max-w-none',
                'rounded-md border px-3 py-2 min-h-[100px]',
                'bg-white border-gray-200 text-gray-900',
                'dark:bg-purple-800/20 dark:border-purple-400 dark:text-gray-50',
                error &&
                  'border-error-light dark:border-error-dark focus-visible:ring-error-light dark:focus-visible:ring-error-dark',
                className
              )}
            >
              {renderMarkdown(value?.toString() || '')}
            </div>
          ) : (
            <TextArea
              ref={combinedRef}
              error={error}
              value={value}
              onChange={onChange}
              maxLength={maxLength}
              {...props}
            />
          )}
        </div>

        {helperText && (
          <p
            className={cn(
              'text-sm',
              error
                ? 'text-error-light dark:text-error-dark'
                : 'text-gray-500 dark:text-gray-400'
            )}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

MarkdownEditor.displayName = 'MarkdownEditor';

export { MarkdownEditor };
