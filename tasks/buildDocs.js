var fs = require('fs')

var buildComponent = function (componentName, component) {
  var buff = `# ${componentName}\n_${component.description}_\n### Props\n`

  if (component.props) {
    Object.keys(component.props).forEach(function (propName) {
      var prop = component.props[propName]
      buff += `* ${propName} - ${prop.type.name}\n`
    })
  }

  return buff
}

module.exports = function (callback) {
  var docs = require('../docs/doc')
  var components = []

  Object.keys(docs).forEach(function (componentName) {
    var component = docs[componentName]
    components.push(buildComponent(componentName, component))
  })

  fs.writeFile('docs/doc.md', components.join('\n\n'), callback)
}
