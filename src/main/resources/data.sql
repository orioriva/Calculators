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