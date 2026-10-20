import { expect, test } from 'claude-code/testing'

// Prueba del panel /consumo: dibuja las cifras de la sesión con la identidad de Alantia,
// en terminal y escritorio, en español e inglés.

const PANE = {
  plugin: 'consumo',
  component: 'Pane',
  requestId: 'consumo',
  props: {
    title: 'Consumo',
    isFocused: false,
    bodyColumns: 30,
    placement: 'dock',
    scroll: { offset: 0, bodyRows: 30 },
    view: {},
  },
} as const

// Lo que Claude Code respondería: el engine no existe aquí, estos hooks lo representan
function engine(on: any) {
  on('command.register', () => ({ value: { command: 'consumo' } }))
  on('ui.open', () => ({ value: { isPlaced: true } }))
  on('session.start', (_: unknown, e: any) => ({ cwd: e.cwd }))
  on('session.usage', () => ({
    value: { context: { tokens: 42000, window: 200000, percent: 21 }, cost: { usd: 1.37 }, startedAt: Date.now() - 65000 },
  }))
  on('tool.call', () => ({ result: {} }))
}

for (const surface of ['terminal', 'desktop'] as const) {
  test(`el panel muestra marca, gasto, contexto y lema en ${surface}`, async ($, on) => {
    engine(on)
    await $.session.start({ cwd: '/', surface, isInteractive: true })
    await $.tool.call({ tool: 'Bash', command: 'ls' })

    const ui = await $.ui.mount({ ...PANE, surface })
    expect((await ui.find({ type: 'Text', text: /ALANTIA/ }))?.text).toContain('▲ ALANTIA')
    expect((await ui.find({ type: 'Text', text: /AI Tokenomics/ }))?.text).toContain('AI Tokenomics')
    expect((await ui.find({ type: 'Text', text: /\$1\.37/ }))?.text).toBe('$1.37')
    expect((await ui.find({ type: 'Text', text: /21%/ }))?.text).toBe('21%')
    expect((await ui.find({ type: 'Text', text: /herramientas/ }))?.text).toBe('⚒ 1 herramientas')
    expect((await ui.find({ type: 'Text', text: /People first/ }))?.text).toBe('People first ·')
    expect((await ui.find({ type: 'Text', text: /amplified by technology/ }))?.text).toBe('amplified by technology ·')
    expect((await ui.find({ type: 'Text', text: /driving business impact/ }))?.text).toBe('driving business impact')
    await ui.unmount()
  })
}

test('en inglés, con idioma = en', { options: { idioma: 'en' } }, async ($, on) => {
  engine(on)
  await $.session.start({ cwd: '/', surface: 'terminal', isInteractive: true })
  const ui = await $.ui.mount({ ...PANE, surface: 'terminal' })
  expect((await ui.find({ type: 'Text', text: /your session/ }))?.text).toContain('AI Tokenomics · your session')
  expect((await ui.find({ type: 'Text', text: /^spend$/ }))?.text).toBe('spend')
  await ui.unmount()
})
