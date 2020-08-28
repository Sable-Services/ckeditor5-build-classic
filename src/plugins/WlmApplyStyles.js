import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import plainTextToHtml from '@ckeditor/ckeditor5-clipboard/src/utils/plaintexttohtml';

export default class WlmApplyStyles extends Plugin {
	static get pluginName() {
		return 'WlmApplyStyles';
	}

	init() {
		const editor = this.editor;
		const editingView = editor.editing.view;
		const clipboardPlugin = editor.plugins.get( 'Clipboard' );

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

		editor.model.document.on( 'change:data', () => {
			if ( editor.model.document.selection.focus.parent.isEmpty ) {
				editor.execute( 'fontFamily', { value: fontFamily } );
				editor.execute( 'fontColor', { value: color } );
				editor.execute( 'fontBackgroundColor', { value: backgroundColor } );
				editor.execute( 'fontSize', { value: fontSize } );
			}
		} );

		editingView.document.on( 'drop', e => {
			e.stop();
		} );

		editingView.document.on( 'clipboardInput', ( evt, data ) => {
			if ( editor.isReadOnly ) {
				return;
			}

			const dataTransfer = data.dataTransfer;
			const content = plainTextToHtml( dataTransfer.getData( 'text/plain' ) );

			const span = document.createElement( 'span' );

			span.style.color = color;
			span.style.backgroundColor = backgroundColor;
			span.style.fontFamily = fontFamily;
			span.style.fontSize = fontSize;
			span.innerHTML = content;

			const view = clipboardPlugin._htmlDataProcessor.toView( span.outerHTML );

			clipboardPlugin.fire( 'inputTransformation', { content: view, dataTransfer } );
			editingView.scrollToTheSelection();

			evt.stop();
		} );
	}
}
