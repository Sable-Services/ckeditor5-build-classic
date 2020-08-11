import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
// import plainTextToHtml from '@ckeditor/ckeditor5-clipboard/src/utils/plaintexttohtml';

export default class WlmApplyStyles extends Plugin {
	static get pluginName() {
		return 'WlmApplyStyles';
	}

	init() {
		const editor = this.editor;

		editor.model.document.on( 'change:data', () => {
			if ( editor.model.document.selection.focus.parent.isEmpty ) {
				const wlmConfig = editor.config.get( 'wlm' );

				if ( !wlmConfig || !wlmConfig.settings ) {
					return;
				}

				const {
					color,
					backgroundColor,
					fontFamily,
					fontSize
				} = wlmConfig.settings;

				editor.execute( 'fontFamily', { value: fontFamily } );
				editor.execute( 'fontColor', { value: color } );
				editor.execute( 'fontBackgroundColor', { value: backgroundColor } );
				editor.execute( 'fontSize', { value: fontSize } );
			}
		} );

		const editingView = editor.editing.view;

		editingView.document.on( 'drop', e => {
			e.stop();
		} );

		// const clipboardPlugin = editor.plugins.get( 'Clipboard' );

		// editingView.document.on( 'clipboardInput', (evt, data) => {
		editingView.document.on( 'clipboardInput', evt => {
			if ( editor.isReadOnly ) {
				return;
			}

			// const dataTransfer = data.dataTransfer;
			// let content = plainTextToHtml( dataTransfer.getData( 'text/plain' ) );

			// content = clipboardPlugin._htmlDataProcessor.toView( content );

			// clipboardPlugin.fire( 'inputTransformation', { content, dataTransfer } );
			// editingView.scrollToTheSelection();

			evt.stop();
		} );
	}
}
