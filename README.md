<!-- living-code-readme:1 -->
# 🐚 Living Code for Nushell

**Calm slate. Living color.** Living Code for Nushell: native modules for syntax shapes, structured values, tables, search matches and command-line hints.

[Installation](#installation) · [Flavors](#flavors) · [Configuration](#configuration) · [All ports](https://github.com/living-code-theme)

## Previews

Real application screenshots have not been captured yet.

## Installation

```sh
git clone https://github.com/living-code-theme/nushell.git
cd nushell
```

From the clone, run these commands **inside Nushell**:

```nu
mkdir ($nu.default-config-dir | path join "themes")
cp themes/*.nu ($nu.default-config-dir | path join "themes")
```

On Linux’s default config path, add this to `config.nu`:

```nu
use ~/.config/nushell/themes/living-code-night.nu
$env.config.color_config = (living-code-night)
```

On other platforms, replace the module path with the installed path under `$nu.default-config-dir`. Restart Nu or evaluate the same two lines in your current shell.

## Flavors

Expand a flavor for its full-size preview and activation instructions.

<details data-lc-flavor="night">
<summary><strong>Night</strong> · Dark · full palette</summary>

A real application capture is not available yet.

```nu
use ~/.config/nushell/themes/living-code-night.nu
$env.config.color_config = (living-code-night)
```

</details>

<details data-lc-flavor="frost">
<summary><strong>Frost</strong> · Dark · softer chroma</summary>

A real application capture is not available yet.

```nu
use ~/.config/nushell/themes/living-code-frost.nu
$env.config.color_config = (living-code-frost)
```

</details>

<details data-lc-flavor="paper">
<summary><strong>Paper</strong> · Light · near-white slate</summary>

A real application capture is not available yet.

```nu
use ~/.config/nushell/themes/living-code-paper.nu
$env.config.color_config = (living-code-paper)
```

</details>

<details data-lc-flavor="signal">
<summary><strong>Signal</strong> · Dark · teal accent</summary>

A real application capture is not available yet.

```nu
use ~/.config/nushell/themes/living-code-signal.nu
$env.config.color_config = (living-code-signal)
```

</details>

## Configuration

Each file exports `main`, returning a color record without mutating `$env`. Set `color_config` explicitly as shown, or merge the returned record into your existing color configuration. Syntax shapes include keyword, literal, constant, function, type, string, variable, parameter and operator distinctions. Search results have explicit foreground/background pairs.

## Compatibility

Uses Nushell’s native module syntax and `color_config` API. The exported record follows the current shape-color contract; unknown supplemental record keys are inert. The theme does not configure prompts, LS_COLORS or the terminal emulator palette. Its `background`, `foreground` and `cursor` record entries are metadata used by theme tooling, not commands that recolor the host terminal. Native module loading can be tested with `pnpm test:native` when `nu` is installed.

## Contributing

Found a problem? [Open an issue](https://github.com/living-code-theme/nushell/issues/new/choose) with the app version, the flavor and a screenshot. Want Living Code somewhere else? [Request a port](https://github.com/living-code-theme/core/issues/new?template=port-request.yml).

Pull requests are welcome. Keep this README, `port.json` and `images/` in sync, and use real screenshots of the app, never mockups.

🦎 **One chameleon, many habitats.** Part of [Living Code](https://github.com/living-code-theme).

## License

[MIT](LICENSE) © Elliot Luque
