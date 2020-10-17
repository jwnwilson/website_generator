import React from 'react';
import marked from 'marked'

import './Markdown.css';

const Markdown = (props) => {
  const data = props.data;
  const markdown = marked(data.markdown, {sanitize: true});
  return (
    <section id="markdown" className="bg-white">
      <div className="container mt-0 mt-md-5">
        <h1 className="text-uppercase title">{data.title}</h1>
        <h5 className="text-uppercase">{data.subtitle}</h5>
        <hr></hr>
        <div className="markdown" dangerouslySetInnerHTML={{__html: markdown}}></div>
      </div>
    </section>
  );
}

export default Markdown;
