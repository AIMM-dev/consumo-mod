// ─────────────────────────────────────────────────────────────
// Mod "consumo" by Alantia · AI Tokenomics en tu terminal
// Panel lateral con métricas de la sesión de Claude Code
// Abre con /consumo  ·  Esc lo cierra
// Marca, color de acento e idioma se cambian en /config
// Funciona local: solo lee las cifras que Claude Code ya lleva de la sesión
// y no envía nada a ningún lado.
// ─────────────────────────────────────────────────────────────

const PANE = 'consumo'
const PANE_COLUMNS = 34 // ancho pedido para el panel acoplado
const INNER = PANE_COLUMNS - 4 // ancho útil, descontando el marco del panel
const ALANTIA_TURQUOISE = '#1AD3E6' // turquesa tecnológico del manual de marca

// Textos del panel en español e inglés
const COPY = {
  es: {
    command: 'Abre el panel de consumo de Alantia',
    title: 'Consumo',
    subtitle: 'AI Tokenomics · tu sesión',
    live: 'en vivo',
    newTokens: 'tokens nuevos',
    lastRequest: 'último pedido',
    spend: 'gasto',
    session: 'sesión',
    input: '↑ entrada ',
    output: '↓ salida ',
    cache: '⟳ caché releída ',
    call: ' llamada',
    calls: ' llamadas',
    context: 'contexto',
    free: ' libres',
    tools: ' herramientas',
  },
  en: {
    command: 'Open the Alantia usage panel',
    title: 'Usage',
    subtitle: 'AI Tokenomics · your session',
    live: 'live',
    newTokens: 'new tokens',
    lastRequest: 'last request',
    spend: 'spend',
    session: 'session',
    input: '↑ input ',
    output: '↓ output ',
    cache: '⟳ cache reread ',
    call: ' call',
    calls: ' calls',
    context: 'context',
    free: ' free',
    tools: ' tools',
  },
}

// Estado del panel (se reinicia si el mod se recarga)
// Un "pedido" es el turno completo: todas las llamadas al modelo que hace
// Claude para responder un mensaje, subagentes incluidos.
let turn = { fresh: 0, output: 0, cached: 0, calls: 0 } // turno en curso
let last = { fresh: 0, output: 0, cached: 0, calls: 0 } // último pedido
let tools = 0 // herramientas usadas en la sesión
let loadedAt = Date.now()
// Contexto, gasto e inicio de sesión los lleva Claude Code; aquí solo se leen
let usage = null

// ── Helpers de formato ──────────────────────────────────────
function fmtTokens(n) {
  if (n >= 1_000_000) return trim(n / 1_000_000) + 'M'
  if (n >= 1000) return trim(n / 1000) + 'k'
  return String(n)
}
function trim(n) {
  return n.toFixed(1).replace(/\.0$/, '')
}
function fmtClock(ms) {
  const s = Math.max(0, Math.floor(ms / 1000))
  const hh = Math.floor(s / 3600)
  const mm = String(Math.floor((s % 3600) / 60)).padStart(2, '0')
  const ss = String(s % 60).padStart(2, '0')
  return hh > 0 ? hh + ':' + mm + ':' + ss : mm + ':' + ss
}
// Color del contexto según el nivel: verde, ámbar y rojo del tema
function levelColor(pct) {
  return pct > 85 ? 'error' : pct > 60 ? 'warning' : 'success'
}

// Lee las cifras de la sesión (las mismas de la barra de estado y /cost)
async function refresh($) {
  try {
    usage = await $.session.usage()
  } catch {
    // sin lectura: el panel conserva la anterior
  }
  $.ui.invalidate('ui.render')
}

