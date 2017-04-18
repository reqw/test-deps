'use babel';

import TestDepsView from './test-deps-view';
import { CompositeDisposable } from 'atom';

export default {

  testDepsView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.testDepsView = new TestDepsView(state.testDepsViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.testDepsView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'test-deps:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.testDepsView.destroy();
  },

  serialize() {
    return {
      testDepsViewState: this.testDepsView.serialize()
    };
  },

  toggle() {
    console.log('TestDeps was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
