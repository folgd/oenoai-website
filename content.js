/* ============================================================
 * OenoAI — content layer
 * All visible text lives here. Edit this file only when changing copy.
 * Key structure is the contract; do not rename keys.
 * Multi-line strings:
 *   \n        → soft line break (<br>)
 *   \n\n      → paragraph break (<p>...</p>)
 * ============================================================ */

const CONTENT = {
  /* ---------------- 日本語 ---------------- */
  ja: {
    nav: {
      top: 'TOP',
      philosophy: 'PHILOSOPHY',
      products: 'PRODUCTS',
      contact: 'CONTACT',
      company: 'COMPANY'
    },
    hero: {
      catchcopy: '醸造家の知と想いを\n然るべき人へ、今。',
      cta_philosophy: '理念を読む →',
      cta_contact: 'お問い合わせ →'
    },
    gap: {
      title: 'すれ違い続けてきた、想いと出会い。',
      body: `世界のワイン消費量は減少し続け、今や60年以上ぶりの低水準にある。

それでも、ワインを愛する人は確かに存在する。
今夜、何かを感じたいと思っている人が、どこかにいる。

生産者は、自分のワインを受け取るべき人を知っている。
インポーターは、国境を越えて運んできた物語の重さを知っている。
飲食店は、この一本がどんな夜を変えるかを知っている。

それでも、想いは届かない。
求める心と、届けたい心は、今日もすれ違っている。

OenoAIは、その現実を変えるために生まれました。
醸造家の知と想いを、然るべき人へ、今。`
    },
    serve: {
      title: 'ワインに関わるすべての人へ。',
      producer: {
        heading: 'あなたのワインを、待ち望む人がいる。',
        body: '土地の記憶、葡萄の意思、醸造家の哲学——\nOenoAIはそれをデータとして読み解き、\n然るべき市場へ、然るべき人へと届ける道を開く。'
      },
      importer: {
        heading: 'あの感動を届けたい人が、どこかにいる。',
        body: 'その感動を知らない、まだ出会えていない、想像すらできていない。\nその悔しさを、誓いに変えた。\n\nOenoAIは、その想いを途切れさせない。\n想いが生まれた瞬間から、受け取るべき人まで、一本の線でつなぐ。'
      },
      restaurant: {
        heading: 'また必ずここに来る、と記憶に刻まれる店がある。',
        body: '手の込んだ料理、こだわりの空間、そしてワイン。\n最後のワンピースだけが、偶然に委ねられている。\n\nOenoAIは、その偶然を必然に変え、お店の日常を感動に変える。'
      }
    },
    products: {
      text: 'Our products, coming soon.'
    },
    cta: {
      philosophy: '理念を読む →',
      contact: 'お問い合わせ →'
    },
    philosophy: {
      page_title: '理念',
      story_label: 'Story',
      story_opening: 'ワインは、哲学である。',
      story_body: [
        '土地が記憶を持ち、葡萄がその意思を受け取り、醸造家がそれを瓶の中に封じ込める。一本のワインには、自然と人が交わした長い対話の結晶が宿っている。',
        'その結晶は人々の会話を生み、喜びを育て、文化を創りあげる。',
        'しかし、その結晶はまだ、偶然に委ねられている。',
        '情熱を込めて生まれたワインが、必要とする人の手に届いたとき、はじめて完成する。願った人が、願ったタイミングで出会ったとき、ワインはその本来の意味を、静かに果たす。',
        '求める心と、届けたい心を交わらせるために、OenoAIは生まれました。'
      ],
      philosophy_label: 'Philosophy',
      philosophy_body: [
        'ワインに関わるすべての人の「叶えたい」に応え続ける。',
        '情熱の結晶を、最良のタイミングで、必要とする人へ届ける。'
      ]
    },
    contact: {
      heading: 'まずは、ご連絡ください。',
      name: 'お名前',
      company: '会社名',
      email: 'メールアドレス',
      category: 'お問い合わせ種別',
      category_options: ['事業・サービスについて', '取材・メディア', 'パートナーシップ', 'その他'],
      message: 'メッセージ',
      submit: '送信する'
    },
    company: {
      tagline_top: 'Oenology × AI',
      tagline_sub: '醸造の知と想いを、\nAIとDATAで昇華させる。',
      table: {
        company: ['会社名', 'OenoAI'],
        representative: ['代表 & CEO', '村上大輔'],
        representative_bio: '20年以上にわたり、中央省庁・自治体向けにIT/AI領域の営業・事業開発に従事。Microsoft、Symantec、UiPathなどグローバルテック企業で公共領域の大型案件を複数主導。ワインの専門的知識を持つ実務家としてOenoAIを創業。千葉工業大学情報学修士／アデレード大学醸造学課程修了。',
        business_label: '事業内容',
        business_items: [
          'ワイン・酒販業界へのAIサービスの提供。',
          '国・自治体補助金等を活用した飲食・ワイナリー事業者のAI導入支援。',
          '自治体・観光協会向けのワインツーリズム等DX企画・実装支援。',
          '官公庁・行政機関との折衝を含む、飲食・ワイナリー事業者向けDXコンサルティング。'
        ]
      }
    },
    footer: {
      copyright: '© 2025 OenoAI. All rights reserved.'
    },

    /* ----- extensions (preserves visual elements not in original spec) ----- */
    ext: {
      hero_eyebrow: 'Oenology × Artificial Intelligence',
      hero_meta: 'EST · 2025 · TOKYO',
      gap_eyebrow: 'The Gap We Close',
      gap_figure: '60',
      gap_figure_unit: 'YR',
      serve_eyebrow: 'Who We Serve',
      products_eyebrow: 'Products',
      products_meta_status: ['Status', 'In Development'],
      products_meta_preview: ['Preview', '2026 Q3'],
      products_meta_sector: ['Sector', 'Wine · Beverage · AI'],
      products_meta_inquiries: ['Inquiries', 'Open →'],
      cta_title: '続きを、ご一緒に。',
      contact_eyebrow: 'Contact',
      contact_required: '必須',
      contact_category_placeholder: '選択してください',
      contact_based_label: '所在地',
      contact_based_val: 'Tokyo, Japan',
      company_eyebrow: 'Company',
      footer_navigate: 'Navigate',
      footer_connect: 'Connect',
      footer_location: 'Tokyo · Japan',
      back_to_top: 'トップへ戻る'
    }
  },

  /* ---------------- English ---------------- */
  en: {
    nav: {
      top: 'TOP',
      philosophy: 'PHILOSOPHY',
      products: 'PRODUCTS',
      contact: 'CONTACT',
      company: 'COMPANY'
    },
    hero: {
      catchcopy: 'The Oenologist\'s knowledge and passion — to those who seek it, now.',
      cta_philosophy: 'Our philosophy →',
      cta_contact: 'Contact us →'
    },
    gap: {
      title: 'A gap that has always existed — until now.',
      body: `Global wine consumption has fallen to its lowest level in over six decades.

Yet the people who truly love wine still exist.
Someone, somewhere tonight, is hoping to feel something.

The producer knows whose hands their wine belongs in.
The importer carries the weight of a story brought across borders.
The restaurateur knows which bottle will change someone's evening.

And still — the intention never quite arrives.
The longing to discover, and the longing to be found, keep missing each other.

OenoAI was born to change that reality.
The Oenologist's knowledge and passion — to those who seek it, now.`
    },
    serve: {
      title: 'For everyone who believes in wine.',
      producer: {
        heading: 'Someone is waiting for your wine.',
        body: 'The memory of your land, the will of your grapes, the philosophy of your craft —\nOenoAI reads these signals\nand opens the path to those who were always meant to find you.'
      },
      importer: {
        heading: 'Someone out there needs the wine that moved you.',
        body: 'They don\'t know it exists. They haven\'t encountered it yet. They can\'t even imagine it.\nThat frustration became a promise.\n\nOenoAI keeps that promise alive.\nFrom the moment of passion to the hands of those who deserve it — one unbroken line.'
      },
      restaurant: {
        heading: 'There are places people return to, because they cannot forget them.',
        body: 'The cuisine you\'ve perfected, the soul of your space, and the wine.\nThe last piece alone is still left to chance.\n\nOenoAI turns that chance into intention —\ntransforming your everyday into something unforgettable.'
      }
    },
    products: {
      text: 'Our products, coming soon.'
    },
    cta: {
      philosophy: 'Our philosophy →',
      contact: 'Contact us →'
    },
    philosophy: {
      page_title: 'Philosophy',
      story_label: 'Story',
      story_opening: 'Wine is philosophy.',
      story_body: [
        'The land holds memory. The grape receives its will. The oenologist seals their long dialogue into every bottle. In a single wine lives the crystallized conversation between nature and humanity — across seasons, across time.',
        'That crystal sparks conversation, nurtures joy, and builds culture.',
        'Yet that crystal is still left to chance.',
        'A wine born of passion finds its completion only when it reaches the hands of the person who needed it. When the right person encounters it at the right moment, the wine fulfills, quietly, what it was always meant to be.',
        'OenoAI was born to bring together the heart that seeks and the heart that wishes to deliver.'
      ],
      philosophy_label: 'Philosophy',
      philosophy_body: [
        'We are committed to realizing the intentions of everyone in the wine world.',
        'The crystal of passion — to those who need it, at the right moment.'
      ]
    },
    contact: {
      heading: 'Reach out, anytime.',
      name: 'Name',
      company: 'Company',
      email: 'Email',
      category: 'Category',
      category_options: ['Business & Services', 'Press & Media', 'Partnership', 'Other'],
      message: 'Message',
      submit: 'Send'
    },
    company: {
      tagline_top: 'Oenology × AI',
      tagline_sub: 'Elevating the knowledge and passion of oenology through AI and data.',
      table: {
        company: ['Company', 'OenoAI'],
        representative: ['Representative & CEO', 'Daisuke Murakami'],
        representative_bio: 'Over 20 years of sales and business development experience in IT/AI, focused on central government ministries and local municipalities. Led multiple large-scale public sector projects at global tech companies including Microsoft, Symantec, and UiPath. Founded OenoAI as a practitioner with specialist knowledge in oenology. Master\'s in Information Science, Chiba Institute of Technology / Certificate in Oenology, University of Adelaide.',
        business_label: 'Business',
        business_items: [
          'AI services for the wine and beverage industry.',
          'AI adoption support for restaurants and wineries utilizing national and municipal subsidies.',
          'Wine tourism and DX planning and implementation for local governments and tourism associations.',
          'DX consulting for restaurants and wineries, including coordination with government and public agencies.'
        ]
      }
    },
    footer: {
      copyright: '© 2025 OenoAI. All rights reserved.'
    },

    /* ----- extensions ----- */
    ext: {
      hero_eyebrow: 'Oenology × Artificial Intelligence',
      hero_meta: 'EST · 2025 · TOKYO',
      gap_eyebrow: 'The Gap We Close',
      gap_figure: '60',
      gap_figure_unit: 'YR',
      serve_eyebrow: 'Who We Serve',
      products_eyebrow: 'Products',
      products_meta_status: ['Status', 'In Development'],
      products_meta_preview: ['Preview', '2026 Q3'],
      products_meta_sector: ['Sector', 'Wine · Beverage · AI'],
      products_meta_inquiries: ['Inquiries', 'Open →'],
      cta_title: 'Let us continue, together.',
      contact_eyebrow: 'Contact',
      contact_required: 'Required',
      contact_category_placeholder: 'Please select',
      contact_based_label: 'Based in',
      contact_based_val: 'Tokyo, Japan',
      company_eyebrow: 'Company',
      footer_navigate: 'Navigate',
      footer_connect: 'Connect',
      footer_location: 'Tokyo · Japan',
      back_to_top: 'Return to top'
    }
  }
};

/* Expose to other scripts */
window.CONTENT = CONTENT;
