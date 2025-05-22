import { Component, use, useEffect, useMemo, useRef } from 'react';
import './App.css';
import { DialogRenderer } from './components/dialog-renderer';
import { DialogRegistryContext } from './contexts/dialog-registry-context';
import { SequenceFactory } from './core/sequence-factory';
import createSequences from './core/sequence-setup';
import { DialogManagerContext } from './contexts/dialog-manager-context';
import { StoryId } from './stories/start';
import { ComponentFactory } from './core/component-factory';

function App() {
  const initialized = useRef<boolean>(null);
  const dialogRegistry = use(DialogRegistryContext);
  const dialogManager = use(DialogManagerContext);
  
  const componentFactory = useMemo<ComponentFactory>(() => new ComponentFactory(), []);
  const sequenceFactory = useMemo<SequenceFactory>(() => new SequenceFactory(componentFactory), [componentFactory]);

  useEffect(() => {
    if (initialized.current) {
      return;
    }

    initialized.current = true;
    createSequences(sequenceFactory, dialogRegistry.addDialog);

    dialogManager.addDialog(dialogRegistry.getDialog(StoryId));
  }, [
    dialogRegistry.addDialog,
    dialogRegistry.getDialog,
    dialogManager.addDialog,
  ]);

  return (
    <>
      <DialogRenderer></DialogRenderer>
    </>
  )
}

export default App