export function register(on, options) {
  const BRAND = String(options?.marca || 'Alantia').toUpperCase()
  const ACCENT = String(options?.acento || ALANTIA_TURQUOISE)
  const T = COPY[options?.idioma === 'en' ? 'en' : 'es']

  // 1) Al iniciar: registra /consumo y arranca el reloj de la sesión
  on('session.start', async ($, e, next) => {
    await $.command.register({
      name: 'consumo',
      description: T.command,
      immediate: true, // se puede abrir mientras Claude trabaja
    })
    loadedAt = Date.now()
    await refresh($)
    // Redibuja cada segundo para que avance el reloj
    $.clock.every(1000, () => $.ui.invalidate('ui.render'))
    return next(e)
  })

  // 2) /consumo abre el panel
  on('command.run', { command: 'consumo' }, async ($) => {
    await refresh($)
    await $.ui.open({ id: PANE, title: T.title, closeOnEscape: true, columns: PANE_COLUMNS })
    return {}
  })

  // 3) Cuenta herramientas (observa y deja pasar)
  // Solo observa: si algo falla aquí, la herramienta sigue su curso
  on('tool.call', async ($, e, next) => {
    tools += 1
    $.ui.invalidate('ui.render')
    return next(e)
  }).catch(($, e, next) => next(e))

  // 4) Nuevo pedido: reinicia el acumulador del turno
  on('turn.start', async ($, e, next) => {
    if (!e.agentId) turn = { fresh: 0, output: 0, cached: 0, calls: 0 }
    return next(e)
  })

  // 5) Cada llamada al modelo: suma los tokens del pedido
  on('turn.step', async function* ($, e, next) {
    const result = yield* next(e)
    const u = result.usage
    if (u) {
      // Entrada nueva: lo que el modelo lee por primera vez (se cachea o no).
      // La caché leída es el contexto que se reenvía en cada llamada; se cuenta
      // aparte porque sumarla infla el total: un pedido de 3 llamadas sobre un
      // contexto de 70k "consumiría" 210k sin haber añadido casi nada.
      turn.fresh += (u.input_tokens ?? 0) + (u.cache_creation_input_tokens ?? 0)
      turn.output += u.output_tokens ?? 0
      turn.cached += u.cache_read_input_tokens ?? 0
      turn.calls += 1
      last = { ...turn }
      await refresh($)
    }
    return result
  })

  // 6) Dibuja el panel
  on('ui.render', { component: 'Pane' }, async ($, e, next) => {
    if (e.requestId !== PANE) return next(e)
    const { Box, Text } = $.ui.resolve(e)

    const ctx = usage?.context
    const ctxTokens = ctx?.tokens ?? 0
    const ctxWindow = ctx?.window ?? 0
    const pct = ctx?.percent ?? (ctxWindow ? Math.min(100, Math.round((ctxTokens / ctxWindow) * 100)) : 0)
    const level = levelColor(pct)
    const cost = usage?.cost
    const startedAt = usage?.startedAt ?? loadedAt

    const barWidth = INNER - 4 // borde y relleno de la tarjeta de contexto
    const filled = Math.min(barWidth, Math.round((pct / 100) * barWidth))
    const blink = Math.floor(Date.now() / 1000) % 2 === 0

    const label = (text) => Text({ dimColor: true, children: [text] })
    const row = (key, children) =>
      Box({ key, flexDirection: 'row', justifyContent: 'space-between', children })

    // Cifra protagonista: etiqueta tenue arriba, valor en negrita, nota debajo
    const stat = (key, title, value, note, color) =>
      Box({
        key,
        flexDirection: 'column',
        flexGrow: 1,
        children: [label(title), Text({ bold: true, color, children: [value] }), label(note)],
      })

    return Box({
      flexDirection: 'column',
      gap: 1,
      children: [
        // Encabezado: la A que asciende del isotipo, la marca y el pulso en vivo
        Box({
          key: 'head',
          flexDirection: 'column',
          children: [
            row('brand', [
              Text({ bold: true, color: ACCENT, children: ['▲ ' + BRAND] }),
              Box({
                flexDirection: 'row',
                gap: 1,
                children: [Text({ color: ACCENT, dimColor: !blink, children: ['●'] }), label(T.live)],
              }),
            ]),
            label('  ' + T.subtitle),
            Text({ color: ACCENT, children: ['━'.repeat(INNER)] }),
          ],
        }),
        Box({
          key: 'stats',
          flexDirection: 'row',
          gap: 2,
          children: [
            stat('tok', T.newTokens, fmtTokens(last.fresh + last.output), T.lastRequest),
            stat('usd', T.spend, cost ? '$' + cost.usd.toFixed(2) : '—', T.session, ACCENT),
          ],
        }),
        Box({
          key: 'split',
          flexDirection: 'column',
          children: [
            row('io', [label(T.input + fmtTokens(last.fresh)), label(T.output + fmtTokens(last.output))]),
            row('cache', [
              label(T.cache + fmtTokens(last.cached)),
              label(last.calls + (last.calls === 1 ? T.call : T.calls)),
            ]),
          ],
        }),
        Box({
          key: 'ctx',
          flexDirection: 'column',
          borderStyle: 'round',
          borderColor: ACCENT,
          paddingX: 1,
          children: [
            row('ctxHead', [label(T.context), Text({ bold: true, color: level, children: [pct + '%'] })]),
            Box({
              flexDirection: 'row',
              children: [
                Text({ color: level, children: ['━'.repeat(filled)] }),
                label('╌'.repeat(barWidth - filled)),
              ],
            }),
            row('ctxFoot', [
              label(fmtTokens(ctxTokens) + ' / ' + (ctxWindow ? fmtTokens(ctxWindow) : '—')),
              label(ctxWindow ? fmtTokens(Math.max(0, ctxWindow - ctxTokens)) + T.free : ' '),
            ]),
          ],
        }),
        row('foot', [label('⚒ ' + tools + T.tools), label('⏱ ' + fmtClock(Date.now() - startedAt))]),
        // Firma: el lema de Alantia, completo, en inglés y en orden;
        // la frase central en el acento, como en el manual de marca
        Box({
          key: 'sign',
          flexDirection: 'column',
          children: [
            Text({ color: ACCENT, dimColor: true, children: ['─'.repeat(INNER)] }),
            Text({ bold: true, children: ['People first ·'] }),
            Text({ bold: true, color: ACCENT, children: ['amplified by technology ·'] }),
            Text({ bold: true, children: ['driving business impact'] }),
            label('alantia.ai'),
          ],
        }),
      ],
    })
  })
}
