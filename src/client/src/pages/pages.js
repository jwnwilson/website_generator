import React from 'react'

export default class PageList extends React.Component {

render() {
    return (
        <div>
          <h1>Pages</h1>
          {
            this.props.data.allPage.edges.map((edge, index) => {
              const product = edge.node
              return (
                <div key={product.id}>{product.title}</div>
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
          title
        }
      }
    }
  }
`