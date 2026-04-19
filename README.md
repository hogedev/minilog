# minilog

minilog 公開ブログビューア。minilog-api の公開エントリを表示する React SPA。

| 環境    | URL                                                |
| ------- | -------------------------------------------------- |
| Netlify | GitHub Actions 経由でデプロイ（VITE_API_URL: GCE） |
| Gitea   | https://gitea.honya.dev/honya-dev-minilog/minilog  |
| GitHub  | https://github.com/hogedev/minilog                 |

関連リポジトリ: [minilog-api](https://gitea.honya.dev/honya-dev-minilog/minilog-api)（API） / [minilog-admin](https://gitea.honya.dev/honya-dev-minilog/minilog-admin)（管理画面）

## 技術スタック

- React 19 / TypeScript / Vite / Tailwind CSS
- React Router / TanStack Query

## デプロイ

```
GitHub ミラー → GitHub Actions → npm build → Netlify
```

## ローカル開発

```bash
npm ci
npm run dev
```

環境変数 `VITE_API_URL` で API の接続先を指定（デフォルト: `/api/v1`）。
