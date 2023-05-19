# 計算表作成サイト
電卓でちょっとした計算をしている時、さっき使った数値をまた使いたくなった事がありませんか？<br>
でもExcelとか使うほどじゃ…って事がしばしばあったので、こういうのがあったらいいなと思い制作してみました！<br>
計算を図式化して後から値を変更出来、作成した計算表をデータベースに保存して他人と共有出来るWebアプリケーションです。
<img src="/../../../../orioriva/orioriva.github.io/blob/main/img/calculatorpage.png">|<img src="/../../../../orioriva/orioriva.github.io/blob/main/img/calculatorpage-phone.png">
---|---
<sub>PC表示</sub>|<sub>スマホ表示</sub>

## 実行方法
計算表の作成だけであれば下記デモページから行えます。<br>
[動作確認用デモページ（計算表作成画面のみ）](https://orioriva.github.io/)<br>
<sub>※スマートフォン等のタッチ操作にも対応しておりますが、タッチ操作用の画面にするかは読込時に判断される為<br>
　ブラウザの開発者機能で途中からタッチ操作に変更する場合はタッチ操作画面のまま一度更新を行って下さい。</sub>

### 完全なページ動作の確認方法
<details>
  <summary>開く</summary>
  <br>
  ※ プロジェクトファイルの実行については、ここではEclipseを使用する前提で説明いたします。<br>
  
  #### 1. プロジェクトをダウンロードする
  ① ページ右上の「<> CODE ▼」をクリックします<br>
  <img src="/../../../../orioriva/orioriva.github.io/blob/main/img/projectDL1.png" width="600px"><br>
  <br>
  ② その中の「Download ZIP」をクリック<br>
  <img src="/../../../../orioriva/orioriva.github.io/blob/main/img/projectDL2.png" height="300px"><br>
  <br>
  ③ ダウンロードしたZIPファイルを好きな場所に展開して下さい<br>
  <img src="/../../../../orioriva/orioriva.github.io/blob/main/img/projectDL3.png" height="200px"><br>
  <br>
  ※ここで後々の混乱回避の為、プロジェクトデータがプロジェクトファイルの直下になっていない場合は<br>
  　中のファイル位置を移動して直しておきましょう<br>
  <img src="/../../../../orioriva/orioriva.github.io/blob/main/img/projectDL4-1.png" width="600px"><br>
  <br>
  <img src="/../../../../orioriva/orioriva.github.io/blob/main/img/projectDL4-2.png" width="600px"><br>
  
  #### 2. プロジェクトを動かしてみる（Eclipse使用）
  ※説明画像のEclipseは[Pleiades](https://mergedoc.osdn.jp/)によって日本語化されています<br>
  <br>
  ① Eclipseを開き、画面左上の「ファイル」から「ファイル・システムからプロジェクトを開く...」を選択<br>
  <img src="/../../../../orioriva/orioriva.github.io/blob/main/img/projectBuild1.png" width="400px"><br>
  <br>
  ② 「ディレクトリー(R)...」をクリック<br>
  <img src="/../../../../orioriva/orioriva.github.io/blob/main/img/projectBuild2.png" width="600px"><br>
  <br>
  ③ プロジェクトを展開したファイルを選択<br>
  <img src="/../../../../orioriva/orioriva.github.io/blob/main/img/projectBuild3.png" width="600px"><br>
  <br>
  ④ 検査が完了すると「完了」が押せるようになるのでクリック<br>
  <img src="/../../../../orioriva/orioriva.github.io/blob/main/img/projectBuild4.png" width="600px"><br>
  <br>
  ⑤ しばらくしてファイルが全て読み込まれたら<br>
  プロジェクト・エクスプローラー上のプロジェクト（名前を変えていなければ「Calculators-main」）を右クリックし<br>
  「実行」＞「Spring Bootアプリケーション」をクリック<br>
  <img src="/../../../../orioriva/orioriva.github.io/blob/main/img/projectBuild5.png" width="600px"><br>
  <br>
  ⑥ コンソール画面にエラー無く最後まで行ったら実行出来ていますので次へ<br>
  <img src="/../../../../orioriva/orioriva.github.io/blob/main/img/projectBuild6.png" width="600px"><br>
  <br>
  ⑦ 各Webブラウザ上(画像はGoogle Chrome)のURL入力欄に「localhost:（ポート番号※）」を打ち込んで移動します。<br>
  　※ポート番号のデフォルトは「8080」<br>
  <img src="/../../../../orioriva/orioriva.github.io/blob/main/img/projectBuild7.png" width="600px"><br>
  <br>
  ⑧ すると計算表作成サイトのトップページへ移動出来るので、色々と操作してみて下さい！<br>
  <img src="/../../../../orioriva/orioriva.github.io/blob/main/img/projectBuild8.png" width="600px"><br>
  <br>
  
</details>

## 出来る事
- キャンバス上に数値を配置し、簡単な四則演算を使用した計算表が作成出来ます。<br>
- 掲示板から他人が作成した計算表を使用出来、また自身の作成した計算表を掲示板へ投稿して共有する事も出来ます。

### 初期登録ユーザー
ユーザー名|ログインID|ログインパスワード|補足
---|---|---|---
かんりしゃ|admin|admin|管理者アカウント<br>
てすと|test|test|一般ユーザー<br>（実行時に初期データとして投稿済データや保存した計算表データがあります）

H2 Databaseを使用している為、実行後に`/h2-console`にアクセスする事でデータベースを操作可能です。<br>
<br>
H2 Database 初期ログイン情報

項目名|入力値
---|---
Driver Class|org.h2.Driver
JDBC URL|jdbc:h2:mem:calculators
ID|root
Password|（無し）

## 使用したもの
### 開発環境
- Eclipse
- Visual Studio Code（計算表のJavaScript部分やHTMLとCSSの動作テスト）

### データベース
- MySQL（制作時）
- H2 Database（アップロード時）

### 使用言語
- Java ver8(JavaSE-1.8)
- HTML ver5
- JavaScript
- CSS
- SQL

### フレームワーク
- springboot ver2.7.6

### 主な使用ライブラリ
- jquery ver3.5.1
- MyBatis ver2.1.4
- SpringSecurity ver5.7.5
- Thymeleaf ver3.0.15

#### その他見た目要素
- bootstrap ver4.5.3
- dataTables ver1.13.1
- font-awesome ver5.15.4
