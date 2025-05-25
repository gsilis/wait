import App from './App.tsx'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { DecisionProvider } from './contexts/decision-context.tsx'
import { DialogRegistryProvider } from './contexts/dialog-registry-context.tsx'
import { PrimaryButtonProvider } from './contexts/primary-button-context.tsx'
import { SecondaryButtonProvider } from './contexts/secondary-button-context.tsx'
import { DialogTitleProvider } from './contexts/dialog-title-context.tsx'
import { DialogBackgroundProvider } from './contexts/dialog-background-context.tsx'
import { DialogManagerProvider } from './contexts/dialog-manager-context.tsx'
import { DialogShadowProvider } from './contexts/dialog-shadow-context.tsx'
import { DialogTextProvider } from './contexts/dialog-text-context.tsx'
import { ApplicationBacktroundProvider } from './contexts/application-background-context.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DecisionProvider>
      <DialogRegistryProvider>
        <PrimaryButtonProvider>
          <SecondaryButtonProvider>
            <DialogTitleProvider>
              <DialogBackgroundProvider>
                <DialogShadowProvider>
                  <DialogTextProvider>
                    <ApplicationBacktroundProvider>
                      <DialogManagerProvider>
                        <App />
                      </DialogManagerProvider>
                    </ApplicationBacktroundProvider>
                  </DialogTextProvider>
                </DialogShadowProvider>
              </DialogBackgroundProvider>
            </DialogTitleProvider>
          </SecondaryButtonProvider>
        </PrimaryButtonProvider>
      </DialogRegistryProvider>
    </DecisionProvider>
  </StrictMode>,
)
