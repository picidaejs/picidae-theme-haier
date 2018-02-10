/**
 * @file: transformer
 * @author: Cuttle Cong
 * @date: 2018/2/10
 * @description:
 */
import React from 'picidae/exports/react'
import { utils } from 'picidae/exports/html-to-react'
import c from 'classname'

export default function (opts) {
  return function (pageData) {
    return [
      {
        replaceChildren: false,
        shouldProcessNode: function (node) {
          return node.name === 'h1'
                 || node.name === 'h2'
                 || node.name === 'h3'
                 || node.name === 'h4'
                 || node.name === 'h5'
                 && 'id' in node.attribs
                 && node.children[0]
                 && node.children[0].name === 'a'
        },
        processNode: function (node, children = [], index) {
          const id = node.attribs['id']
          delete node.attribs['id']
          const link = <a className="anchor" aria-hidden="true" name={id}></a>
          return utils.createElement(node, index, node.data, [link].concat(children))
        }
      },
      {
        replaceChildren: false,
        shouldProcessNode: function (node) {
          return node.name === 'span'
                 && node.attribs['class']
                 && node.attribs['class'].includes('icon-link')
                 && node.attribs['class'].includes('icon')
                 && node.parent && node.parent.name === 'a'
        },
        processNode: function (node, children = [], index) {
          node.parent.attribs['class'] = c(node.parent.attribs['class'], 'hash-link')
          return <svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16">
            <path fillRule="evenodd"
                  d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path>
          </svg>
        }
      }
    ]
  }
}
