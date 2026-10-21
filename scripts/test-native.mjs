// Explicit optional native check. Nu runs without user configuration and does not contact a model or service.
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { resolveAll } from './palette.mjs';
const nu = process.env.NU_BINARY || 'nu';
console.log('Nushell ' + execFileSync(nu, ['--version'], { encoding: 'utf8' }).trim());
for (const f of resolveAll()) {
  const path = fileURLToPath(new URL(`../themes/${f.slug}.nu`, import.meta.url));
  const command = `use ${JSON.stringify(path)}; $env.config.color_config = (${f.slug}); $env.config.color_config | to json --raw`;
  const colors = JSON.parse(execFileSync(nu, ['--no-config-file', '-c', command], { encoding: 'utf8', timeout: 15000 }));
  assert.equal(colors.shape_keyword, f.r('keyword'));
  assert.equal(colors.shape_variable, f.r('variable'));
  assert.equal(colors.shape_int, f.r('number'));
  assert.equal(colors.shape_string, f.r('string'));
  assert.equal(colors.background, f.r('bg'));
  assert.equal(colors.foreground, f.r('fg'));
  assert.deepEqual(colors.search_result, { fg: f.r('bg'), bg: f.r('match') });
  console.log(f.slug + ': native module import and color_config assignment passed');
}
