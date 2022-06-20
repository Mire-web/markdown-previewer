import './App.css';
import {marked} from 'marked';
import {useState, useEffect} from 'react';
import resize from './asset/resize.svg';
import zoom from './asset/expand.png'

function App() {

  const placeholder = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
`;

  const [text, setText] = useState(placeholder);
  const parseToMd=(e)=>{
    e.preventDefault();
    setText(e.target.value);
  }
  const [expand, setExpand] = useState(false)
  const [expandPreview, setExpandPreview] = useState(false)
  marked.setOptions({
      gfm: true,
      breaks: true,
    });

  return (
    <div className="App">
      <div className="input-area" style={expand ? {top:'20px',height:'100vh',overflow:'auto',zIndex:'10'}:{}}>
      <label for="text-input">
      <div className="label">
      <h1 className="h1">Editor</h1>
      <img className='img' src={!expand ? zoom:resize} alt="" onClick={()=>setExpand(!expand)} style={{width:'20px', height:'20px'}}/>
      </div>
        <textarea name="text-input" id="editor" cols="30" rows="10" onChange={parseToMd} defaultValue={text}></textarea>
        </label>
      </div>
      <div className="markdown" id="md" style={expandPreview ? {top:'20px',height:'100vh',overflow:'auto',zIndex:'10'}:{}}>
      <div className="label">
      <h1 className="h1">Previewer</h1>
      <img className="img" src={!expandPreview ? zoom:resize} alt="" onClick={()=>setExpandPreview(!expandPreview)} style={{width:'20px', height:'20px'}}/>
      </div>
      <div className="md" id='preview' dangerouslySetInnerHTML={{__html:marked.parse(text)}}></div>
      </div>
    </div>
  );
}

export default App;
 