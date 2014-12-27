function syntaxHighlight(css) {

  // Wrap @ rules.
  css = css.replace(/(@(.|\n)*?}\n})/gi, "<span class=\"at-rule\">$1</span>")

  // Capture selectors.
  css = css.replace(/^(?!@|<)(.*?){/gim, "<span class='selector'>$1</span>{");

  // Capture declarations.
  css = css.replace(/(.*?:.*?;$)/gim, "<span class='declaration'>$1</span>")

  // // Capture open/close brackets.
  css = css.replace(/({)/gim, "<span class='bracket-open'>$1</span>");
  css = css.replace(/(})/gim, "<span class='bracket-closed'>$1</span>");

  // // Wrap rulesets.
  css = css.replace(/(<span class='selector'>(.|\n)*?}<\/span>)/gi, "<span class=\'ruleset\'>$1</span>")

  return css;
}