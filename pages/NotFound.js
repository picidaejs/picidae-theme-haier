/**
 * @file: NotFound
 * @author: Cuttle Cong
 * @date: 2018/2/10
 * @description: $END$
 */

import React from 'picidae/exports/react'
import Title from 'react-document-title'

export default class NotFound extends React.Component {

  render() {
    const { themeConfig } = this.props
    return (
      <div className="container">
        <Title title={`404 - ${themeConfig.logo.name}`} />
        <div className="container-404 post">
          <h1>404</h1>
          <p>
            <strong>Not Found</strong>
          </p>
        </div>
      </div>
    )
  }
}
