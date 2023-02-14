INSERT INTO `users`(
	userName,
	userId,
	password,
	role
)VALUES
	('かんりしゃ','admin','$2a$10$pdq4Je8Quso/fc49ENoajumO/4JNQlVxF/o0eHU6AMSaHC9PkJWge','ROLE_ADMIN'),
	('てすと','test','$2a$10$lJMwQdThMO8kjXIQuFMEneTdWGE.bcLAFXkq8z9EUvzvxETaLdmY.','ROLE_GENERAL')
;

INSERT INTO categories(ja,en)VALUES
	('その他','others'),
	('生活','life'),
	('健康','health'),
	('交通','traffic'),
	('仕事','work'),
	('勉強','study'),
	('遊び','play')
;

INSERT INTO formulas(
	creatorId,
	updateDate,
	title,
	jsonData
)VALUES
	(2,'2023-02-14 14:02:55.79','test','[{"type":"number","x":411.5022449381077,"y":195.65609958382194,"tag":"NEW","number":5,"calcSource":null,"nextObj":[1],"prevObj":[]},{"type":"sign","x":489.1252918131077,"y":195.65609958382194,"typeText":"+","nextObj":[2],"prevObj":[0]},{"type":"number","x":604.1252918131077,"y":195.65609958382194,"tag":"NEW","number":5,"calcSource":null,"nextObj":[],"prevObj":[1]},{"type":"number","x":746.9709949381077,"y":195.65609958382194,"tag":"NEW ＋ NEW","number":"10","calcSource":1}]' FORMAT JSON)
;

