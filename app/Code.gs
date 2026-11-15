// Agenda de uñas: backend en Google Apps Script, pegado dentro de la planilla de ella.
// Planilla = catálogo y ajustes. Google Calendar = turnos y bloqueos. Gmail = avisos.
// ponytail: sin base de datos; el calendario ES la base. Pasar a Supabase si hay varias profesionales o seña online.

const PASO_MIN = 30; // cada cuánto se ofrece un horario
const DIAS = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

// ---------- API pública (la página llama a esto) ----------

function doGet(e) {
  try {
    const p = e.parameter;
    if (p.action === 'catalog') return json_(catalog_());
    if (p.action === 'slots') return json_({ slots: slots_(p.date, servicio_(p.servicio).duracion) });
    return json_({ error: 'Acción desconocida' });
  } catch (err) {
    return json_({ error: err.message });
  }
}

function doPost(e) {
  try {
    return json_(book_(JSON.parse(e.postData.contents)));
  } catch (err) {
    return json_({ error: err.message });
  }
}

// ---------- Catálogo ----------

function catalog_() {
  const aj = ajustes_();
  const horario = horario_();
  return {
    negocio: aj.negocio || 'Mi estudio',
    subtitulo: aj.subtitulo || '',
    whatsapp: telWa_(aj.whatsapp, aj.codigo_pais),
    formas: String(aj.formas || '').split(',').map(s => s.trim()).filter(Boolean),
    dias: Number(aj.dias_maximos) || 21,
    abiertos: Object.keys(horario).map(Number),
    servicios: servicios_(),
  };
}

function servicios_() {
  return filas_('Servicios')
    .filter(r => r['Nombre'] && !/^(false|no|0)$/i.test(String(r['Activo']).trim()))
    .map(r => ({
      nombre: String(r['Nombre']),
      precio: r['Precio'],
      duracion: durMin_(r['Duración (min)']),
      foto: foto_(r['Foto']),
      detalle: String(r['Detalle'] || ''),
    }));
}

function servicio_(nombre) {
  const s = servicios_().find(x => x.nombre === nombre);
  if (!s) throw new Error('Ese servicio ya no está disponible');
  return s;
}

// Link de Drive ("cualquiera con el enlace") -> miniatura liviana. Cualquier otra URL pasa tal cual.
function foto_(url) {
  url = String(url || '').trim();
  const id = url.includes('drive.google') && (url.match(/[-\w]{25,}/) || [])[0];
  return id ? `https://drive.google.com/thumbnail?id=${id}&sz=w600` : url;
}

// ---------- Horarios ----------

// Devuelve los minutos libres del día como "HH:mm". Pura y testeable.
function freeSlots(abre, cierra, paso, dur, ocupados, desde) {
  const out = [];
  for (let t = abre; t + dur <= cierra; t += paso) {
    if (t < desde) continue;
    if (ocupados.every(([s, e]) => t + dur <= s || t >= e)) out.push(t);
  }
  return out;
}

function slots_(dateStr, dur) {
  const [y, m, d] = String(dateStr).split('-').map(Number);
  const inicio = new Date(y, m - 1, d);
  if (isNaN(inicio)) throw new Error('Fecha inválida');
  const h = horario_()[inicio.getDay()];
  if (!h) return [];
  const aj = ajustes_();
  const maxDias = Number(aj.dias_maximos) || 21;
  if ((inicio - hoy_()) / 864e5 > maxDias) return [];
  const fin = new Date(y, m - 1, d + 1);
  const ocupados = CalendarApp.getDefaultCalendar().getEvents(inicio, fin).map(ev =>
    ev.isAllDayEvent() ? [0, 1440] : [(ev.getStartTime() - inicio) / 6e4, (ev.getEndTime() - inicio) / 6e4]);
  const desde = (Date.now() - inicio) / 6e4 + (Number(aj.anticipacion_horas) || 2) * 60;
  return freeSlots(h.abre, h.cierra, PASO_MIN, dur, ocupados, desde).map(hhmm_);
}

function horario_() {
  const out = {};
  filas_('Horario').forEach(r => {
    const dia = DIAS.findIndex(d => norm_(d) === norm_(r['Día']));
    const abre = min_(r['Abre']), cierra = min_(r['Cierra']);
    if (dia >= 0 && abre != null && cierra > abre) out[dia] = { abre, cierra };
  });
  return out;
}

// ---------- Reserva ----------

