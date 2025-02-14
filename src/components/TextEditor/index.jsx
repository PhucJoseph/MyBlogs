import { useState, useEffect, useRef, useMemo } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  ClassicEditor,
  Alignment,
  Autoformat,
  AutoImage,
  AutoLink,
  Autosave,
  BlockQuote,
  Bold,
  Bookmark,
  CKBox,
  CloudServices,
  Code,
  CodeBlock,
  Essentials,
  FindAndReplace,
  FontBackgroundColor,
  FontColor,
  FontFamily,
  FontSize,
  FullPage,
  GeneralHtmlSupport,
  Heading,
  Highlight,
  HorizontalLine,
  HtmlComment,
  HtmlEmbed,
  ImageBlock,
  ImageCaption,
  ImageInline,
  ImageInsert,
  ImageInsertViaUrl,
  ImageResize,
  ImageStyle,
  ImageTextAlternative,
  ImageToolbar,
  ImageUpload,
  Indent,
  IndentBlock,
  Italic,
  Link,
  LinkImage,
  List,
  ListProperties,
  Markdown,
  MediaEmbed,
  Mention,
  PageBreak,
  Paragraph,
  PasteFromMarkdownExperimental,
  PasteFromOffice,
  PictureEditing,
  RemoveFormat,
  ShowBlocks,
  SourceEditing,
  SpecialCharacters,
  SpecialCharactersArrows,
  SpecialCharactersCurrency,
  SpecialCharactersEssentials,
  SpecialCharactersLatin,
  SpecialCharactersMathematical,
  SpecialCharactersText,
  Strikethrough,
  Subscript,
  Superscript,
  Table,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableProperties,
  TableToolbar,
  TextPartLanguage,
  TextTransformation,
  Title,
  TodoList,
  Underline,
  WordCount,
} from "ckeditor5";

import translations from "ckeditor5/translations/vi.js";

import "ckeditor5/ckeditor5.css";

import "./Editor.css";

const LICENSE_KEY =
  "eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NDA1Mjc5OTksImp0aSI6ImQ3OWE0YWRmLTBlY2ItNGQ1YS05MmEzLWI4YjYyNTBjZmVhZiIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiLCJzaCJdLCJ3aGl0ZUxhYmVsIjp0cnVlLCJsaWNlbnNlVHlwZSI6InRyaWFsIiwiZmVhdHVyZXMiOlsiKiJdLCJ2YyI6IjNjY2M4Y2I1In0.4ada7CZlkiW0xarazIcV7zYPMrXTbV9B6Sq3wmC-ZML3ElcxfmVHdD41vLgElYfRqhF8PC5ug0F9bRPI4Hr9Wg";

// const CLOUD_SERVICES_TOKEN_URL =
//   "https://buibhoo0eea9.cke-cs.com/token/dev/269e3e816260c873306e728732e875df4ffb70614c3338e2d11fe21d809c?limit=10";

