import $ from 'jquery';
import React, { useContext, useState, useEffect } from "react";
import {MainContext} from '../context/MainContext';
import Link from '../components/Link';

export default function UpdateGuiContents(props){

	const main = useContext(MainContext);
	const [guiEditorContentsList, setGuiEditorContentsList] = useState(null);

	/**
	 * 未アサインコンテンツの検索結果を取得する
	 */
	function getGuiEditorContentList(callback){
		callback = callback || function(){};
		px2style.loading();
		main.px2utils.px2cmd(
			"?PX=px2dthelper.get.list_gui_editor_contents",
			{},
			{},
			function(data, error){
				if( error ){
					px2style.modal({
						'title': 'エラー',
						'body': '<p>エラーが発生しました。</p>',
					});
				}else{
					px2style.modal({
						'title': '完了',
						'body': '<p>リストの抽出が完了しました。</p>',
					});
				}

				px2style.closeLoading();

				setGuiEditorContentsList(data.gui_editor_contents);

				callback();
			}
		);
	}

	/**
	 * 未アサインコンテンツを削除する
	 */
	function deleteContent( target_path ){
		if(!confirm('このコンテンツ '+target_path+' を削除しますか？')){
			return;
		}

		main.px2utils.px2cmd(
			target_path + '?PX=px2dthelper.content.delete',
			{},
			function( res ){
				if( !res.result ){
					alert( 'Error: ' + res.message );
					console.error('Error:', res);
					return;
				}
				getGuiEditorContentList();
			}
		);
	}

	return (
		<>
			<div className="px2-p">
				<button className="px2-btn px2-btn--primary" onClick={(e)=>{
					$(e.target).attr({'disabled':'disabled'});
					getGuiEditorContentList(function(){
						$(e.target).removeAttr('disabled');
					});
				}}>GUI編集コンテンツを検索する</button>
			</div>
			{(guiEditorContentsList!==null
				?
				<>
					{(guiEditorContentsList.length
						?
						<>
							<table className="px2-table" style={{widht:"100%"}}>
								<tbody>
								{(guiEditorContentsList.map((unassignedContent, idx)=>{
									return (
										<tr key={idx}>
											<th>{unassignedContent}</th>
											<td><button type="button" data-target-content={unassignedContent} onClick={(e)=>{
												var target_path = $(e.target).attr('data-target-content');
												target_path = target_path.replace(/(\.html?)(\.[a-zA-Z0-9]+)?$/, '$1');
												deleteContent(target_path);
											}} className="px2-btn px2-btn--danger">remove</button></td>
										</tr>
									);
								}))}
								</tbody>
							</table>
						</>
						:
						<>
							<p>GUI編集コンテンツは検出されませんでした。</p>
						</>
					)}
				</>
				:
				<></>
			)}
		</>
	);
}