function book_(b) {
  if (b.web) return { ok: true }; // campo trampa para bots
  const nombre = String(b.nombre || '').trim().slice(0, 60);
  const tel = String(b.telefono || '').replace(/\D/g, '');
  const nota = String(b.nota || '').trim().slice(0, 300);
  const forma = String(b.forma || '').trim().slice(0, 30);
  if (!nombre) throw new Error('Falta tu nombre');
  if (tel.length < 7 || tel.length > 15) throw new Error('Revisá tu número de WhatsApp');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(b.fecha) || !/^\d{2}:\d{2}$/.test(b.hora)) throw new Error('Elegí día y hora');
  const s = servicio_(b.servicio);
  const id = String(b.id || '').slice(0, 40);

  const [y, m, d] = b.fecha.split('-').map(Number);
  const [hh, mm] = b.hora.split(':').map(Number);
  const start = new Date(y, m - 1, d, hh, mm);
  const end = new Date(start.getTime() + s.duracion * 6e4);
  const cal = CalendarApp.getDefaultCalendar();

  const lock = LockService.getScriptLock();
  lock.waitLock(15000);
  try {
    // Reintento de la misma reserva (se cortó internet): devolver la que ya existe.
    if (id && cal.getEvents(new Date(y, m - 1, d), new Date(y, m - 1, d + 1))
      .some(ev => ev.getDescription().includes('id: ' + id))) return { ok: true };
    if (!slots_(b.fecha, s.duracion).includes(b.hora)) throw new Error('Ese horario se acaba de ocupar. Elegí otro.');

    const ev = cal.createEvent(`💅 ${nombre} · ${s.nombre}`, start, end, {
      description: [`Tel: ${tel}`, forma && `Forma: ${forma}`, nota && `Nota: ${nota}`, `id: ${id}`].filter(Boolean).join('\n'),
    });
    ev.addPopupReminder(60); // a ella le suena el celular 1 h antes
  } finally {
    lock.releaseLock();
  }

  try { avisarNuevo_(nombre, tel, s.nombre, forma, nota, start); }
  catch (err) { console.error(err); } // ponytail: el turno ya está en Calendar; un mail fallido no debe asustar a la clienta
  return { ok: true };
}

// ---------- Avisos a ella (mail = notificación de Gmail en el celular) ----------

function avisarNuevo_(nombre, tel, servicio, forma, nota, start) {
  const aj = ajustes_();
  const cuando = Utilities.formatDate(start, Session.getScriptTimeZone(), "EEEE d 'de' MMMM, HH:mm");
  const msg = `¡Hola ${nombre}! Recibí tu reserva de ${servicio} para el ${cuando}. ¡Te espero! 💅`;
  const wa = `https://wa.me/${telWa_(tel, aj.codigo_pais)}?text=${encodeURIComponent(msg)}`;
  MailApp.sendEmail({
    to: Session.getEffectiveUser().getEmail(),
    subject: `💅 Nuevo turno: ${nombre} · ${cuando}`,
    htmlBody: `<h2>Nuevo turno</h2>
      <p><b>${esc_(nombre)}</b> reservó <b>${esc_(servicio)}</b><br>${cuando}</p>
      <p>WhatsApp: ${tel}${forma ? `<br>Forma: ${esc_(forma)}` : ''}${nota ? `<br>Nota: ${esc_(nota)}` : ''}</p>
      <p><a href="${wa}">Confirmarle por WhatsApp</a></p>
      <p style="color:#888">Para cancelar, borrá el evento en Google Calendar y el horario se libera solo.</p>`,
  });
}

// Corre todos los días a las 20 h (lo crea setup). Lista los turnos de mañana con botón para recordarle a cada clienta.
function resumenDiario() {
  const aj = ajustes_();
  const m = hoy_(); m.setDate(m.getDate() + 1);
  const fin = new Date(m); fin.setDate(fin.getDate() + 1);
  const turnos = CalendarApp.getDefaultCalendar().getEvents(m, fin).filter(ev => ev.getTitle().startsWith('💅'));
  if (!turnos.length) return;
  const tz = Session.getScriptTimeZone();
  const filas = turnos.map(ev => {
    const hora = Utilities.formatDate(ev.getStartTime(), tz, 'HH:mm');
    const quien = ev.getTitle().replace('💅 ', '');
    const tel = (ev.getDescription().match(/Tel: (\d+)/) || [])[1];
    const nombre = quien.split(' · ')[0];
    const msg = `¡Hola ${nombre}! Te recuerdo tu turno de mañana a las ${hora}. ¡Te espero! 💅`;
    const link = tel ? ` · <a href="https://wa.me/${telWa_(tel, aj.codigo_pais)}?text=${encodeURIComponent(msg)}">Recordarle</a>` : '';
    return `<li><b>${hora}</b> ${esc_(quien)}${link}</li>`;
  });
  MailApp.sendEmail({
    to: Session.getEffectiveUser().getEmail(),
    subject: `Mañana tenés ${turnos.length} turno${turnos.length > 1 ? 's' : ''}`,
    htmlBody: `<h2>Turnos de mañana</h2><ul>${filas.join('')}</ul>`,
  });
}

