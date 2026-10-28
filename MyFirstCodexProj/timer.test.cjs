const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const file = path.join(__dirname, 'timer.html');
assert.ok(fs.existsSync(file), 'timer.html must exist');
let now = 0;
let frame;
const elements = {};
for (const id of ['toggle', 'reset', 'time', 'status', 'dial']) {
  elements[id] = { textContent: '', disabled: id === 'reset', dataset: {}, style: {setProperty() {}},
    setAttribute() {}, addEventListener(event, callback) { this[event] = callback; } };
}
vm.runInNewContext(fs.readFileSync(file, 'utf8').match(/<script>([\s\S]*?)<\/script>/)[1], {
  document: { getElementById: id => elements[id] },
  performance: { now: () => now },
  requestAnimationFrame: callback => { frame = callback; return 1; },
  cancelAnimationFrame: () => { frame = null; }
});
assert.equal(elements.reset.disabled, true);
assert.equal(elements.time.textContent, '00:00.00');
elements.toggle.click();
assert.equal(elements.toggle.textContent, '暫停');
assert.equal(elements.reset.disabled, false);
now = 1234; frame();
assert.equal(elements.time.textContent, '00:01.23');
elements.toggle.click();
now = 5000;
assert.equal(elements.time.textContent, '00:01.23');
elements.toggle.click();
now = 6000; frame();
assert.equal(elements.time.textContent, '00:02.23');
elements.reset.click();
assert.equal(elements.time.textContent, '00:00.00');
assert.equal(elements.toggle.textContent, '開始');
assert.equal(elements.reset.disabled, true);
assert.equal(frame, null);
elements.toggle.click();
now = 66000; frame();
assert.equal(elements.time.textContent, '01:00.00');
elements.toggle.click();
elements.reset.click();
assert.equal(elements.reset.disabled, true);
assert.equal(elements.time.textContent, '00:00.00');
console.log('PASS: initial state, start, pause, resume, running/paused reset, minute rollover');
