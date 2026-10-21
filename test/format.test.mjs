import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';
import { resolveAll } from '../scripts/palette.mjs';
import { keys, hexColors, assertContrast } from './helpers.mjs';
const fixture = JSON.parse(await readFile(new URL('./fixtures/upstream.json', import.meta.url)));
const read = path => readFile(new URL('../' + path, import.meta.url), 'utf8');

for (const f of resolveAll()) test(f.name + ': native module structure and shape vocabulary', async () => {
  const source = await read('themes/' + f.slug + '.nu');
  assert.match(source, /export def main \[\] \{/);
  const code = source.replace(/^#.*$/gm, '');
  assert.doesNotMatch(code, /\$env|source |exec |http /);
  const pairs = [...source.matchAll(/^        "([^"\n]+)": "(#[a-f0-9]{6})"$/gm)];
  const t = Object.fromEntries(pairs.map(([, key, color]) => [key, color]));
  assert.equal(Object.keys(t).length, pairs.length);
  for (const key of fixture.required) assert.ok(key in t, 'Missing shape: ' + key);
  for (const [key, role] of Object.entries({ shape_variable: 'variable', shape_int: 'number', shape_bool: 'constant', shape_string: 'string', shape_internalcall: 'function', shape_flag: 'decorator', shape_operator: 'operator', shape_keyword: 'keyword' })) assert.equal(t[key], f.r(role), key);
  assertContrast(t.foreground, t.background);
  assert.match(source, /search_result: \{ fg: "#[a-f0-9]{6}" bg: "#[a-f0-9]{6}" \}/);
});
