import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

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
	}
}
