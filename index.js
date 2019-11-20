const visit = require('unist-util-visit')

module.exports = ({ markdownAST }, { language = 'flowchart', theme = 'default' } = {}) => {
  visit(markdownAST, 'code', node => {
    let lang = (node.lang || '').toLowerCase()
    if (lang === language) {
      node.type = 'html'
      node.value = `<div class="flowchart">${node.value}</div>`
    }
  })
}
