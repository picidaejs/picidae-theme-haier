/**
 * @file: Markdown
 * @author: Cuttle Cong
 * @date: 2018/2/10
 * @description:
 */
import React from 'react'
import collect from 'picidae-tools/browser/collect'

@collect()
export default class Markdown extends React.PureComponent {
  render() {
    const { render } = this.props

    return (
      <div className='docMainWrapper wrapper'>
        <div className='container mainContainer documentContainer postContainer'>
          <div className='wrapper'>
            <div className='post'>
              {render()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
