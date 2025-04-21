import { Fragment } from "react";

export default function formatNotesToJSX(text) {
  const lines = text.split('\n');
  const elements = [];
  let listItems = [];
  let count = 0

  lines.forEach((line, index) => {
    line = line.trim();
    if (!line) return;

    if (/^[IVXLCDM]+\./.test(line)) {
      // Heading level 2
      if (listItems.length) {
        elements.push(<ul key={`ul-${index}`}>{listItems}</ul>);
        listItems = [];
      }
    count++
      elements.push(<h2 key={`h2-${index}`}> { count } : {line.replace(/^[IVXLCDM]+\.\s*/, '')}</h2>);
    } else if (line.endsWith(':')) {
      // Heading level 3
      if (listItems.length) {
        elements.push(<ul key={`ul-${index}`}>{listItems}</ul>);
        listItems = [];
      }
      elements.push(<h3 key={`h3-${index}`}>{line.replace(/:$/, '')}</h3>);
    } else if (/^[-•*]/.test(line)) {
      // List item
      listItems.push(<li key={`li-${index}`}>{line.replace(/^[-•*]\s*/, '')}</li>);
    } else {
      // Paragraph
      if (listItems.length) {
        elements.push(<ul key={`ul-${index}`}>{listItems}</ul>);
        listItems = [];
      }
      elements.push(<p key={`p-${index}`}>{line}</p>);
    }
  });

  if (listItems.length) {
    elements.push(<ul>{listItems}</ul>);
  }

  return <Fragment>{elements}</Fragment>;
}
