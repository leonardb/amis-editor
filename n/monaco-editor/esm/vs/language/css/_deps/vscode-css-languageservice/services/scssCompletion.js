define('012257c', function(require, exports, module) {

  /*---------------------------------------------------------------------------------------------
   *  Copyright (c) Microsoft Corporation. All rights reserved.
   *  Licensed under the MIT License. See License.txt in the project root for license information.
   *--------------------------------------------------------------------------------------------*/
  'use strict';
  Object.defineProperty(exports, "__esModule", { value: true });
  var tslib_1 = require("849c8c1");
  var __extends = (this && this.__extends) || (function () {
      var extendStatics = function (d, b) {
          extendStatics = Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
              function (d, b) { for (var p in b)
                  if (b.hasOwnProperty(p))
                      d[p] = b[p]; };
          return extendStatics(d, b);
      };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  var cssCompletion_js_1 = require("81478b3");
  var nodes = tslib_1.__importStar(require("0b0187d"));
  var main_js_1 = require("6b31927");
  var nls = tslib_1.__importStar(require("da3a483"));
  var localize = nls.loadMessageBundle();
  var SCSSCompletion = /** @class */ (function (_super) {
      __extends(SCSSCompletion, _super);
      function SCSSCompletion() {
          return _super.call(this, '$') || this;
      }
      SCSSCompletion.prototype.createReplaceFunction = function () {
          var tabStopCounter = 1;
          return function (_match, p1) {
              return '\\' + p1 + ': ${' + tabStopCounter++ + ':' + (SCSSCompletion.variableDefaults[p1] || '') + '}';
          };
      };
      SCSSCompletion.prototype.createFunctionProposals = function (proposals, existingNode, sortToEnd, result) {
          for (var _i = 0, proposals_1 = proposals; _i < proposals_1.length; _i++) {
              var p = proposals_1[_i];
              var insertText = p.func.replace(/\[?(\$\w+)\]?/g, this.createReplaceFunction());
              var label = p.func.substr(0, p.func.indexOf('('));
              var item = {
                  label: label,
                  detail: p.func,
                  documentation: p.desc,
                  textEdit: main_js_1.TextEdit.replace(this.getCompletionRange(existingNode), insertText),
                  insertTextFormat: main_js_1.InsertTextFormat.Snippet,
                  kind: main_js_1.CompletionItemKind.Function
              };
              if (sortToEnd) {
                  item.sortText = 'z';
              }
              result.items.push(item);
          }
          return result;
      };
      SCSSCompletion.prototype.getCompletionsForSelector = function (ruleSet, isNested, result) {
          this.createFunctionProposals(SCSSCompletion.selectorFuncs, void 0, true, result);
          return _super.prototype.getCompletionsForSelector.call(this, ruleSet, isNested, result);
      };
      SCSSCompletion.prototype.getTermProposals = function (entry, existingNode, result) {
          var functions = SCSSCompletion.builtInFuncs;
          if (entry) {
              functions = functions.filter(function (f) { return !f.type || entry.restrictions.indexOf(f.type) !== -1; });
          }
          this.createFunctionProposals(functions, existingNode, true, result);
          return _super.prototype.getTermProposals.call(this, entry, existingNode, result);
      };
      SCSSCompletion.prototype.getColorProposals = function (entry, existingNode, result) {
          this.createFunctionProposals(SCSSCompletion.colorProposals, existingNode, false, result);
          return _super.prototype.getColorProposals.call(this, entry, existingNode, result);
      };
      SCSSCompletion.prototype.getCompletionsForDeclarationProperty = function (declaration, result) {
          this.getCompletionForAtDirectives(result);
          this.getCompletionsForSelector(null, true, result);
          return _super.prototype.getCompletionsForDeclarationProperty.call(this, declaration, result);
      };
      SCSSCompletion.prototype.getCompletionsForExtendsReference = function (_extendsRef, existingNode, result) {
          var symbols = this.getSymbolContext().findSymbolsAtOffset(this.offset, nodes.ReferenceType.Rule);
          for (var _i = 0, symbols_1 = symbols; _i < symbols_1.length; _i++) {
              var symbol = symbols_1[_i];
              var suggest = {
                  label: symbol.name,
                  textEdit: main_js_1.TextEdit.replace(this.getCompletionRange(existingNode), symbol.name),
                  kind: main_js_1.CompletionItemKind.Function,
              };
              result.items.push(suggest);
          }
          return result;
      };
      SCSSCompletion.prototype.getCompletionForAtDirectives = function (result) {
          var _a;
          (_a = result.items).push.apply(_a, SCSSCompletion.scssAtDirectives);
          return result;
      };
      SCSSCompletion.prototype.getCompletionForTopLevel = function (result) {
          this.getCompletionForAtDirectives(result);
          _super.prototype.getCompletionForTopLevel.call(this, result);
          return result;
      };
      SCSSCompletion.variableDefaults = {
          '$red': '1',
          '$green': '2',
          '$blue': '3',
          '$alpha': '1.0',
          '$color': '#000000',
          '$weight': '0.5',
          '$hue': '0',
          '$saturation': '0%',
          '$lightness': '0%',
          '$degrees': '0',
          '$amount': '0',
          '$string': '""',
          '$substring': '"s"',
          '$number': '0',
          '$limit': '1'
      };
      SCSSCompletion.colorProposals = [
          { func: 'red($color)', desc: localize('scss.builtin.red', 'Gets the red component of a color.') },
          { func: 'green($color)', desc: localize('scss.builtin.green', 'Gets the green component of a color.') },
          { func: 'blue($color)', desc: localize('scss.builtin.blue', 'Gets the blue component of a color.') },
          { func: 'mix($color, $color, [$weight])', desc: localize('scss.builtin.mix', 'Mixes two colors together.') },
          { func: 'hue($color)', desc: localize('scss.builtin.hue', 'Gets the hue component of a color.') },
          { func: 'saturation($color)', desc: localize('scss.builtin.saturation', 'Gets the saturation component of a color.') },
          { func: 'lightness($color)', desc: localize('scss.builtin.lightness', 'Gets the lightness component of a color.') },
          { func: 'adjust-hue($color, $degrees)', desc: localize('scss.builtin.adjust-hue', 'Changes the hue of a color.') },
          { func: 'lighten($color, $amount)', desc: localize('scss.builtin.lighten', 'Makes a color lighter.') },
          { func: 'darken($color, $amount)', desc: localize('scss.builtin.darken', 'Makes a color darker.') },
          { func: 'saturate($color, $amount)', desc: localize('scss.builtin.saturate', 'Makes a color more saturated.') },
          { func: 'desaturate($color, $amount)', desc: localize('scss.builtin.desaturate', 'Makes a color less saturated.') },
          { func: 'grayscale($color)', desc: localize('scss.builtin.grayscale', 'Converts a color to grayscale.') },
          { func: 'complement($color)', desc: localize('scss.builtin.complement', 'Returns the complement of a color.') },
          { func: 'invert($color)', desc: localize('scss.builtin.invert', 'Returns the inverse of a color.') },
          { func: 'alpha($color)', desc: localize('scss.builtin.alpha', 'Gets the opacity component of a color.') },
          { func: 'opacity($color)', desc: 'Gets the alpha component (opacity) of a color.' },
          { func: 'rgba($color, $alpha)', desc: localize('scss.builtin.rgba', 'Changes the alpha component for a color.') },
          { func: 'opacify($color, $amount)', desc: localize('scss.builtin.opacify', 'Makes a color more opaque.') },
          { func: 'fade-in($color, $amount)', desc: localize('scss.builtin.fade-in', 'Makes a color more opaque.') },
          { func: 'transparentize($color, $amount)', desc: localize('scss.builtin.transparentize', 'Makes a color more transparent.') },
          { func: 'fade-out($color, $amount)', desc: localize('scss.builtin.fade-out', 'Makes a color more transparent.') },
          { func: 'adjust-color($color, [$red], [$green], [$blue], [$hue], [$saturation], [$lightness], [$alpha])', desc: localize('scss.builtin.adjust-color', 'Increases or decreases one or more components of a color.') },
          { func: 'scale-color($color, [$red], [$green], [$blue], [$saturation], [$lightness], [$alpha])', desc: localize('scss.builtin.scale-color', 'Fluidly scales one or more properties of a color.') },
          { func: 'change-color($color, [$red], [$green], [$blue], [$hue], [$saturation], [$lightness], [$alpha])', desc: localize('scss.builtin.change-color', 'Changes one or more properties of a color.') },
          { func: 'ie-hex-str($color)', desc: localize('scss.builtin.ie-hex-str', 'Converts a color into the format understood by IE filters.') }
      ];
      SCSSCompletion.selectorFuncs = [
          { func: 'selector-nest($selectors…)', desc: localize('scss.builtin.selector-nest', 'Nests selector beneath one another like they would be nested in the stylesheet.') },
          { func: 'selector-append($selectors…)', desc: localize('scss.builtin.selector-append', 'Appends selectors to one another without spaces in between.') },
          { func: 'selector-extend($selector, $extendee, $extender)', desc: localize('scss.builtin.selector-extend', 'Extends $extendee with $extender within $selector.') },
          { func: 'selector-replace($selector, $original, $replacement)', desc: localize('scss.builtin.selector-replace', 'Replaces $original with $replacement within $selector.') },
          { func: 'selector-unify($selector1, $selector2)', desc: localize('scss.builtin.selector-unify', 'Unifies two selectors to produce a selector that matches elements matched by both.') },
          { func: 'is-superselector($super, $sub)', desc: localize('scss.builtin.is-superselector', 'Returns whether $super matches all the elements $sub does, and possibly more.') },
          { func: 'simple-selectors($selector)', desc: localize('scss.builtin.simple-selectors', 'Returns the simple selectors that comprise a compound selector.') },
          { func: 'selector-parse($selector)', desc: localize('scss.builtin.selector-parse', 'Parses a selector into the format returned by &.') }
      ];
      SCSSCompletion.builtInFuncs = [
          { func: 'unquote($string)', desc: localize('scss.builtin.unquote', 'Removes quotes from a string.') },
          { func: 'quote($string)', desc: localize('scss.builtin.quote', 'Adds quotes to a string.') },
          { func: 'str-length($string)', desc: localize('scss.builtin.str-length', 'Returns the number of characters in a string.') },
          { func: 'str-insert($string, $insert, $index)', desc: localize('scss.builtin.str-insert', 'Inserts $insert into $string at $index.') },
          { func: 'str-index($string, $substring)', desc: localize('scss.builtin.str-index', 'Returns the index of the first occurance of $substring in $string.') },
          { func: 'str-slice($string, $start-at, [$end-at])', desc: localize('scss.builtin.str-slice', 'Extracts a substring from $string.') },
          { func: 'to-upper-case($string)', desc: localize('scss.builtin.to-upper-case', 'Converts a string to upper case.') },
          { func: 'to-lower-case($string)', desc: localize('scss.builtin.to-lower-case', 'Converts a string to lower case.') },
          { func: 'percentage($number)', desc: localize('scss.builtin.percentage', 'Converts a unitless number to a percentage.'), type: 'percentage' },
          { func: 'round($number)', desc: localize('scss.builtin.round', 'Rounds a number to the nearest whole number.') },
          { func: 'ceil($number)', desc: localize('scss.builtin.ceil', 'Rounds a number up to the next whole number.') },
          { func: 'floor($number)', desc: localize('scss.builtin.floor', 'Rounds a number down to the previous whole number.') },
          { func: 'abs($number)', desc: localize('scss.builtin.abs', 'Returns the absolute value of a number.') },
          { func: 'min($numbers)', desc: localize('scss.builtin.min', 'Finds the minimum of several numbers.') },
          { func: 'max($numbers)', desc: localize('scss.builtin.max', 'Finds the maximum of several numbers.') },
          { func: 'random([$limit])', desc: localize('scss.builtin.random', 'Returns a random number.') },
          { func: 'length($list)', desc: localize('scss.builtin.length', 'Returns the length of a list.') },
          { func: 'nth($list, $n)', desc: localize('scss.builtin.nth', 'Returns a specific item in a list.') },
          { func: 'set-nth($list, $n, $value)', desc: localize('scss.builtin.set-nth', 'Replaces the nth item in a list.') },
          { func: 'join($list1, $list2, [$separator])', desc: localize('scss.builtin.join', 'Joins together two lists into one.') },
          { func: 'append($list1, $val, [$separator])', desc: localize('scss.builtin.append', 'Appends a single value onto the end of a list.') },
          { func: 'zip($lists)', desc: localize('scss.builtin.zip', 'Combines several lists into a single multidimensional list.') },
          { func: 'index($list, $value)', desc: localize('scss.builtin.index', 'Returns the position of a value within a list.') },
          { func: 'list-separator(#list)', desc: localize('scss.builtin.list-separator', 'Returns the separator of a list.') },
          { func: 'map-get($map, $key)', desc: localize('scss.builtin.map-get', 'Returns the value in a map associated with a given key.') },
          { func: 'map-merge($map1, $map2)', desc: localize('scss.builtin.map-merge', 'Merges two maps together into a new map.') },
          { func: 'map-remove($map, $keys)', desc: localize('scss.builtin.map-remove', 'Returns a new map with keys removed.') },
          { func: 'map-keys($map)', desc: localize('scss.builtin.map-keys', 'Returns a list of all keys in a map.') },
          { func: 'map-values($map)', desc: localize('scss.builtin.map-values', 'Returns a list of all values in a map.') },
          { func: 'map-has-key($map, $key)', desc: localize('scss.builtin.map-has-key', 'Returns whether a map has a value associated with a given key.') },
          { func: 'keywords($args)', desc: localize('scss.builtin.keywords', 'Returns the keywords passed to a function that takes variable arguments.') },
          { func: 'feature-exists($feature)', desc: localize('scss.builtin.feature-exists', 'Returns whether a feature exists in the current Sass runtime.') },
          { func: 'variable-exists($name)', desc: localize('scss.builtin.variable-exists', 'Returns whether a variable with the given name exists in the current scope.') },
          { func: 'global-variable-exists($name)', desc: localize('scss.builtin.global-variable-exists', 'Returns whether a variable with the given name exists in the global scope.') },
          { func: 'function-exists($name)', desc: localize('scss.builtin.function-exists', 'Returns whether a function with the given name exists.') },
          { func: 'mixin-exists($name)', desc: localize('scss.builtin.mixin-exists', 'Returns whether a mixin with the given name exists.') },
          { func: 'inspect($value)', desc: localize('scss.builtin.inspect', 'Returns the string representation of a value as it would be represented in Sass.') },
          { func: 'type-of($value)', desc: localize('scss.builtin.type-of', 'Returns the type of a value.') },
          { func: 'unit($number)', desc: localize('scss.builtin.unit', 'Returns the unit(s) associated with a number.') },
          { func: 'unitless($number)', desc: localize('scss.builtin.unitless', 'Returns whether a number has units.') },
          { func: 'comparable($number1, $number2)', desc: localize('scss.builtin.comparable', 'Returns whether two numbers can be added, subtracted, or compared.') },
          { func: 'call($name, $args…)', desc: localize('scss.builtin.call', 'Dynamically calls a Sass function.') }
      ];
      SCSSCompletion.scssAtDirectives = [
          {
              label: "@extend",
              documentation: localize("scss.builtin.@extend", "Inherits the styles of another selector."),
              kind: main_js_1.CompletionItemKind.Keyword
          },
          {
              label: "@at-root",
              documentation: localize("scss.builtin.@at-root", "Causes one or more rules to be emitted at the root of the document."),
              kind: main_js_1.CompletionItemKind.Keyword
          },
          {
              label: "@debug",
              documentation: localize("scss.builtin.@debug", "Prints the value of an expression to the standard error output stream. Useful for debugging complicated Sass files."),
              kind: main_js_1.CompletionItemKind.Keyword
          },
          {
              label: "@warn",
              documentation: localize("scss.builtin.@warn", "Prints the value of an expression to the standard error output stream. Useful for libraries that need to warn users of deprecations or recovering from minor mixin usage mistakes. Warnings can be turned off with the `--quiet` command-line option or the `:quiet` Sass option."),
              kind: main_js_1.CompletionItemKind.Keyword
          },
          {
              label: "@error",
              documentation: localize("scss.builtin.@error", "Throws the value of an expression as a fatal error with stack trace. Useful for validating arguments to mixins and functions."),
              kind: main_js_1.CompletionItemKind.Keyword
          },
          {
              label: "@if",
              documentation: localize("scss.builtin.@if", "Includes the body if the expression does not evaluate to `false` or `null`."),
              insertText: "@if ${1:expr} {\n\t$0\n}",
              insertTextFormat: main_js_1.InsertTextFormat.Snippet,
              kind: main_js_1.CompletionItemKind.Keyword
          },
          {
              label: "@for",
              documentation: localize("scss.builtin.@for", "For loop that repeatedly outputs a set of styles for each `$var` in the `from/through` or `from/to` clause."),
              insertText: "@for \\$${1:var} from ${2:start} ${3|to,through|} ${4:end} {\n\t$0\n}",
              insertTextFormat: main_js_1.InsertTextFormat.Snippet,
              kind: main_js_1.CompletionItemKind.Keyword
          },
          {
              label: "@each",
              documentation: localize("scss.builtin.@each", "Each loop that sets `$var` to each item in the list or map, then outputs the styles it contains using that value of `$var`."),
              insertText: "@each \\$${1:var} in ${2:list} {\n\t$0\n}",
              insertTextFormat: main_js_1.InsertTextFormat.Snippet,
              kind: main_js_1.CompletionItemKind.Keyword
          },
          {
              label: "@while",
              documentation: localize("scss.builtin.@while", "While loop that takes an expression and repeatedly outputs the nested styles until the statement evaluates to `false`."),
              insertText: "@while ${1:condition} {\n\t$0\n}",
              insertTextFormat: main_js_1.InsertTextFormat.Snippet,
              kind: main_js_1.CompletionItemKind.Keyword
          },
          {
              label: "@mixin",
              documentation: localize("scss.builtin.@mixin", "Defines styles that can be re-used throughout the stylesheet with `@include`."),
              insertText: "@mixin ${1:name} {\n\t$0\n}",
              insertTextFormat: main_js_1.InsertTextFormat.Snippet,
              kind: main_js_1.CompletionItemKind.Keyword
          },
          {
              label: "@include",
              documentation: localize("scss.builtin.@include", "Includes the styles defined by another mixin into the current rule."),
              kind: main_js_1.CompletionItemKind.Keyword
          },
      ];
      return SCSSCompletion;
  }(cssCompletion_js_1.CSSCompletion));
  exports.SCSSCompletion = SCSSCompletion;
  

});