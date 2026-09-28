/**
 * 公開前のチェック：問い合わせフォームが「見た目だけ」になっていないか。
 *
 * 2026-09-28、Claude Design から書き出したファイルをアップロードしたときに、フォームの送り先（Formspree）と
 * 送信の処理が消え、押しても誰にも届かない状態で公開されてしまった。同じことが起きたら公開を止める。
 * .github/workflows/pages.yml から、push のたびに呼ばれる。手元では `node .github/scripts/check-site.mjs`。
 *
 * 見ること（index.html）：
 *   1. <form> の送り先が Formspree（action と method="POST"）
 *   2. 迷惑送信の対策の見えない入力欄（_gotcha）
 *   3. メールの件名（_subject）
 *   4. Formspree へ送り、送信後にお礼（#contact-thanks）を出す <script>
 */

import { readFileSync } from 'node:fs';

const html = readFileSync('index.html', 'utf8');
const formTag = html.match(/<form\b[^>]*class="[^"]*\bcontact\b[^"]*"[^>]*>/i)?.[0] ?? '';

const checks = [
  {
    name: 'フォームの送り先が Formspree',
    ok: /action="https:\/\/formspree\.io\/f\/[a-z0-9]+"/i.test(formTag) && /method="POST"/i.test(formTag),
    hint: '<form class="contact ..."> に action="https://formspree.io/f/meedakqy" method="POST" を付ける',
  },
  {
    name: '迷惑送信の対策（_gotcha）',
    ok: /<input\b[^>]*name="_gotcha"/i.test(html),
    hint: '<input type="text" name="_gotcha" ...>（人には見えない欄）をフォームの中に戻す',
  },
  {
    name: 'メールの件名（_subject）',
    ok: /<input\b[^>]*name="_subject"/i.test(html),
    hint: '<input type="hidden" name="_subject" value="OenoAI サイトからのお問い合わせ"> を戻す',
  },
  {
    name: 'Formspree へ送る処理とお礼の表示',
    ok: /fetch\(\s*formEl\.action/.test(html) && /id="contact-thanks"/.test(html),
    hint: '<div id="contact-thanks"> と、その下の送信の <script>（fetch(formEl.action, ...)）を戻す',
  },
];

const failed = checks.filter((c) => !c.ok);
for (const c of checks) console.log(`${c.ok ? '✓' : '✗'} ${c.name}`);

if (failed.length > 0) {
  for (const c of failed) {
    // GitHub Actions の画面とメールに、そのまま出る形。
    console.log(`::error file=index.html,title=問い合わせフォームが壊れています::${c.name} が見つかりません。${c.hint}`);
  }
  console.log(
    '\n問い合わせフォームの一式（<div id="contact-form"> から下の <script> まで）が欠けています。' +
      '\nこのままでは公開しません。直前の正しい index.html（git の履歴）から、フォームの一式を戻してください。'
  );
  process.exit(1);
}
console.log('\n問い合わせフォームは正しい形です。');
