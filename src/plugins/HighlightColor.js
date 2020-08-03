import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import pencilIcon from '@ckeditor/ckeditor5-core/theme/icons/pencil.svg';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';

export default class HighlightColor extends Plugin {
	init() {
		const editor = this.editor;

		editor.ui.componentFactory.add( 'highlightColor', locale => {
			const view = new ButtonView( locale );

			view.set( {
				label: 'Highlight',
				icon: pencilIcon,
				tooltip: true
			} );

			view.on( 'execute', () => {
				const config = editor.config.get( 'wlm' );

				if ( !config.settings || !config.settings.highlightColor ) {
					return;
				}

				const current = editor.model.document.selection.getAttribute( 'fontColor' );
				let highlightColor = config.settings.highlightColor;

				const textColor = editor.config.get( 'wlm' ).settings.color;

				if ( current === highlightColor ) {
					highlightColor = textColor;
				}

				editor.execute( 'fontColor', { value: highlightColor } );
			} );

			return view;
		} );
	}
}
