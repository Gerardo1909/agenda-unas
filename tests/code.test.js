// Chequeo de la lógica pura de Code.gs (horas, duraciones, teléfonos, días). Correr: node tests/code.test.js
const fs=require('fs'),assert=require('assert');
eval(fs.readFileSync(__dirname + "/../app/Code.gs",'utf8').replace(/^const /gm,'var '));
const eq=assert.deepStrictEqual;
eq([min_('9:00'),min_('09:00'),min_('18:00'),min_('9am'),min_('6 pm'),min_('6:30 p.m.'),min_('12pm'),min_('12am'),min_('abc')],[540,540,1080,540,1080,1110,720,0,null]);
eq([durMin_(90),durMin_('90 min'),durMin_('1h'),durMin_('1,5 h'),durMin_(''),durMin_('x')],[90,90,60,90,60,60]);
eq([telWa_('0414-123.45.67','58'),telWa_('+58 414 1234567','58'),telWa_('4141234567','58'),telWa_('+54 9 11 2345 6789','58')],['584141234567','584141234567','584141234567','5491123456789']);
eq(DIAS.findIndex(d=>norm_(d)===norm_(' miercoles ')),3);
eq(freeSlots(540,600,30,60,[],0),[540]);
eq(freeSlots(540,720,30,60,[[600,660]],0),[540,660]);
console.log('ok');
