import $ from 'jquery';

export default function Px2Utils(){

	/**
	 * カレントページ情報一式を取得する
	 * @param {*} path 
	 * @returns 
	 */
	this.getCurrentPageInfo= function( callback ){
		let tmpPageInfo;
		$.ajax({
			"url": "?PX=admin.api.get_page_info",
			"method": "post",
			"data": {
				'ADMIN_USER_CSRF_TOKEN': window.csrf_token,
			},
			"error": function(error){
				// console.error('------ admin.api.get_page_info Response Error:', typeof(error), error);
				tmpPageInfo = error;
			},
			"success": function(data){
				// console.log('------ admin.api.get_page_info Response:', typeof(data), data);
				tmpPageInfo = data;
			},
			"complete": function(){
				callback(tmpPageInfo);
			},
		});
	}

	/**
	 * リンク先パスを補完する
	 * @param {*} path controot を含まないパス 
	 * @returns 
	 */
	this.href = function( path ){
		if( typeof(path) !== typeof('') ){
			return path;
		}

		// TODO: GETパラメータを受け付けられるようにする

		// TODO: パスパラメータ {$xxx}, {*xxx} を補完する

		// デフォルトファイル名を補完する
		if( path.match(/\/$/) ){
			path += 'index.html';
		}

		// TODO: controot を補完する

		return path;
	}

	/**
	 * 先頭から controot を削除する
	 * @param {*} path 
	 * @returns 
	 */
	this.trimContRoot = function( path ){
		// TODO: 実装する
		return path;
	}

}