// ---------- Instalación: correr UNA vez desde el editor ----------

function setup() {
  const ss = SpreadsheetApp.getActive();
  const hoja = (nombre, filas) => {
    if (ss.getSheetByName(nombre)) return;
    const sh = ss.insertSheet(nombre);
    sh.getRange(1, 1, filas.length, filas[0].length).setNumberFormat('@').setValues(filas);
    sh.getRange(1, 1, 1, filas[0].length).setFontWeight('bold');
    sh.setFrozenRows(1);
  };
  hoja('Servicios', [
    ['Nombre', 'Precio', 'Duración (min)', 'Foto', 'Detalle', 'Activo'],
    ['Gel semipermanente', '10', '60', '', 'Manos o pies, 2 tonos lisos', 'TRUE'],
    ['Baño de acrílico', '15', '90', '', '', 'TRUE'],
    ['Builder gel', '18', '120', '', 'Nivelación y refuerzo', 'TRUE'],
    ['Retiro', '5', '30', '', '', 'TRUE'],
  ]);
  hoja('Horario', [
    ['Día', 'Abre', 'Cierra'],
    ['Lunes', '09:00', '18:00'], ['Martes', '09:00', '18:00'], ['Miércoles', '09:00', '18:00'],
    ['Jueves', '09:00', '18:00'], ['Viernes', '09:00', '18:00'], ['Sábado', '09:00', '14:00'],
  ]);
  hoja('Ajustes', [
    ['Clave', 'Valor'],
    ['negocio', 'Cupedia'],
    ['subtitulo', 'Uñas · Maracaibo'],
    ['whatsapp', '04141234567'],
    ['codigo_pais', '58'],
    ['formas', 'Almendrada, Cuadrada, Coffin, Stiletto'],
    ['dias_maximos', '21'],
    ['anticipacion_horas', '2'],
  ]);
  ScriptApp.getProjectTriggers().forEach(t => ScriptApp.deleteTrigger(t));
  ScriptApp.newTrigger('resumenDiario').timeBased().everyDays(1).atHour(20).create();
}

// ---------- Utilidades ----------

function filas_(nombre) {
  const sh = SpreadsheetApp.getActive().getSheetByName(nombre);
  if (!sh) return [];
  const [head, ...rows] = sh.getDataRange().getValues();
  return rows.map(r => Object.fromEntries(head.map((h, i) => [String(h).trim(), r[i]])));
}

function ajustes_() {
  return Object.fromEntries(filas_('Ajustes').map(r => [String(r['Clave']).trim(), r['Valor']]));
}

function min_(v) {
  if (v instanceof Date) return v.getHours() * 60 + v.getMinutes();
  const m = String(v).trim().toLowerCase().match(/^(\d{1,2})(?:[:.](\d{2}))?\s*([ap])?\.?\s*m?/);
  if (!m) return null;
  const h = m[3] ? Number(m[1]) % 12 + (m[3] === 'p' ? 12 : 0) : Number(m[1]); // 9am, 6 pm, 18:00
  return h * 60 + Number(m[2] || 0);
}

function telWa_(tel, cod) {
  tel = String(tel || '').replace(/\D/g, '');
  cod = String(cod || '58');
  if (tel.startsWith('0')) return cod + tel.slice(1); // 0414... -> 58414...
  return tel.startsWith(cod) || tel.length > 10 ? tel : cod + tel; // >10 dígitos: ya trae código de otro país
}

const norm_ = s => String(s).normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim().toLowerCase();
// "90", "90 min", "1h", "1,5 h" -> minutos; vacío o ilegible -> 60
const durMin_ = v => { const n = parseFloat(String(v).replace(',', '.')); return n > 0 ? Math.round(/h/i.test(v) ? n * 60 : n) : 60; };
const hhmm_ = t => String(Math.floor(t / 60)).padStart(2, '0') + ':' + String(t % 60).padStart(2, '0');
const hoy_ = () => { const d = new Date(); d.setHours(0, 0, 0, 0); return d; };
const esc_ = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const json_ = o => ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
