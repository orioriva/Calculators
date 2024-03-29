INSERT INTO `users`(
	userName,
	userId,
	password,
	role
)VALUES
	('かんりしゃ','admin','$2a$10$pdq4Je8Quso/fc49ENoajumO/4JNQlVxF/o0eHU6AMSaHC9PkJWge','ROLE_ADMIN'),
	('てすと','test','$2a$10$lJMwQdThMO8kjXIQuFMEneTdWGE.bcLAFXkq8z9EUvzvxETaLdmY.','ROLE_GENERAL')
;

INSERT INTO categories(name)VALUES
	('その他'),
	('生活'),
	('健康'),
	('交通'),
	('仕事'),
	('勉強'),
	('遊び')
;

INSERT INTO formulas(
	creatorId,
	updateDate,
	title,
	jsonData
)VALUES
	(2,'2023-02-14 14:02:55.79','test','[{"type":"number","x":411.5022449381077,"y":195.65609958382194,"tag":"NEW","number":5,"calcSource":null,"nextObj":[1],"prevObj":[]},{"type":"sign","x":489.1252918131077,"y":195.65609958382194,"typeText":"+","nextObj":[2],"prevObj":[0]},{"type":"number","x":604.1252918131077,"y":195.65609958382194,"tag":"NEW","number":5,"calcSource":null,"nextObj":[],"prevObj":[1]},{"type":"number","x":746.9709949381077,"y":195.65609958382194,"tag":"NEW ＋ NEW","number":"10","calcSource":1}]' FORMAT JSON),
	(2,'2023-02-15 13:08:35.748','交通費計算','[{"type":"number","x":82.37098660315606,"y":137.6825318700826,"tag":"定期代１","number":"27000","calcSource":null,"nextObj":[2],"prevObj":[]},{"type":"number","x":279.3450848507601,"y":137.68253187008256,"tag":"定期代２","number":"10000","calcSource":null,"nextObj":[],"prevObj":[2]},{"type":"sign","x":173.37098660315604,"y":137.68253187008264,"typeText":"+","nextObj":[1],"prevObj":[0]},{"type":"number","x":418.5496255179592,"y":137.6825318700826,"tag":"定期代合計","number":"37000","calcSource":2},{"type":"number","x":82.37098660315601,"y":48.381236962408124,"tag":"所持金","number":"60000","calcSource":null,"nextObj":[15],"prevObj":[]},{"type":"number","x":838.167896916185,"y":259.19085117068875,"tag":"1ヶ月の通勤日数","number":"22","calcSource":null,"nextObj":[],"prevObj":[13]},{"type":"number","x":83.8300539975827,"y":256.2629398622404,"tag":"片道代１","number":"900","calcSource":null,"nextObj":[7],"prevObj":[]},{"type":"sign","x":174.83005399758272,"y":256.2629398622404,"typeText":"+","nextObj":[8],"prevObj":[6]},{"type":"number","x":283.9937844198759,"y":257.72689551646454,"tag":"片道代２","number":"200","calcSource":null,"nextObj":[],"prevObj":[7]},{"type":"number","x":411.0350927813419,"y":257.72689551646454,"tag":"片道合計","number":"1100","calcSource":7},{"type":"sign","x":488.5673433514076,"y":257.72689551646454,"typeText":"*","nextObj":[11],"prevObj":[9]},{"type":"number","x":552.4999845464732,"y":257.7268955164644,"tag":"往復","number":2,"calcSource":null,"nextObj":[],"prevObj":[10]},{"type":"number","x":644.1436702685309,"y":259.1908511706888,"tag":"往復合計","number":"2200","calcSource":10},{"type":"sign","x":717.3497981401473,"y":257.7268955164646,"typeText":"*","nextObj":[5],"prevObj":[12]},{"type":"number","x":1028.4283507041648,"y":259.1908511706887,"tag":"定期無しの交通費","number":"48400","calcSource":13},{"type":"sign","x":218.07058660741373,"y":48.381236962408124,"typeText":"-","nextObj":[3],"prevObj":[4]},{"type":"number","x":568.2132335795851,"y":137.68253187008258,"tag":"定期代余り","number":"23000","calcSource":15},{"type":"sign","x":668.2132335795851,"y":137.68253187008258,"typeText":"/","nextObj":[12],"prevObj":[16]},{"type":"number","x":866.2623226122809,"y":134.75462056163434,"tag":"余りで何日分通勤できるか？","number":"10.45454545454545454545","calcSource":17}]' FORMAT JSON)
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
計算表作成ページ上部の操作ガイドボタンからいつでも操作方法を確認出来ます。','[{"type":"number","x":861.0356795851143,"y":139.18305190940646,"tag":"まず計算結果の計算に使っている符号オブジェクト選択して削除します","number":"4","calcSource":null,"nextObj":[],"prevObj":[11]},{"type":"number","x":96.3937702579524,"y":450.4735098220381,"tag":"ドットの入力で","number":"1.5","calcSource":null,"nextObj":[2,5],"prevObj":[]},{"type":"sign","x":217.90853385070287,"y":453.2282926354243,"typeText":"*","nextObj":[3],"prevObj":[1]},{"type":"number","x":383.7305216291507,"y":453.22829263542434,"tag":"小数点の計算も可能です","number":"2.5","calcSource":null,"nextObj":[],"prevObj":[2,13]},{"type":"number","x":627.8723158003294,"y":540.003951257087,"tag":"RESULT","number":"3.75","calcSource":2},{"type":"sign","x":224.7891768489985,"y":544.1361254771664,"typeText":"-","nextObj":[4],"prevObj":[1]},{"type":"number","x":945.9360484911397,"y":541.3813426637802,"tag":"一つの数値オブジェクトから複数の符号を伸ばせます","number":"-2.25","calcSource":5},{"type":"number","x":233.84414629511826,"y":49.65261047435753,"tag":"オブジェクトを選択してDELETEキーで削除できます","number":1,"calcSource":null,"nextObj":[9],"prevObj":[]},{"type":"number","x":833.3125930454466,"y":46.897827660971394,"tag":"全て削除したい時はページ上部の全消去ボタンを押してください","number":2,"calcSource":null,"nextObj":[],"prevObj":[9]},{"type":"sign","x":503.7374409620853,"y":49.65261047435753,"typeText":"+","nextObj":[8],"prevObj":[7]},{"type":"number","x":195.9163049401422,"y":143.3152261294856,"tag":"計算結果は直接数値変更や削除はできません","number":"3","calcSource":9},{"type":"sign","x":472.023976813371,"y":140.5604433160995,"typeText":"+","nextObj":[0],"prevObj":[10]},{"type":"number","x":861.8218832870014,"y":210.80740505744566,"tag":"すると通常の数値オブジェクトとなり、数値の変更や削除が可能になります","number":"7","calcSource":11},{"type":"sign","x":424.6697800956883,"y":588.2126504913441,"typeText":"/","nextObj":[3],"prevObj":[4]},{"type":"number","x":759.6858042468422,"y":454.6056840421174,"tag":"計算結果から後ろへ計算する事も可能です","number":"1.5","calcSource":13},{"type":"sign","x":985.6858042468422,"y":454.6056840421174,"typeText":"+","nextObj":[6],"prevObj":[14]},{"type":"number","x":298.9868256184441,"y":672.233526299621,"tag":"詳しい操作方法はページ上部の操作ガイドからいつでも見返せます","number":"-0.75","calcSource":15},{"type":"number","x":977.6932401433098,"y":671.3570066448608,"tag":"チュートリアル終了です！全消去して好きに計算してみましょう！！","number":"999","calcSource":null,"nextObj":[],"prevObj":[]},{"type":"number","x":305.9290856433708,"y":292.5743698042692,"tag":"符号オブジェクトを選択した状態で数字入力しても計算結果が出ます","number":"8","calcSource":null,"nextObj":[20],"prevObj":[]},{"type":"number","x":394.3748831705453,"y":365.57611435900134,"tag":"実は符号オブジェクトを追加した時点で、符号オブジェクトを選択した状態になっています","number":9,"calcSource":null,"nextObj":[],"prevObj":[]},{"type":"sign","x":639.9290856433709,"y":292.5743698042692,"typeText":"+","nextObj":[],"prevObj":[18]},{"type":"pointer","x":704.9290856433709,"y":292.5743698042692,"parent":20}]' FORMAT JSON),
	(7,2,'2023-02-14 14:16:21.457','test','test','[{"type":"number","x":411.5022449381077,"y":195.65609958382194,"tag":"NEW","number":5,"calcSource":null,"nextObj":[1],"prevObj":[]},{"type":"sign","x":489.1252918131077,"y":195.65609958382194,"typeText":"+","nextObj":[2],"prevObj":[0]},{"type":"number","x":604.1252918131077,"y":195.65609958382194,"tag":"NEW","number":5,"calcSource":null,"nextObj":[],"prevObj":[1]},{"type":"number","x":746.9709949381077,"y":195.65609958382194,"tag":"NEW ＋ NEW","number":"10","calcSource":1}]' FORMAT JSON)
;

INSERT INTO comments(
	postId,
	no,
	posterId,
	postDate,
	comment
)VALUES
	(3,1,2,'2023-02-14 14:16:21.457','コメントテスト
comment test')
;