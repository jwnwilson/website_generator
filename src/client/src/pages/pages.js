import React from 'react'

export default class PageList extends React.Component {

render() {
    return (
        <div>
          <h1>Pages</h1>
          {
            this.props.data.allPage.edges.map((edge, index) => {
              const page = edge.node;
              console.log("page", page);
              return (
                <div key={page.id}>
                  <a href={page.url}>{page.title}</a>
                </div>
              )
            })
          }
        </div>
      );
    }
}

export const query = graphql`
  query MyQuery {
    allPage{
      edges{
        node{
          id,
          title,
          url
        }
      }
    }
  }
`