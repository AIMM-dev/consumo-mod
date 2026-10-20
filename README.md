# /consumo · AI Tokenomics in your terminal

**A free Claude Code mod by [Alantia](https://alantia.ai), strategy and business transformation firm.**

*[Español abajo](#español)*

Most teams running AI agents can't answer a simple question: **what is this costing us, right now?**

`/consumo` opens a live side panel in Claude Code that shows, as you work:

| Metric | What it tells you |
| --- | --- |
| **New tokens** · last request | What the model read for the first time and wrote back for your last message (all model calls in that turn, subagents included) |
| **Spend** · session | What the session has cost so far, the same figure as `/cost` |
| **Input / output / cache reread** | Where the tokens of the last request went, with cached context counted apart so it doesn't inflate the total |
| **Context** | How much of the context window is in use, with a green, amber and red bar |
| **Tools and time** | Tools called in the session and time elapsed |

## Install in Claude Code (terminal or VS Code)

Type each line at the Claude Code prompt and press Enter. Start the line with the `/`, with no spaces before it: if Claude answers you in text, the line was sent as a chat message instead of running as a command.

First, add Alantia's marketplace:

```
/plugin marketplace add Alantia-Consulting-Group/consumo-mod
```

Then install the mod and choose the **user** scope so it stays in every session:

```
/plugin install consumo@alantia
```

If you prefer a regular shell (PowerShell, Terminal), run these two lines instead:

```
claude plugin marketplace add Alantia-Consulting-Group/consumo-mod
```

```
claude plugin install consumo@alantia
```

## Use it

```
/consumo
```

The panel opens beside the conversation. The numbers fill in after Claude's next answer and update with every request. `Esc` closes it.

To change the brand, accent color or language (`es` / `en`), open `/config` and look for **consumo**.

## Where it works

| Where | What you get |
| --- | --- |
| **Claude Code in a terminal or VS Code** | The live side panel |
| **Claude Code sessions in the Claude app** (cloud), where a side panel can't be docked | The same figures as a text summary in the chat |
| **Regular Claude chat** (claude.ai, desktop or mobile) | Mods don't run there. See below |

**Without the mod.** In Claude Code, the built-in `/cost` shows the session's spend and `/context` shows what fills the context window. In the regular Claude chat there is no live token counter: you can ask Claude *"Explain where this conversation's usage went"* for an estimate, and see your plan's usage in your account settings on claude.ai.

## Privacy and trust

Plugins can run code on your machine, so only install the ones you trust. `/consumo` is open source and fits in one file, [`hooks/register.js`](hooks/register.js): it only reads the usage figures Claude Code already keeps for the session (the same ones behind the status line and `/cost`). It makes no network calls, writes no files and sends nothing anywhere.

## Why we built it

AI that isn't measured can't be managed. At Alantia we help organizations turn AI into business results, and part of that is **AI Tokenomics**: knowing which model to use, where, and at what cost. This panel is a small, practical piece of that discipline, and it's yours.

Want to bring AI into your operation with people first and results measured? Let's talk: [alantia.ai](https://alantia.ai) · hola@alantia.ai

---

## Español

**Un mod gratuito para Claude Code de [Alantia](https://alantia.ai), firma de estrategia y transformación empresarial.**

Si usas agentes de IA, seguro te has preguntado: **¿cuánto me está costando esto, ahora mismo?**

`/consumo` abre un panel lateral en Claude Code que te muestra en vivo:

| Métrica | Qué te dice |
| --- | --- |
| **Tokens nuevos** · último pedido | Lo que el modelo leyó por primera vez y lo que escribió en tu último mensaje (todas las llamadas del turno, subagentes incluidos) |
| **Gasto** · sesión | Lo que lleva costando la sesión, la misma cifra de `/cost` |
| **Entrada / salida / caché releída** | En qué se fueron los tokens del último pedido; el contexto en caché se cuenta aparte para no inflar el total |
| **Contexto** | Qué tanto de la ventana de contexto está ocupada, con una barra verde, ámbar y roja |
| **Herramientas y tiempo** | Herramientas usadas en la sesión y tiempo transcurrido |

### Instalación en Claude Code (terminal o VS Code)

Escribe cada línea en el prompt de Claude Code y presiona Enter. La línea debe empezar con la `/`, sin espacios antes: si Claude te responde con texto, la línea se envió como mensaje y no se ejecutó como comando.

Primero agrega el marketplace de Alantia:

```
/plugin marketplace add Alantia-Consulting-Group/consumo-mod
```

Después instala el mod y elige el alcance **user** para que quede en todas tus sesiones:

```
/plugin install consumo@alantia
```

Si prefieres una terminal normal (PowerShell, Terminal), usa estas dos líneas:

```
claude plugin marketplace add Alantia-Consulting-Group/consumo-mod
```

```
claude plugin install consumo@alantia
```

### Cómo usarlo

```
/consumo
```

El panel se abre junto a la conversación. Las cifras se llenan después de la siguiente respuesta de Claude y se actualizan con cada pedido. `Esc` lo cierra.

Para cambiar la marca, el color de acento o el idioma (`es` / `en`), abre `/config` y busca **consumo**.

### Dónde funciona

| Dónde | Qué obtienes |
| --- | --- |
| **Claude Code en terminal o VS Code** | El panel lateral en vivo |
| **Sesiones de Claude Code en la app de Claude** (en la nube), donde no se puede acoplar un panel | Las mismas cifras como resumen de texto en el chat |
| **Chat normal de Claude** (claude.ai, escritorio o móvil) | Ahí los mods no funcionan. Mira abajo |

**Sin el mod.** En Claude Code, el comando integrado `/cost` muestra el gasto de la sesión y `/context` muestra qué ocupa la ventana de contexto. En el chat normal de Claude no hay un contador de tokens en vivo: puedes pedirle a Claude *"Explícame en qué se fue el uso de esta conversación"* para obtener un estimado, y ver el uso de tu plan en la configuración de tu cuenta en claude.ai.

### Privacidad y confianza

Los plugins pueden ejecutar código en tu equipo, así que instala solo los que te den confianza. `/consumo` es de código abierto y cabe en un solo archivo, [`hooks/register.js`](hooks/register.js): solo lee las cifras de uso que Claude Code ya lleva de la sesión (las mismas de la barra de estado y de `/cost`). No hace llamadas a internet, no escribe archivos y no envía nada a ningún lado.

### Por qué lo hicimos

La IA que no se mide, no se puede gestionar. En Alantia ayudamos a las organizaciones a convertir la IA en resultados de negocio, y parte de eso es **Tokenomics de IA**: saber qué modelo usar, dónde y con qué costo. Este panel es una pieza pequeña y práctica de esa disciplina, y es tuya.

¿Quieres llevar la IA a tu operación con las personas primero y resultados medidos? Hablemos: [alantia.ai](https://alantia.ai) · hola@alantia.ai

---

**People first · amplified by technology · driving business impact**

MIT License · © 2026 Alantia Consulting Group
