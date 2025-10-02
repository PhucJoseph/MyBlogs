import { useRef, useMemo } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { ClassicEditor } from "ckeditor5"; // ✅ use this, not @ckeditor/ckeditor5-build-classic
import PropTypes from "prop-types";
import "./Editor.css";
import { CLOUD_NAME, UPLOAD_PRESET } from "../../constants/const";
import CloudinaryUploadAdapter from "../../config/CloudinaryUploadAdapter";

// ✅ all plugins come from "ckeditor5" (you already listed them correctly)
import {
  Alignment,
  Autoformat,
  AutoImage,
  AutoLink,
  Autosave,
  BlockQuote,
  Bold,
  Bookmark,
  Code,
  Emoji,
  Essentials,
  FindAndReplace,
  FontBackgroundColor,
  FontColor,
  FontFamily,
  FontSize,
  GeneralHtmlSupport,
  Heading,
  Highlight,
  HorizontalLine,
  HtmlComment,
  HtmlEmbed,
  ImageBlock,
  ImageCaption,
  ImageEditing,
  ImageInline,
  ImageInsert,
  ImageInsertViaUrl,
  ImageResize,
  ImageStyle,
  ImageTextAlternative,
  ImageToolbar,
  ImageUpload,
  ImageUtils,
  Indent,
  IndentBlock,
  Italic,
  Link,
  LinkImage,
  List,
  ListProperties,
  MediaEmbed,
  Mention,
  PageBreak,
  Paragraph,
  PasteFromMarkdownExperimental,
  PasteFromOffice,
  RemoveFormat,
  SimpleUploadAdapter,
  SpecialCharacters,
  SpecialCharactersArrows,
  SpecialCharactersCurrency,
  SpecialCharactersEssentials,
  SpecialCharactersLatin,
  SpecialCharactersMathematical,
  SpecialCharactersText,
  Strikethrough,
  Style,
  Subscript,
  Superscript,
  Table,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableProperties,
  TableToolbar,
  TextTransformation,
  TodoList,
  Underline,
} from "ckeditor5";

const LICENSE_KEY = "GPL"; // ✅ fix typo from "GPLs"

export default function TextEditor({
  setContent,
  content,
  isReadOnly = false,
}) {
  const editorContainerRef = useRef(null);
  const editorRef = useRef(null);

  const { editorConfig } = useMemo(() => {
    return {
      editorConfig: {
        toolbar: {
          items: [
            "heading",
            "style",
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
        extraPlugins: [MyCustomUploadPlugin], // 👈 enable custom upload
        plugins: [
          Alignment,
          Autoformat,
          AutoImage,
          AutoLink,
          Autosave,
          BlockQuote,
          Bold,
          Bookmark,
          Code,
          Emoji,
          Essentials,
          FindAndReplace,
          FontBackgroundColor,
          FontColor,
          FontFamily,
          FontSize,
          GeneralHtmlSupport,
          Heading,
          Highlight,
          HorizontalLine,
          HtmlComment,
          HtmlEmbed,
          ImageBlock,
          ImageCaption,
          ImageEditing,
          ImageInline,
          ImageInsert,
          ImageInsertViaUrl,
          ImageResize,
          ImageStyle,
          ImageTextAlternative,
          ImageToolbar,
          ImageUpload,
          ImageUtils,
          Indent,
          IndentBlock,
          Italic,
          Link,
          LinkImage,
          List,
          ListProperties,
          MediaEmbed,
          Mention,
          PageBreak,
          Paragraph,
          PasteFromMarkdownExperimental,
          PasteFromOffice,
          RemoveFormat,
          SimpleUploadAdapter,
          SpecialCharacters,
          SpecialCharactersArrows,
          SpecialCharactersCurrency,
          SpecialCharactersEssentials,
          SpecialCharactersLatin,
          SpecialCharactersMathematical,
          SpecialCharactersText,
          Strikethrough,
          Style,
          Subscript,
          Superscript,
          Table,
          TableCaption,
          TableCellProperties,
          TableColumnResize,
          TableProperties,
          TableToolbar,
          TextTransformation,
          TodoList,
          Underline,
        ],
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
            { name: /^.*$/, styles: true, attributes: true, classes: true },
          ],
        },
        // simpleUpload: {
        //   uploadUrl: `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        //   headers: {
        //     Authorization: "Bearer <token>",
        //   },
        // },
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
          styles: ["inline", "alignLeft", "alignCenter", "alignRight", "wrapText", "breakText"],
          resizeUnit: "px",
        },
        initialData: content || "",
        licenseKey: LICENSE_KEY,
        link: {
          addTargetToExternalLinks: true,
          defaultProtocol: "https://",
          decorators: {
            toggleDownloadable: {
              mode: "manual",
              label: "Downloadable",
              attributes: { download: "file" },
            },
          },
        },
        list: {
          properties: { styles: true, startIndex: true, reversed: true },
        },
        mention: {
          feeds: [
            {
              marker: "@",
              feed: [],
            },
          ],
        },
        menuBar: { isVisible: false },
        placeholder: "Type or paste your content here!",
        style: {
          definitions: [
            { name: "Article category", element: "h3", classes: ["category"] },
            { name: "Title", element: "h2", classes: ["document-title"] },
            { name: "Subtitle", element: "h3", classes: ["document-subtitle"] },
            { name: "Info box", element: "p", classes: ["info-box"] },
            {
              name: "Side quote",
              element: "blockquote",
              classes: ["side-quote"],
            },
            { name: "Marker", element: "span", classes: ["marker"] },
            { name: "Spoiler", element: "span", classes: ["spoiler"] },
            {
              name: "Code (dark)",
              element: "pre",
              classes: ["fancy-code", "fancy-code-dark"],
            },
            {
              name: "Code (bright)",
              element: "pre",
              classes: ["fancy-code", "fancy-code-bright"],
            },
          ],
        },
        table: {
          contentToolbar: [
            "tableColumn",
            "tableRow",
            "mergeTableCells",
            "tableProperties",
            "tableCellProperties",
          ],
        },
      },
      readOnly: isReadOnly,
    };
  }, [content, isReadOnly]);


   function MyCustomUploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return new CloudinaryUploadAdapter(loader, CLOUD_NAME, UPLOAD_PRESET);
    };
  }

  return (
    <div className="main-container">
      <div
        className="editor-container editor-container_classic-editor editor-container_include-style"
        ref={editorContainerRef}
      >
        <div className="editor-container__editor">
          <div ref={editorRef}>
            {ClassicEditor && editorConfig && (
              <CKEditor
                id="CKEditor-ID"
                editor={ClassicEditor}
                config={editorConfig}
                data={content}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setContent(data);
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

TextEditor.propTypes = {
  setContent: PropTypes.func.isRequired,
  content: PropTypes.string,
  isReadOnly: PropTypes.bool,
};
