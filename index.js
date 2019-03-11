const argParse = require('./utils/argParse.js')
const help = require('./commands/help.js')
const init = require('./commands/init.js')
const train = require('./commands/train.js')
const list = require('./commands/list.js')
const monitor = require('./commands/monitor.js')

module.exports = () => {
  const args = argParse()

  args.add('', help)
  args.add('help', help)
  args.add('init', init)
  args.add('train', train)
  args.add('list', list)
  args.add('monitor', monitor)

  args.parse()
}
