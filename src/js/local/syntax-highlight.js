function syntaxHighlight(css) {

  // Wrap @media rules.
  css = css.replace(/(@media(.|\n)*?}\n})/gi, "<span class=\"at-media\">$1</span>")

  // Capture selectors.
  css = css.replace(/^(?!@|<)(.*?){/gim, "<span class='selectors'>$1</span>{");

  // Wrap other @ rules.
  css = css.replace(/^(@font-face)(.*?){/gim, "<span class='at-font-face'>$1</span>{");
  css = css.replace(/^(@page)(.*?){/gim, "<span class='at-page'>$1</span>{");

  // Capture declarations.
  css = css.replace(/(.*?:.*?;$)/gim, "<span class='declaration'>$1</span>")

  // // Capture open/close brackets.
  css = css.replace(/({)/gim, "<span class='bracket-open'>$1</span>");
  css = css.replace(/(})/gim, "<span class='bracket-closed'>$1</span>");

  // // Wrap rulesets.
  css = css.replace(/(<span class='selectors'>(.|\n)*?}<\/span>)/gi, "<span class=\'ruleset\'>$1</span>")
  css = css.replace(/(<span class='at-font-face'>(.|\n)*?}<\/span>)/gi, "<span class=\'ruleset\'>$1</span>")
  css = css.replace(/(<span class='at-page'>(.|\n)*?}<\/span>)/gi, "<span class=\'ruleset\'>$1</span>")

  return css;
}