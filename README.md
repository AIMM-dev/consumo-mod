# /consumo · AI Tokenomics in your terminal

**A free Claude Code mod by [Alantia](https://alantia.ai), strategy and business transformation firm.**

*[Español abajo](#español)*

Most teams running AI agents can't answer a simple question: **what is this costing us, right now?**

`/consumo` opens a live side panel in Claude Code that shows, as you work:

| Metric | What it tells you |
| --- | --- |
| **New tokens** · last request | What the model read for the first time and wrote back, for your last message (all model calls in that turn, subagents included) |
| **Spend** · session | What the session has cost so far, the same figure as `/cost` |
| **Input / output / cache reread** | Where the tokens of the last request went, with cached context counted apart so it doesn't inflate the total |
| **Context** | How much of the context window is in use, with a green, amber and red bar |
| **Tools and time** | Tools called in the session and time elapsed |

## Install

At the prompt of a Claude Code terminal session:

```
/plugin install consumo --marketplace AIMM-dev/consumo-mod
```

Answer `y` to add the marketplace, choose a scope (user scope keeps it in every session), and then type:

```
/consumo
```

`Esc` closes the panel. From a shell you can also run `claude plugin install consumo --marketplace AIMM-dev/consumo-mod`.

## Settings

Open `/config` and look for **consumo**:

- **Marca / Brand**: the name at the top of the panel (default `Alantia`)
- **Color de acento / Accent color**: hex or theme color name (default `#1AD3E6`, Alantia turquoise)
- **Idioma / Language**: `es` or `en` (default `es`)

## Privacy

`/consumo` runs entirely on your machine. It only reads the usage figures Claude Code already keeps for the session (the same ones behind the status line and `/cost`). It makes no network calls, writes no files and sends nothing anywhere.

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

### Instalación

En el prompt de una sesión de Claude Code en la terminal:

```
/plugin install consumo --marketplace AIMM-dev/consumo-mod
```

Responde `y` para agregar el marketplace, elige el alcance (el de usuario lo deja en todas tus sesiones) y escribe:

```
/consumo
```

`Esc` cierra el panel. Desde una terminal también puedes usar `claude plugin install consumo --marketplace AIMM-dev/consumo-mod`.

### Configuración

En `/config`, busca **consumo**: marca, color de acento (por omisión el turquesa de Alantia, `#1AD3E6`) e idioma (`es` o `en`).

### Privacidad

`/consumo` funciona por completo en tu equipo. Solo lee las cifras de uso que Claude Code ya lleva de la sesión (las mismas de la barra de estado y de `/cost`). No hace llamadas a internet, no escribe archivos y no envía nada a ningún lado.

### Por qué lo hicimos

La IA que no se mide, no se puede gestionar. En Alantia ayudamos a las organizaciones a convertir la IA en resultados de negocio, y parte de eso es **Tokenomics de IA**: saber qué modelo usar, dónde y con qué costo. Este panel es una pieza pequeña y práctica de esa disciplina, y es tuya.

¿Quieres llevar la IA a tu operación con las personas primero y resultados medidos? Hablemos: [alantia.ai](https://alantia.ai) · hola@alantia.ai

---

**People first · amplified by technology · driving business impact**

MIT License · © 2026 Alantia Consulting Group
