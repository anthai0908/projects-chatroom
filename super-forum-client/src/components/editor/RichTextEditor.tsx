import React, {useState, useCallback, useMemo, useEffect, FC} from "react";
import {Editable, withReact, useSlate, Slate, ReactEditor} from "slate-react";
import {
    Descendant,
    Editor,
    Transforms,
    createEditor,
    BaseEditor,
    Node,
    EditorMarks,
  } from 'slate';
import isHotkey from "is-hotkey";
import { HistoryEditor, withHistory } from "slate-history";
import {Button, Toolbar} from "./RichTextControl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./RichTextEditor.css";
import { faBold, faCode, faHeading, faItalic, faList, faListOl, faListUl, faQuoteRight, faUnderline } from "@fortawesome/free-solid-svg-icons";
import { split } from "lodash";
import { RenderElementProps, RenderLeafProps } from "slate-react";
export const getTextFromNodes = (nodes: Node[]) => {
  return nodes.map((n: Node)=> Node.string(n)?? "").join("\n");
}
const HOTKEYS : {[keyName: string] : string} = {
    "mod+b": "bold",
    "mod+i": "italic",
    "mod+u": "underline",
    "mod+`": "code",
};



export type CustomText = {
    text: string;
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    code?: boolean;
    [key: string]: boolean | string | undefined; // Allow additional dynamic properties
  };

  export type CustomEditor = BaseEditor &
  ReactEditor &
  HistoryEditor & {
    nodeToDecorations?: Map<Element, Range[]>
  }

export interface CustomElement {
  type: string; // Allowed block types
  children: CustomText[]; // Must have children
}

declare module "slate" {
  interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

const initialValue: Descendant[] = [
    {
      type: "paragraph", // No more "Property 'type' does not exist" error!
      children: [{ text: "" }],
    },
  ];
  
const LIST_TYPES = ["numbered-list", "bulleted-list"];

class RichEditorProps {
  existingBody?: string;
  readOnly?: boolean;
  sendOutBody?: (body: Node[]) => void;
}

const RichEditor: FC<RichEditorProps> = ({ existingBody, readOnly = false, sendOutBody}) => {
  const [value, setValue] = useState<Descendant[]>([
  { type: 'paragraph', children: [{ text: '' }] }
]);
  const renderElement = useCallback((props: RenderElementProps) => <Element {...props} />, []);
  const renderLeaf = useCallback((props: RenderLeafProps) => <Leaf {...props} />, []);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  console.log(existingBody);
  useEffect(() => {
  if (existingBody) {
    try {
      const parsed = JSON.parse(existingBody);
      if (Array.isArray(parsed)) {
        setValue(parsed);
      } else {
        throw new Error("Not an array");
      }
    } catch (err) {
      console.warn("Invalid Slate JSON format. Using fallback body instead.", existingBody);
      const fallbackValue = [
        {
          type: "paragraph",
          children: [{ text: existingBody }],
        },
      ];
      setValue(fallbackValue);
      console.log("Using fallback value:", fallbackValue);
    }
  }
}, [existingBody]);
  useEffect(() => {
  console.log("Current Slate value:", value);
}, [value]);
  const onChangeEditorValue = (newValue: Descendant[]) => {
    setValue(newValue);
    sendOutBody && sendOutBody(newValue);
  };

  return (
      <Slate editor={editor} initialValue={value} onValueChange={onChangeEditorValue} key = {JSON.stringify(value)}>
          {readOnly? null : <Toolbar>
              <MarkButton format = "bold" icon = "bold"/>
              <MarkButton format ="italic" icon = "italic"/>
              <MarkButton format ="underline" icon = "underlined"/>
              <MarkButton format ="code" icon = "code"/>
              <BlockButton format = "heading-one" icon = "header1"/>
              <BlockButton format = "block-quote" icon ="in_quotes"/>
              <BlockButton format = "numbered-list" icon ="list_numbered"/>
              <BlockButton format = "bulleted-list" icon ="list_bulleted"/>
          </Toolbar>}
          <Editable
          className="editor"
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder = "Enter some rich text..."
          spellCheck
          autoFocus
          onKeyDown={(event)=>{
            console.log(event)
              for (const hotkey in HOTKEYS){
                  if(isHotkey(hotkey, event as any)){
                      event.preventDefault();
                      const mark = HOTKEYS[hotkey];
                      toggleMark(editor, mark);
                  }
              }
          }}
          readOnly = {readOnly}
          />
      </Slate>
  )
}

const MarkButton= ({format, icon} : {format: string; icon : string}) => {
    const editor = useSlate();
    
    let thisIcon = faBold;
        if (icon === "italic") {
            thisIcon = faItalic;
        } 
        else if (icon === "underlined") {
            thisIcon = faUnderline;
        } 
        else if (icon === "code") {
            thisIcon = faCode;
        }
    return (
        <Button 
        active = {isMarkActive(editor, format)}
        onMouseDown = {(event: any)=>{
            event.preventDefault();
            toggleMark(editor, format);
        }}
        >
            <FontAwesomeIcon icon={thisIcon}/>
        </Button>
    )
};

const isMarkActive = (editor: CustomEditor, format: string) => {
    const marks = Editor.marks(editor);
    return marks ? marks[format] === true : false;
  };
  
const toggleMark = (editor: CustomEditor, format: string) => {
    const isActive = isMarkActive(editor, format);
    if (isActive){
        Editor.removeMark(editor, format);
    }
    else{
        Editor.addMark(editor, format, true);
    }
}

const BlockButton= ({format, icon}: {format: string, icon: string}) => {
    const editor = useSlate();
    let thisIcon = faHeading;
    if (icon === "heading1") {
      thisIcon = faItalic;
    } 
    else if (icon === "heading2") {
      thisIcon = faUnderline;
    } 
    else if (icon === "in_quotes") {
      thisIcon = faQuoteRight;
    } 
    else if (icon === "list_numbered") {
      thisIcon = faListOl;
    } 
    else if (icon === "list_bulleted") {
      thisIcon = faListUl;
    }
    return (
        <Button
        active = {isBlockActive(editor, format)}
        onMouseDown = {
            (event: any) =>{
                event.preventDefault();
                toggleBlock(editor, format);
            }
        }
        >
            <FontAwesomeIcon icon = {thisIcon}/>
        </Button>
    )
};

const isBlockActive = (editor: CustomEditor, format: string) => {
    const [match] = Editor.nodes(editor, {
      match: (n) => {
        const node = n as CustomElement;
        return node.type === format;
      },
    });
  
    return !!match;
  };

