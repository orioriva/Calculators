'use strict'

/** 投稿削除が終わったら */
function deletePostAfter(){
	window.location.href = '/bbs';
}

let setPostData;
let setCommentList;

const vmForm = Vue.createApp({
	data(){
		return{
			postData: null,
			comments: [],
			newComment: ''
		}
	},
	methods: {
		setPostData(data){
			this.postData = data;
		},
		setComments(data) {
			this.comments = [];
			data.forEach(element => this.comments.push(element));
		},
		formatDate: function(date){
			return dateToTextDef(new Date(date));
		},
		sendComment(){
			ajaxAddComment(this.postData.id, this.newComment);
		}
	},
	mounted(){
		setPostData = this.setPostData;
		setCommentList = this.setComments;
	}
}).mount('#post-body')

ajaxGetPost();
ajaxGetCommentList();