// Native Nushell modules export a record. Importing never overwrites unrelated config or environment.
const roles = {
  separator: 'border', header: 'heading', empty: 'fgSubtle', bool: 'constant', int: 'number', duration: 'number', filesize: 'number',
  date: 'info', range: 'operator', float: 'number', string: 'string', nothing: 'constant', binary: 'number', 'cell-path': 'property',
  row_index: 'lineNumber', record: 'fg', list: 'fg', block: 'fg', hints: 'fgSubtle', foreground: 'fg', background: 'bg', cursor: 'cursor',
  shape_and: 'keyword', shape_binary: 'number', shape_block: 'punctuation', shape_bool: 'constant', shape_closure: 'punctuation',
  shape_custom: 'function', shape_datetime: 'number', shape_directory: 'type', shape_external: 'function', shape_externalarg: 'parameter',
  shape_filepath: 'string', shape_flag: 'decorator', shape_float: 'number', shape_globpattern: 'regex', shape_int: 'number',
  shape_internalcall: 'function', shape_keyword: 'keyword', shape_list: 'punctuation', shape_literal: 'string', shape_match_pattern: 'regex',
  shape_nothing: 'constant', shape_operator: 'operator', shape_or: 'keyword', shape_pipe: 'operator', shape_range: 'operator',
  shape_raw_string: 'string', shape_record: 'punctuation', shape_redirection: 'operator', shape_signature: 'parameter',
  shape_string: 'string', shape_string_interpolation: 'escape', shape_table: 'punctuation', shape_variable: 'variable',
};
export function generate(flavors) {
  return flavors.map(f => ({ path: `themes/${f.slug}.nu`, content:
    '# use this-file.nu; $env.config.color_config = (this-file)\n' +
    'export def main [] {\n    {\n' + Object.entries(roles).map(([key, role]) => `        "${key}": "${f.r(role)}"`).join('\n') +
    `\n        search_result: { fg: "${f.r('bg')}" bg: "${f.r('match')}" }` +
    `\n        shape_garbage: { fg: "${f.r('error')}" attr: "u" }` +
    '\n        shape_matching_brackets: { attr: "u" }\n        leading_trailing_space_bg: { attr: "n" }\n    }\n}\n',
  }));
}
