var Reset = "\x1b[0m";
var FgGreen = "\x1b[32m";
var FgRed = "\x1b[31m";

module.exports = {
  Reset: Reset,
  FgGreen: FgGreen,
  FgRed: FgGreen,
  print: function (s, tag, color) {
    let json = ''
    let tagBegin = '';
    let tagEnd = '';
    color = color || '';

    if(!s) {
      json = '\n';
    }
    else if(typeof s === 'string') {
      json = `\n${s}\n`;
    }
    else {
      json = `\n${JSON.stringify(s)}\n`;
    }
    if(tag) {
      tagBegin = `${color}<${tag}>${Reset}`;
      tagEnd = `${color}</${tag}>${Reset}`;
    }
    console.info(`${tagBegin}${json}${tagEnd}`);
  }
}