export default function Editor() {
  const editorContainerRef = useRef(null);
  const editorRef = useRef(null);
  const editorWordCountRef = useRef(null);
  const [isLayoutReady, setIsLayoutReady] = useState(false);
  const editorMenuBarRef = useRef(null);
  const [editorData, setEditorData] = useState("");

  useEffect(() => {
    setIsLayoutReady(true);

    return () => setIsLayoutReady(false);
  }, []);

  const handleSave = async () => {
    console.log(editorData);
  };

  const { editorConfig } = useMemo(() => {
    if (!isLayoutReady) {
      return {};
    }

    return {
      editorConfig: {
        toolbar: {
          items: [
            "sourceEditing",
            "showBlocks",
            "|",
            "heading",
            "|",
            "fontSize",
            "fontFamily",
            "fontColor",
            "fontBackgroundColor",
            "|",
            "bold",
            "italic",
            "underline",
            "|",
            "link",
            "insertImage",
            "insertTable",
            "highlight",
            "blockQuote",
            "codeBlock",
            "|",
            "alignment",
            "|",
            "bulletedList",
            "numberedList",
            "todoList",
            "outdent",
            "indent",
          ],
          shouldNotGroupWhenFull: false,
        },
        plugins: [
          Alignment,
          Autoformat,
          AutoImage,
          AutoLink,
          Autosave,
          BlockQuote,
          Bold,
          Bookmark,
          CKBox,
          CloudServices,
          Code,
          CodeBlock,
          Essentials,
          FindAndReplace,
          FontBackgroundColor,
          FontColor,
          FontFamily,
          FontSize,
          FullPage,
          GeneralHtmlSupport,
          Heading,
          Highlight,
          HorizontalLine,
          HtmlComment,
          HtmlEmbed,
          ImageBlock,
          ImageCaption,
          ImageInline,
          ImageInsert,
          ImageInsertViaUrl,
          ImageResize,
          ImageStyle,
          ImageTextAlternative,
          ImageToolbar,
          ImageUpload,
          Indent,
          IndentBlock,
          Italic,
          Link,
          LinkImage,
          List,
          ListProperties,
          Markdown,
          MediaEmbed,
          Mention,
          PageBreak,
          Paragraph,
          PasteFromMarkdownExperimental,
          PasteFromOffice,
          PictureEditing,
          RemoveFormat,
          ShowBlocks,
          SourceEditing,
          SpecialCharacters,
          SpecialCharactersArrows,
          SpecialCharactersCurrency,
          SpecialCharactersEssentials,
          SpecialCharactersLatin,
          SpecialCharactersMathematical,
          SpecialCharactersText,
          Strikethrough,
          Subscript,
          Superscript,
          Table,
          TableCaption,
          TableCellProperties,
          TableColumnResize,
          TableProperties,
          TableToolbar,
          TextPartLanguage,
          TextTransformation,
          Title,
          TodoList,
          Underline,
          WordCount,
        ],
        // cloudServices: {
        //   tokenUrl: CLOUD_SERVICES_TOKEN_URL,
        // },
        fontFamily: {
          supportAllValues: true,
        },
        fontSize: {
          options: [10, 12, 14, "default", 18, 20, 22],
          supportAllValues: true,
        },
        heading: {
          options: [
            {
              model: "paragraph",
              title: "Paragraph",
              class: "ck-heading_paragraph",
            },
            {
              model: "heading1",
              view: "h1",
              title: "Heading 1",
              class: "ck-heading_heading1",
            },
            {
              model: "heading2",
              view: "h2",
              title: "Heading 2",
              class: "ck-heading_heading2",
            },
            {
              model: "heading3",
              view: "h3",
              title: "Heading 3",
              class: "ck-heading_heading3",
            },
            {
              model: "heading4",
              view: "h4",
              title: "Heading 4",
              class: "ck-heading_heading4",
            },
            {
              model: "heading5",
              view: "h5",
              title: "Heading 5",
              class: "ck-heading_heading5",
            },
            {
              model: "heading6",
              view: "h6",
              title: "Heading 6",
              class: "ck-heading_heading6",
            },
          ],
        },
        htmlSupport: {
          allow: [
            {
              name: /^.*$/,
              styles: true,
              attributes: true,
              classes: true,
            },
          ],
        },
        image: {
          toolbar: [
            "toggleImageCaption",
            "imageTextAlternative",
            "|",
            "imageStyle:inline",
            "imageStyle:wrapText",
            "imageStyle:breakText",
            "|",
            "resizeImage",
          ],
        },
        language: "vi",
        licenseKey: LICENSE_KEY,
        link: {
          addTargetToExternalLinks: true,
          defaultProtocol: "https://",
          decorators: {
            toggleDownloadable: {
              mode: "manual",
              label: "Downloadable",
              attributes: {
                download: "file",
              },
            },
          },
        },
        list: {
          properties: {
            styles: true,
            startIndex: true,
            reversed: true,
          },
        },
        mention: {
          feeds: [
            {
              marker: "@",
              feed: [
                /* See: https://ckeditor.com/docs/ckeditor5/latest/features/mentions.html */
              ],
            },
          ],
        },
        menuBar: {
          isVisible: true,
        },
        placeholder: "Type or paste your content here!",
        table: {
          contentToolbar: [
            "tableColumn",
            "tableRow",
            "mergeTableCells",
            "tableProperties",
            "tableCellProperties",
          ],
        },
        translations: [translations],
      },
    };
  }, [isLayoutReady]);

  // useEffect(() => {
  //   if (editorConfig) {
  //     configUpdateAlert(editorConfig);
  //   }
  // }, [editorConfig]);

  return (
    <div className="main-container">
      <div
        className="editor-container editor-container_classic-editor editor-container_include-word-count"
        ref={editorContainerRef}
      >
        <div className="editor-container__editor">
          <div ref={editorRef}>
            {editorConfig && (
              <CKEditor
                onReady={(editor) => {
                  const wordCount = editor.plugins.get("WordCount");
                  editorWordCountRef.current.appendChild(
                    wordCount.wordCountContainer
                  );

                  editorMenuBarRef.current.appendChild(
                    editor.ui.view.menuBarView.element
                  );
                }}
                onAfterDestroy={() => {
                  Array.from(editorWordCountRef.current.children).forEach(
                    (child) => child.remove()
                  );

                  Array.from(editorMenuBarRef.current.children).forEach(
                    (child) => child.remove()
                  );
                }}
                editor={ClassicEditor}
                config={editorConfig}
                onChange={(event, editor) => {
                  setEditorData(editor.getData()); // Store content as HTML
                }}
              />
            )}
          </div>
        </div>
        <button onClick={handleSave}>Save</button>
        <div
          className="editor_container__word-count"
          ref={editorWordCountRef}
        ></div>
      </div>
      {/* <div dangerouslySetInnerHTML={{ __html: editorData }} /> */}
    </div>
  );
}

/**
 * This function exists to remind you to update the config needed for premium features.
 * The function can be safely removed. Make sure to also remove call to this function when doing so.
 */
// function configUpdateAlert(config) {
//   if (configUpdateAlert.configUpdateAlertShown) {
//     return;
//   }

//   const isModifiedByUser = (currentValue, forbiddenValue) => {
//     if (currentValue === forbiddenValue) {
//       return false;
//     }

//     if (currentValue === undefined) {
//       return false;
//     }

//     return true;
//   };

//   const valuesToUpdate = [];

//   configUpdateAlert.configUpdateAlertShown = true;

//   if (
//     !isModifiedByUser(
//       config.cloudServices?.tokenUrl,
//       "<YOUR_CLOUD_SERVICES_TOKEN_URL>"
//     )
//   ) {
//     valuesToUpdate.push("CLOUD_SERVICES_TOKEN_URL");
//   }

//   if (valuesToUpdate.length) {
//     window.alert(
//       [
//         "Please update the following values in your editor config",
//         "to receive full access to Premium Features:",
//         "",
//         ...valuesToUpdate.map((value) => ` - ${value}`),
//       ].join("\n")
//     );
//   }
// }
