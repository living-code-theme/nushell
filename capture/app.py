"""Capture a real Nushell prompt and native structured-data table."""


def prepare(c):
    c.copy(f'themes/{c.slug}.nu', f'.config/nushell/themes/{c.slug}.nu')
    c.write('.config/nushell/config.nu', f'''use ~/.config/nushell/themes/{c.slug}.nu
$env.config.color_config = ({c.slug})
$env.config.show_banner = false
$env.config.table.mode = "rounded"
$env.PROMPT_COMMAND = {{|| "glyph-field " }}
$env.PROMPT_COMMAND_RIGHT = {{|| "" }}
''')
    return ['nu']


def drive(c):
    c.wait_text(r'(?m)^glyph-field')
    c.type('[{name: FieldRenderer.ts, language: TypeScript, lines: 28, ready: true} {name: types.ts, language: TypeScript, lines: 12, ready: true} {name: pointer.ts, language: TypeScript, lines: 8, ready: false}] | table\r')
    c.wait_text(r'╭.*─|│.*ready')
    c.type('let radius = 0.35; $radius * 2')  # Native command-line syntax coloring, without a network request.
