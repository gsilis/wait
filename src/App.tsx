import { use, useEffect, useMemo, useRef } from 'react';
import { DialogRenderer } from './components/dialog-renderer';
import { DialogRegistryContext } from './contexts/dialog-registry-context';
import { SequenceFactory } from './core/sequence-factory';
import createSequences from './core/sequence-setup';
import { DialogManagerContext } from './contexts/dialog-manager-context';
import { StoryId } from './stories/start';
import { ComponentFactory } from './core/component-factory';
import { SideEffectHandlerFactory } from './core/side-effect-handler-factory';
import { ApplicationBackgroundContext } from './contexts/application-background-context';
import './App.css';

function App() {
  const initialized = useRef<boolean>(null);
  const dialogRegistry = use(DialogRegistryContext);
  const dialogManager = use(DialogManagerContext);
  const applicationBacktround = use(ApplicationBackgroundContext);

  const componentFactory = useMemo<ComponentFactory>(() => new ComponentFactory(), []);
  const sideEffectHandlerFactory = useMemo<SideEffectHandlerFactory>(() => {
    return new SideEffectHandlerFactory();
  }, []);
  const sequenceFactory = useMemo<SequenceFactory>(() => new SequenceFactory(componentFactory, sideEffectHandlerFactory), [componentFactory]);

  useEffect(() => {
    if (initialized.current) {
      return;
    }

    initialized.current = true;
    createSequences(sequenceFactory, sideEffectHandlerFactory, componentFactory, dialogRegistry.addDialog);

    dialogManager.addDialog(dialogRegistry.getDialog(StoryId));
    // dialogManager.addDialog(dialogRegistry.getDialog('color-survey-9'));
  }, [
    dialogRegistry.addDialog,
    dialogRegistry.getDialog,
    dialogManager.addDialog,
  ]);

  return (
    <div className={ applicationBacktround.applicationBackgroundClasses }>
      <DialogRenderer></DialogRenderer>
    </div>
  )
}

export default App
