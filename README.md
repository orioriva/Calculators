# 計算表作成サイト
電卓でちょっとした計算をしている時、さっき使った数値をまた使いたくなった事がありませんか？<br>
でもExcelとか使うほどじゃ…って事が多いなら、是非このサイトを使用してみて下さい！！

<img src="calculatorpage.png" width="800px">

## 実行方法
計算表の作成だけであれば下記デモページから行えます。<br>
[動作確認用デモページ（計算表作成画面のみ）](https://orioriva.github.io/)
### 完全なプロジェクトの実行方法
<details>
<summary>開く</summary>

1. gitBashでプロジェクトのクローンを作成したい場所を指定する
```$ cd [ファイルパス]```
1. aa
```$ git clone https://github.com/orioriva/Calculators```


</details>

## 出来る事
・キャンバス上に数値を配置し、簡単な四則演算を使用した計算表が作成出来ます。<br>
・掲示板から他人が作成した計算表を使用出来、また自身の作成した計算表を掲示板へ投稿して共有する事も出来ます。

### 初期登録ユーザー
ユーザー名|ログインID|ログインパスワード|補足
---|---|---|---
かんりしゃ|admin|admin|管理者アカウント<br>（現在管理者専用機能はありません）
てすと|test|test|一般ユーザー<br>（実行時に初期データとして投稿済データや保存した計算表データがあります）

H2 Databaseを使用している為、実行後に`/h2-console`にアクセスする事でデータベースを操作可能です。
```
H2 Database 初期ログイン情報
Driver Class：org.h2.Driver
JDBC URL：jdbc:h2:mem:calculators
ID：root
Password：（無し）
```


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
