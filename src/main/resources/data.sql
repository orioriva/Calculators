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

INSERT INTO bbsformulas(
	category,
	creatorId,
	updateDate,
	title,
	comment,
	jsonData,
	view
)VALUES
	(7,2,'2023-02-13 13:02:48.918','test','test','[{"type":"number","x":363.25616798326655,"y":166.1890308504942,"tag":"NEW","number":5,"calcSource":null,"nextObj":[1],"prevObj":[]},{"type":"sign","x":440.87921485826655,"y":166.1890308504942,"typeText":"+","nextObj":[2],"prevObj":[0]},{"type":"number","x":555.8792148582666,"y":166.1890308504942,"tag":"NEW","number":5,"calcSource":null,"nextObj":[],"prevObj":[1]},{"type":"number","x":698.7249179832666,"y":166.1890308504942,"tag":"NEW ＋ NEW","number":"10","calcSource":1}]' FORMAT JSON,true)
;