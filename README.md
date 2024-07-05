# px2-clover

[Pickles 2](https://pickles2.com/) のプラグイン型CMS。


## Usage - 使い方

### インストール

```
composer require pickles2/px2-clover;
```

### セットアップ

`px-files/config.php` の `$conf->funcs->before_sitemap` 先頭に、 `tomk79\pickles2\px2clover\main::register()` の設定を追加する。

```php
	// funcs: Before sitemap
	$conf->funcs->before_sitemap = [
		// px2-clover
		tomk79\pickles2\px2clover\main::register( array(
			/* any options... */
		) ),

		// ...other plugins
	];
```


`$conf->allow_pxcommands` を有効に設定します。
この設定により、すべてのPXコマンドがブラウザから実行できるようになります。
通常、この設定は無効にすることが推奨されていますが、 Clover CMS が、他のすべてのPXコマンドの実行に認証を求め、保護するため、安全に使うことができます。

```php
$conf->allow_pxcommands = 1;
```

### プラグインオプション

必要に応じて、追加のオプションを設定できます。

```php
	// funcs: Before sitemap
	$conf->funcs->before_sitemap = [
		// px2-clover
		tomk79\pickles2\px2clover\main::register( array(
			// プレビューに認証を要求するか？; false (default) | true
			"protect_preview" => true,

			// 管理ユーザーの格納ディレクトリ (省略可)
			// 主に、サブディレクトリにインストールされたプロジェクトで、親プロジェクトとユーザーを共有したい場合に設定します。
			"realpath_admin_user_dir" => __DIR__.'/_sys/ram/data/px2-clover/admin_users/'
		) ),
	];
```


### 管理画面から設定

ここまでの設定ができたら、ブラウザでプレビューにアクセスし、管理画面から設定を続けます。
詳しくは管理画面の指示に従ってください。

通常、プレビュー画面の右下に管理メニューが表示され、管理画面へ遷移できます。
管理画面のURLは、 プレビューに `PX=admin` を付与したもの(例: `https://yourdomain/?PX=admin`) になります。


## 予約語

### 環境変数

- `APP_KEY`: 暗号・復号 に使用するキー

### セッション

- `ADMIN_USER_ID`
- `ADMIN_USER_PW`
- `ADMIN_USER_CSRF_TOKEN`


## 更新履歴 - Change log

### pickles2/px2-clover v0.3.6 (リリース日未定)

- GUI編集コンテンツを一括再構成機能を追加。
- スマートフォンで記事編集画面がズームされないようになった。

### pickles2/px2-clover v0.3.5 (2024年5月17日)

- Broccoliで、loopモジュールの座標が正しく取得できない場合がある不具合を修正。

### pickles2/px2-clover v0.3.4 (2024年4月30日)

- ダークモードスタイルに関する修正。
- その他、細かい修正など。

### pickles2/px2-clover v0.3.3 (2024年3月20日)

- 管理画面への予期せぬドロップ操作をキャンセルするようになった。
- 管理画面拡張機能で、バックエンドの処理が長いときに、タイムアウトエラーが起きにくくした。

### pickles2/px2-clover v0.3.2 (2024年2月18日)

- 依存パッケージのバージョンを調整した。
- 編集履歴UIの改善。

### pickles2/px2-clover v0.3.1 (2023年11月13日)

- プラグインオプション `realpath_admin_user_dir` を追加した。
- サブディレクトリにセットアップされたプロジェクトの場合に、リダイレクト先のパスが合わなくなることがある不具合を修正。
- `PX=admin.serve` を追加。開発用ローカルサーバー機能を取り込んだ。
- 個人設定に "外観" を追加。ダークモードを設定できるようになった。
- その他、細かい不具合の修正、内部コードの修正など。

### pickles2/px2-clover v0.3.0 (2023年9月24日)

- プレビューへのリクエストに対して、POSTの場合でも管理画面用CSRFトークンを求めないように修正した。(アプリケーション側で処理するべきリクエストであるため)
- チェックアウト機能を追加した。
- px2dthelper の `$px->authorizer` に対応した。
- ロール `member` を追加した。
- アカウントがロックされているときに、メッセージを表示するようになった。
- ログと内部管理される時刻情報を ISO 8601 形式 に変更した。
- いくつかのログメッセージを修正した。
- プラグインオプション `app_mode` を廃止した。
- その他、不具合の修正、安全性の向上、内部コードの修正など。

### pickles2/px2-clover v0.2.9 (2023年8月29日)

- 新規ブログ記事作成時に、最新記事のデータがプリセットされるようになった。
- デフォルトのコンテンツ編集画面で、プレビュー内のリンクを開けるようになった。

### pickles2/px2-clover v0.2.8 (2023年7月14日)

- ブログ記事情報編集ダイアログで、フラグ形式の項目の値がプリセットされない不具合を修正した。
- その他、不具合の修正、内部コードの修正など。

### pickles2/px2-clover v0.2.7 (2023年6月25日)

- アカウントロック機能を追加。
- パブリッシュ中の不要なポーリングを削除した。
- その他、不具合の修正、内部コードの修正など。

### pickles2/px2-clover v0.2.6 (2023年5月1日)

- クライアントサイド `cceAgent` の `editContent()`、 `editThemeLayout()`、 `openInBrowser()` に対応。
- ブログ管理メニューを追加。
- 古いバージョンの git環境で、削除されたファイルをコミットできない不具合を修正した。
- Gitリポジトリの初期化機能を追加した。
- `$conf->tagline` (キャッチフレーズ) の編集に対応した。
- その他、不具合の修正、UI改善など。

### pickles2/px2-clover v0.2.5 (2023年3月11日)

- 管理ユーザー情報を削除できない不具合を修正。
- 初期セットアップ画面、認証画面のUI改善。
- 一部UIの英語化に対応。
- その他、不具合の修正、UI改善など。

### pickles2/px2-clover v0.2.4 (2023年2月11日)

- ダッシュボードに、サイト基本情報を表示するようになった。
- 設定ファイル `config.json` のファイル名を `.*.php` で保存するように変更した。
- ページ情報編集画面で、各項目の型を反映するようになった。
- サブディレクトリにインストールされている場合に、PXコマンドが正しく送信されない不具合を修正した。
- その他、不具合の修正、UI改善など。

### pickles2/px2-clover v0.2.3 (2022年12月29日)

- ページ情報画面に ブロックエディタのコンテンツを再構成する 機能を追加。
- ページ情報画面に 単体パブリッシュ 機能を追加。
- ページ情報画面に 編集方法を変更する 機能を追加。
- ファイルを直接操作する機能を追加。
- コンテンツ編集画面、テーマ編集画面から、フォルダを開けるようになった。
- 拡張機能(Custom Console Extensions)を読み込めるようになった。
- 公開リソースディレクトリ名を `__console_resources` に変更した。
- その他、UI改善など。

### pickles2/px2-clover v0.2.2 (2022年11月3日)

- ページ情報編集機能の改善。
- 兄弟ページ追加機能を、兄追加と弟追加に分けた。
- ページの並べ替え機能を追加。
- `admin_users`、`scheduler`、`logs` のファイル名を `.*.php` で保存するように変更した。

### pickles2/px2-clover v0.2.1 (2022年7月11日)

- `app_mode` オプションを追加。
- テーマ編集機能を追加。
- コンテンツ編集画面に `lang` 設定が反映されるようになった。
- モジュール編集機能を追加。
- その他の不具合修正、UI改善、パフォーマンス改善など。

### pickles2/px2-clover v0.2.0 (2022年6月5日)

- パッケージ名の移管: tomk79/px2-clover -> pickles2/px2-clover
- パブリッシュが重くなる問題を修正した。
- ログイン処理の改善。
- メンバー管理機能を追加。
- メンテナンスモードを追加。
- その他の不具合修正、UI改善、パフォーマンス改善など。

### tomk79/px2-clover v0.1.1 (2022年5月22日)

- パブリッシュ画面を追加。
- キャッシュを消去画面を追加。
- 見た目に関する様々な変更。
- タスクスケジューラー: 排他ロックするようになった。
- タスクスケジューラー: 実行ログを残すようになった。
- Gitの基本操作画面を追加。
- Gitの自動コミット機能を追加。
- その他の変更。

### tomk79/px2-clover v0.1.0 (2022年5月6日)

- Initial Release



## ライセンス - License

MIT License https://opensource.org/licenses/mit-license.php


## 作者 - Author

- Tomoya Koyanagi <tomk79@gmail.com>
- website: <https://www.pxt.jp/>
- Twitter: @tomk79 <https://twitter.com/tomk79/>