  const toggleBlock = (editor: CustomEditor, format: string) => {
    const isActive = isBlockActive(editor, format);
    const isList = LIST_TYPES.includes(format);
  
    Transforms.unwrapNodes(editor, {
      match: (n) => {
        const node = n as CustomElement;
        return LIST_TYPES.includes(node.type as string); // Return the condition
      },
      split: true, // This is correctly placed here
    });

    Transforms.setNodes(editor, {
        type: isActive ? "paragraph" : isList? "list-item" : format,
    })

    if(!isActive && isList) {
        const block = { type: format, children : []};
        Transforms.wrapNodes(editor, block)
    }
};

const Element =({
    attributes,
    children,
    element,
} : {
    attributes: any,
    children: any,
    element: any,
}) => {
    switch (element.type) {
        case "block-quote": 
            return <blockquote {...attributes} >{children} </blockquote>;
        case "bulleted-list":
            return <ul {...attributes}>{children}</ul>
        case "heading-one":
            return <h1 {...attributes}>{children}</h1>
        case "heading-two":
            return <h2 {...attributes}>{children}</h2>
        case "list-item":
            return <li {...attributes}>{children}</li>
        case "numbered-list":
            return <ol {...attributes}>{children}</ol>
        default:
            return <p {...attributes}>{children}</p>
    }
};

const Leaf = ({
    attributes,
    children,
    leaf,
}: {
    attributes: any;
    children: any;
    leaf: any,
}) => {
    if (leaf.bold){
        children = <strong>{children}</strong>
    }
    if (leaf.code){
        children = <code>{children}</code>
    }
    if (leaf.italic){
        children = <em>{children}</em>
    }
    if (leaf.underline){
        children = <u>{children}</u>
    }

    return <span {...attributes}>{children}</span>
};

export default RichEditor;
