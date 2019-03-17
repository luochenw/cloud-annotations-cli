const bar = ['#', '-']

module.exports = class ProgressBar {
  constructor(total) {
    this.total = total
    this.current = 0
    this.rateAcc = []
  }

  stop() {
    process.stdout.clearLine()
    process.stdout.cursorTo(0)
  }

  applyRateInfo(rate) {
    this.rateAcc.push(rate)
  }

  getAvgRate() {
    return (
      this.rateAcc.reduce((acc, item) => {
        acc += parseFloat(item)
        return acc
      }, 0) / this.rateAcc.length
    )
  }

  update(current) {
    this.current = current

    const rate = this.getAvgRate()

    let unit = ''
    let eta = '???'

    if (rate > 0) {
      unit = 'sec'
      eta = (1 / rate) * (this.total - this.current)
      if (eta >= 60) {
        unit = 'mins'
        eta = eta / 60
        if (eta >= 60) {
          unit = 'hrs'
          eta = eta / 60
        }
      }
      eta = Math.round(eta)
    }

    const percent = Math.min(Math.max(this.current / this.total), 1)
    const progress = ` ${this.current}/${this.total} | ETA: ${eta} ${unit}`

    const width = Math.max(0, process.stdout.columns - progress.length - 3)

    const filledLength = Math.round(width * percent)
    const filled = bar[0].repeat(filledLength)
    const empty = bar[1].repeat(width - filledLength)

    process.stdout.clearLine()
    process.stdout.cursorTo(0)
    process.stdout.write(`[${filled}${empty}]${progress}`)
  }
}