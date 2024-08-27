// src/app/cheetsheet/html/page.tsx
"use client";
import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { solarizedlight } from "react-syntax-highlighter/dist/esm/styles/prism";

interface HtmlTag {
  name: string;
  description: string;
  example: string;
}

const htmlTags: HtmlTag[] = [
  {
    name: "html",
    description: "The root element of an HTML document.",
    example: "<html lang='en'>...</html>",
  },
  {
    name: "head",
    description: "Contains metadata and links to resources.",
    example: "<head><title>Document</title></head>",
  },
  {
    name: "body",
    description: "Contains the content of the document.",
    example: "<body><h1>Hello World!</h1></body>",
  },
  {
    name: "h1",
    description: "Defines the largest heading.",
    example: "<h1>This is a heading</h1>",
  },
  {
    name: "h2",
    description: "Defines a second-level heading.",
    example: "<h2>This is a subheading</h2>",
  },
  {
    name: "h3",
    description: "Defines a third-level heading.",
    example: "<h3>This is a sub-subheading</h3>",
  },
  {
    name: "p",
    description: "Defines a paragraph.",
    example: "<p>This is a paragraph.</p>",
  },
  {
    name: "a",
    description: "Defines a hyperlink.",
    example: "<a href='https://example.com'>This is a link</a>",
  },
  {
    name: "img",
    description: "Defines an image.",
    example: "<img src='image.jpg' alt='Description'>",
  },
  {
    name: "div",
    description: "Defines a division or section.",
    example: "<div>Content goes here</div>",
  },
  {
    name: "span",
    description: "Defines a section in a document.",
    example: "<span>Inline content</span>",
  },
  {
    name: "ul",
    description: "Defines an unordered list.",
    example: "<ul><li>Item 1</li><li>Item 2</li></ul>",
  },
  {
    name: "ol",
    description: "Defines an ordered list.",
    example: "<ol><li>First item</li><li>Second item</li></ol>",
  },
  {
    name: "li",
    description: "Defines a list item.",
    example: "<li>List item</li>",
  },
  {
    name: "table",
    description: "Defines a table.",
    example: "<table><tr><th>Header</th></tr><tr><td>Data</td></tr></table>",
  },
  {
    name: "tr",
    description: "Defines a row in a table.",
    example: "<tr><td>Row data</td></tr>",
  },
  {
    name: "td",
    description: "Defines a cell in a table.",
    example: "<td>Cell data</td>",
  },
  {
    name: "th",
    description: "Defines a header cell in a table.",
    example: "<th>Header cell</th>",
  },
  {
    name: "form",
    description: "Defines an HTML form for user input.",
    example: "<form><input type='text' name='name'></form>",
  },
  {
    name: "input",
    description: "Defines an input control.",
    example: "<input type='text' name='username'>",
  },
  {
    name: "button",
    description: "Defines a clickable button.",
    example: "<button>Click me</button>",
  },
  {
    name: "label",
    description: "Defines a label for an <input> element.",
    example: "<label for='username'>Username:</label>",
  },
  {
    name: "select",
    description: "Defines a drop-down list.",
    example:
      "<select><option>Option 1</option><option>Option 2</option></select>",
  },
  {
    name: "option",
    description: "Defines an option in a drop-down list.",
    example: "<option value='1'>Option 1</option>",
  },
  {
    name: "textarea",
    description: "Defines a multi-line text input control.",
    example: "<textarea>Text here</textarea>",
  },
  {
    name: "meta",
    description: "Defines metadata about an HTML document.",
    example: "<meta charset='UTF-8'>",
  },
  {
    name: "link",
    description:
      "Defines the relationship between a document and an external resource (most used to link to stylesheets).",
    example: "<link rel='stylesheet' href='styles.css'>",
  },
  {
    name: "script",
    description: "Defines client-side JavaScript.",
    example: "<script src='script.js'></script>",
  },
  {
    name: "style",
    description: "Defines style information for a document.",
    example: "<style>body { background-color: #f0f0f0; }</style>",
  },
  {
    name: "header",
    description: "Defines a header for a document or section.",
    example: "<header><h1>Header Content</h1></header>",
  },
  {
    name: "footer",
    description: "Defines a footer for a document or section.",
    example: "<footer><p>Footer Content</p></footer>",
  },
  {
    name: "article",
    description: "Defines an article.",
    example: "<article><h2>Article Title</h2><p>Article content</p></article>",
  },
  {
    name: "section",
    description: "Defines a section in a document.",
    example: "<section><h2>Section Title</h2><p>Section content</p></section>",
  },
  {
    name: "nav",
    description: "Defines navigation links.",
    example: "<nav><a href='#home'>Home</a><a href='#about'>About</a></nav>",
  },
  {
    name: "aside",
    description: "Defines content aside from the content it is placed in.",
    example: "<aside><p>Aside content</p></aside>",
  },
  {
    name: "main",
    description: "Defines the main content of a document.",
    example: "<main><h1>Main Content</h1></main>",
  },
  {
    name: "details",
    description: "Defines additional details that the user can view or hide.",
    example:
      "<details><summary>More details</summary><p>Details content</p></details>",
  },
  {
    name: "summary",
    description: "Defines a visible heading for a <details> element.",
    example: "<summary>Summary</summary>",
  },
  {
    name: "figure",
    description: "Defines self-contained content, such as illustrations.",
    example:
      "<figure><img src='image.jpg' alt='Image description'><figcaption>Image caption</figcaption></figure>",
  },
  {
    name: "figcaption",
    description: "Defines a caption for a <figure> element.",
    example: "<figcaption>Caption text</figcaption>",
  },

  {
    name: "abbr",
    description: "Defines an abbreviation or acronym.",
    example: "<abbr title='World Health Organization'>WHO</abbr>",
  },
  {
    name: "b",
    description: "Defines bold text.",
    example: "<b>Bold text</b>",
  },
  {
    name: "blockquote",
    description: "Defines a block of text that is a quotation.",
    example: "<blockquote cite='source'>This is a blockquote.</blockquote>",
  },
  {
    name: "cite",
    description: "Defines the title of a work.",
    example: "<cite>Title of Work</cite>",
  },
  {
    name: "code",
    description: "Defines a piece of computer code.",
    example: "<code>console.log('Hello World');</code>",
  },
  {
    name: "del",
    description: "Defines text that has been deleted from a document.",
    example: "<del>This text is deleted.</del>",
  },
  {
    name: "dfn",
    description: "Defines a definition term.",
    example: "<dfn>HTML</dfn> stands for HyperText Markup Language.",
  },
  {
    name: "em",
    description: "Defines emphasized text.",
    example: "<em>This is emphasized text.</em>",
  },
  {
    name: "i",
    description: "Defines italic text.",
    example: "<i>This is italic text.</i>",
  },
  {
    name: "kbd",
    description: "Defines keyboard input.",
    example: "<kbd>Ctrl + C</kbd>",
  },
  {
    name: "mark",
    description: "Defines marked or highlighted text.",
    example: "<mark>Highlighted text</mark>",
  },
  {
    name: "meter",
    description: "Defines a scalar measurement within a known range.",
    example: "<meter value='0.6' min='0' max='1'>60%</meter>",
  },
  {
    name: "pre",
    description: "Defines preformatted text.",
    example: "<pre>  Preformatted text  </pre>",
  },
  {
    name: "progress",
    description: "Defines the progress of a task.",
    example: "<progress value='70' max='100'>70%</progress>",
  },
  {
    name: "q",
    description: "Defines a short inline quotation.",
    example: "<q>This is a quotation.</q>",
  },
  {
    name: "rp",
    description:
      "Defines what to show in browsers that do not support ruby annotations.",
    example: "<ruby>漢字<rp>(</rp><rt>kanji</rt><rp>)</rp></ruby>",
  },
  {
    name: "rt",
    description:
      "Defines an explanation or pronunciation of characters (used with <ruby>).",
    example: "<ruby>漢字<rt>kanji</rt></ruby>",
  },
  {
    name: "ruby",
    description: "Defines a ruby annotation (for East Asian typography).",
    example: "<ruby>漢字<rt>kanji</rt></ruby>",
  },
  {
    name: "s",
    description: "Defines text that is no longer accurate or relevant.",
    example: "<s>This text is no longer accurate.</s>",
  },
  {
    name: "samp",
    description: "Defines sample output from a computer program.",
    example: "<samp>Sample output</samp>",
  },
  {
    name: "small",
    description: "Defines smaller text.",
    example: "<small>This is smaller text.</small>",
  },
  {
    name: "strong",
    description: "Defines important text.",
    example: "<strong>This is important text.</strong>",
  },
  {
    name: "sub",
    description: "Defines subscripted text.",
    example: "<sub>Subscript</sub>",
  },
  {
    name: "sup",
    description: "Defines superscripted text.",
    example: "<sup>Superscript</sup>",
  },
  {
    name: "time",
    description: "Defines a specific time (or a range of time).",
    example: "<time datetime='2024-01-01'>January 1, 2024</time>",
  },
  {
    name: "u",
    description:
      "Defines text that should be stylistically different from normal text.",
    example: "<u>Underlined text</u>",
  },
  {
    name: "var",
    description:
      "Defines a variable in a mathematical expression or a programming context.",
    example: "<var>x</var> is a variable.",
  },
  {
    name: "wbr",
    description: "Defines an optional line break.",
    example: "<wbr>Optional line break here",
  },
  {
    name: "iframe",
    description: "Defines an inline frame.",
    example:
      "<iframe src='https://example.com' width='600' height='400'></iframe>",
  },
  {
    name: "noscript",
    description:
      "Defines an alternative content for users that have disabled JavaScript.",
    example: "<noscript>Your browser does not support JavaScript.</noscript>",
  },
  {
    name: "source",
    description:
      "Defines multiple media resources for elements such as <video> and <audio>.",
    example: "<source src='video.mp4' type='video/mp4'>",
  },
  {
    name: "track",
    description: "Defines text tracks for <video> and <audio> elements.",
    example:
      "<track src='subtitles_en.vtt' kind='subtitles' srclang='en' label='English'>",
  },
  {
    name: "object",
    description:
      "Defines an embedded object, such as a video, audio, image, or a plugin.",
    example: "<object data='video.mp4' type='video/mp4'></object>",
  },
  {
    name: "param",
    description: "Defines parameters for an <object> element.",
    example: "<param name='autoplay' value='true'>",
  },
  {
    name: "embed",
    description:
      "Defines an embedded object, such as a video or interactive content.",
    example:
      "<embed src='interactive.swf' type='application/x-shockwave-flash'>",
  },
  {
    name: "map",
    description: "Defines a client-side image map.",
    example:
      "<map name='image-map'><area shape='rect' coords='34,44,270,350' href='https://example.com'></map>",
  },
  {
    name: "area",
    description: "Defines a clickable area within an image map.",
    example:
      "<area shape='rect' coords='34,44,270,350' href='https://example.com'>",
  },
  {
    name: "text",
    description: "Defines a single-line text input.",
    example:
      "<input type='text' name='username' placeholder='Enter your username'>",
  },
  {
    name: "password",
    description: "Defines a password input (characters are masked).",
    example:
      "<input type='password' name='password' placeholder='Enter your password'>",
  },
  {
    name: "email",
    description:
      "Defines an input for email addresses. Provides validation for email format.",
    example: "<input type='email' name='email' placeholder='Enter your email'>",
  },
  {
    name: "number",
    description:
      "Defines an input for numeric values. Allows setting a range with min and max attributes.",
    example:
      "<input type='number' name='quantity' min='1' max='10' placeholder='Enter quantity'>",
  },
  {
    name: "range",
    description: "Defines a slider control for selecting a value from a range.",
    example: "<input type='range' name='volume' min='0' max='100' value='50'>",
  },
  {
    name: "date",
    description:
      "Defines an input for date values. Provides a date picker in some browsers.",
    example: "<input type='date' name='birthdate'>",
  },
  {
    name: "time",
    description:
      "Defines an input for time values. Provides a time picker in some browsers.",
    example: "<input type='time' name='appointment-time'>",
  },
  {
    name: "datetime-local",
    description:
      "Defines an input for date and time values, allowing the user to select both date and time.",
    example: "<input type='datetime-local' name='meeting-datetime'>",
  },
  {
    name: "month",
    description: "Defines an input for selecting a month and year.",
    example: "<input type='month' name='birthmonth'>",
  },
  {
    name: "week",
    description: "Defines an input for selecting a week and year.",
    example: "<input type='week' name='week-number'>",
  },
  {
    name: "file",
    description: "Defines an input for selecting files from the user's device.",
    example: "<input type='file' name='profile-picture'>",
  },
  {
    name: "checkbox",
    description:
      "Defines a checkbox input. Allows users to select one or more options from a set.",
    example:
      "<input type='checkbox' name='subscribe' value='newsletter'> Subscribe to newsletter",
  },
  {
    name: "radio",
    description:
      "Defines a radio button input. Allows users to select one option from a set.",
    example:
      "<input type='radio' name='gender' value='male'> Male<br><input type='radio' name='gender' value='female'> Female",
  },
  {
    name: "button",
    description: "Defines a clickable button.",
    example: "<input type='button' value='Click Me'>",
  },
  {
    name: "submit",
    description: "Defines a button that submits a form.",
    example: "<input type='submit' value='Submit'>",
  },
  {
    name: "reset",
    description:
      "Defines a button that resets all the fields in a form to their default values.",
    example: "<input type='reset' value='Reset'>",
  },
  {
    name: "hidden",
    description:
      "Defines an input that is not visible to the user but is included in the form submission.",
    example: "<input type='hidden' name='userId' value='12345'>",
  },
  {
    name: "color",
    description:
      "Defines an input for selecting a color. Provides a color picker in some browsers.",
    example: "<input type='color' name='favorite-color' value='#ff0000'>",
  },
  {
    name: "tel",
    description:
      "Defines an input for telephone numbers. Provides validation for telephone number format.",
    example:
      "<input type='tel' name='phone' placeholder='Enter your phone number'>",
  },
  {
    name: "url",
    description:
      "Defines an input for URLs. Provides validation for URL format.",
    example:
      "<input type='url' name='website' placeholder='Enter your website URL'>",
  },
  {
    name: "search",
    description:
      "Defines an input for search queries. Provides a search field with optional search suggestions.",
    example: "<input type='search' name='search' placeholder='Search...'>",
  },
];

const CheetSheetHTML = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        HTML Cheat Sheet
      </h1>
      <div className="bg-gray-100 p-4 rounded-lg shadow-md">
        {htmlTags.map((tag, index) => (
          <div key={index} className="mb-6 p-4 bg-white rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold mb-2 text-gray-800">
              {tag.name}
            </h2>
            <p className="text-gray-600 mb-2">{tag.description}</p>
            <div className="flex items-center justify-between p-2 bg-gray-200 rounded-md">
              <SyntaxHighlighter
                language="html"
                style={solarizedlight}
                className="text-sm"
              >
                {tag.example}
              </SyntaxHighlighter>
              <CopyToClipboard text={tag.example}>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                  Copy
                </button>
              </CopyToClipboard>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheetSheetHTML;
