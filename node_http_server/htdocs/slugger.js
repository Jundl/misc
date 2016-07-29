var _ = require('underscore.string');
module.exports = function(str) {
  return _.slugify(str);
}