INSERT INTO bbsformulas(
	category,
	creatorId,
	updateDate,
	title,
	comment,
	jsonData
)VALUES
	(1,1,'2023-02-14 10:44:18.321','チュートリアルその１','ざっくりとですが基本の使い方が分かります。
これを参考に色々いじってみて下さい。','[{"type":"number","x":203.81297169876274,"y":62.04913313459507,"tag":"キャンバス上で数字キーを押してみて下さい","number":"1","calcSource":null,"nextObj":[6],"prevObj":[]},{"type":"number","x":627.445053930344,"y":59.29435032120893,"tag":"数値オブジェクトがでましたか？","number":"2","calcSource":null,"nextObj":[],"prevObj":[6]},{"type":"number","x":163.89203924431817,"y":223.2039277176832,"tag":"今度は数値オブジェクトを選択して","number":"3","calcSource":null,"nextObj":[13],"prevObj":[]},{"type":"number","x":544.5512988497201,"y":222.3274080629231,"tag":"+ - * / のどれかを入力してみましょう","number":4,"calcSource":null,"nextObj":[],"prevObj":[13]},{"type":"number","x":355.12388985732355,"y":390.36915967947647,"tag":"出てきた符号オブジェクトの矢印先の●をここにドラッグ＆ドロップしてみて下さい","number":6,"calcSource":null,"nextObj":[8],"prevObj":[]},{"type":"number","x":259.2551401843423,"y":481.27699252121874,"tag":"計算結果が出ましたか？","number":7,"calcSource":null,"nextObj":[],"prevObj":[8]},{"type":"sign","x":431.88270063806533,"y":60.67174172790201,"typeText":"+","nextObj":[1],"prevObj":[0]},{"type":"number","x":1038.0721439288363,"y":59.29435032120894,"tag":"各オブジェクトはドラッグして自由に動かせます","number":"3","calcSource":6},{"type":"sign","x":84.50777767680364,"y":478.5222097078323,"typeText":"*","nextObj":[5],"prevObj":[4]},{"type":"number","x":631.3243310492148,"y":479.8996011145257,"tag":"タグ名をダブルクリックするとタグ名を編集できます","number":"42","calcSource":8},{"type":"number","x":163.386390511361,"y":617.6387417838315,"tag":"数値オブジェクトを選択した状態で","number":8,"calcSource":null,"nextObj":[26],"prevObj":[]},{"type":"number","x":103.32404131864986,"y":683.7535293050984,"tag":"数字キーで数値追加","number":9,"calcSource":null,"nextObj":[],"prevObj":[]},{"type":"number","x":289.0979689423387,"y":683.7535293050983,"tag":"Cキーで数値を０に","number":"10","calcSource":null,"nextObj":[],"prevObj":[]},{"type":"sign","x":345.5663615925746,"y":223.2039277176832,"typeText":"-","nextObj":[3],"prevObj":[2]},{"type":"number","x":883.5931976002115,"y":220.95001665623002,"tag":"符号オブジェクトが出ましたか？","number":"-1","calcSource":13},{"type":"sign","x":1065.5078813627313,"y":136.9291408479533,"typeText":"+","nextObj":[],"prevObj":[14]},{"type":"pointer","x":1159.384010782304,"y":134.1743580345672,"parent":15},{"type":"sign","x":1066.662926539514,"y":183.76044867551738,"typeText":"-","nextObj":[],"prevObj":[14]},{"type":"pointer","x":1161.6941011358697,"y":182.38305726882433,"parent":17},{"type":"sign","x":1068.97301689308,"y":231.9691479097745,"typeText":"*","nextObj":[],"prevObj":[14]},{"type":"pointer","x":1161.69410113587,"y":230.59175650308146,"parent":19},{"type":"sign","x":1071.2831072466456,"y":284.3100213641108,"typeText":"/","nextObj":[],"prevObj":[14]},{"type":"pointer","x":1162.8491463126525,"y":282.9326299574178,"parent":21},{"type":"number","x":515.6751694301474,"y":682.3761378984052,"tag":"BACKSPACEキーで１桁削除","number":"11","calcSource":null,"nextObj":[],"prevObj":[]},{"type":"number","x":813.6768250401374,"y":682.3761378984053,"tag":"数値をダブルクリックで直接打ち込み","number":"12","calcSource":null,"nextObj":[],"prevObj":[]},{"type":"number","x":813.6768250401374,"y":616.2613503771383,"tag":"色々数値を変えて遊んでみましょう！","number":"13","calcSource":null,"nextObj":[],"prevObj":[26]},{"type":"sign","x":496.37163101817805,"y":617.6387417838315,"typeText":"/","nextObj":[25],"prevObj":[10]},{"type":"number","x":1136.3945787860514,"y":678.243963678326,"tag":"チュートリアル２もよろしく！","number":"0.61538461538461538461","calcSource":26}]' FORMAT JSON),
	(1,1,'2023-02-14 11:56:19.046','チュートリアルその２','チュートリアル１の補足となります。
チュートリアルはこれで以上となります。
計算表作成ページ上部の操作ガイドボタンからいつでも操作方法を確認出来ます。','[{"type":"number","x":859.6091344637083,"y":152.95696597633707,"tag":"まず計算結果の計算に使っている符号オブジェクト選択して削除します","number":"4","calcSource":null,"nextObj":[],"prevObj":[11]},{"type":"number","x":96.3937702579524,"y":450.4735098220381,"tag":"ドットの入力で","number":"1.5","calcSource":null,"nextObj":[2,5],"prevObj":[]},{"type":"sign","x":217.90853385070287,"y":453.2282926354243,"typeText":"*","nextObj":[3],"prevObj":[1]},{"type":"number","x":383.7305216291507,"y":453.22829263542434,"tag":"小数点の計算も可能です","number":"2.5","calcSource":null,"nextObj":[],"prevObj":[2,13]},{"type":"number","x":627.8723158003294,"y":540.003951257087,"tag":"RESULT","number":"3.75","calcSource":2},{"type":"sign","x":224.7891768489985,"y":544.1361254771664,"typeText":"-","nextObj":[4],"prevObj":[1]},{"type":"number","x":945.9360484911397,"y":541.3813426637802,"tag":"一つの数値オブジェクトから複数の符号を伸ばせます","number":"-2.25","calcSource":5},{"type":"number","x":233.84414629511826,"y":49.65261047435753,"tag":"オブジェクトを選択してDELETEキーで削除できます","number":1,"calcSource":null,"nextObj":[9],"prevObj":[]},{"type":"number","x":833.3125930454466,"y":46.897827660971394,"tag":"全て削除したい時はページ上部の全消去ボタンを押してください","number":2,"calcSource":null,"nextObj":[],"prevObj":[9]},{"type":"sign","x":503.7374409620853,"y":49.65261047435753,"typeText":"+","nextObj":[8],"prevObj":[7]},{"type":"number","x":197.3428500615483,"y":157.08914019641622,"tag":"計算結果は直接数値変更や削除はできません","number":"3","calcSource":9},{"type":"sign","x":482.0097926632133,"y":152.95696597633705,"typeText":"+","nextObj":[0],"prevObj":[10]},{"type":"number","x":860.3953381655953,"y":254.8839300716236,"tag":"すると通常の数値オブジェクトとなり、数値の変更や削除が可能になります","number":"7","calcSource":11},{"type":"sign","x":424.6697800956883,"y":588.2126504913441,"typeText":"/","nextObj":[3],"prevObj":[4]},{"type":"number","x":759.6858042468422,"y":454.6056840421174,"tag":"計算結果から後ろへ計算する事も可能です","number":"1.5","calcSource":13},{"type":"sign","x":985.6858042468422,"y":454.6056840421174,"typeText":"+","nextObj":[6],"prevObj":[14]},{"type":"number","x":298.9868256184441,"y":672.233526299621,"tag":"詳しい操作方法はページ上部の操作ガイドからいつでも見返せます","number":"-0.75","calcSource":15},{"type":"number","x":977.6932401433098,"y":671.3570066448608,"tag":"チュートリアル終了です！全消去して好きに計算してみましょう！！","number":"999","calcSource":null,"nextObj":[],"prevObj":[]}]' FORMAT JSON),
	(7,2,'2023-02-14 14:16:21.457','test','test','[{"type":"number","x":411.5022449381077,"y":195.65609958382194,"tag":"NEW","number":5,"calcSource":null,"nextObj":[1],"prevObj":[]},{"type":"sign","x":489.1252918131077,"y":195.65609958382194,"typeText":"+","nextObj":[2],"prevObj":[0]},{"type":"number","x":604.1252918131077,"y":195.65609958382194,"tag":"NEW","number":5,"calcSource":null,"nextObj":[],"prevObj":[1]},{"type":"number","x":746.9709949381077,"y":195.65609958382194,"tag":"NEW ＋ NEW","number":"10","calcSource":1}]' FORMAT JSON)
;