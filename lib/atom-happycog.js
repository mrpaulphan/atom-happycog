'use babel';

import AtomHappycogView from './atom-happycog-view';
import { CompositeDisposable } from 'atom';

export default {

  atomHappycogView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.atomHappycogView = new AtomHappycogView(state.atomHappycogViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atomHappycogView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-happycog:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atomHappycogView.destroy();
  },

  serialize() {
    return {
      atomHappycogViewState: this.atomHappycogView.serialize()
    };
  },

  toggle() {
    console.log('AtomHappycog was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
