package com.presciense.poltergeist;

import java.util.*;
import java.util.concurrent.CopyOnWriteArraySet;

public abstract class PoltergeistThread extends Thread {
    private final Set<PoltergeistThreadListener> listeners = new CopyOnWriteArraySet<PoltergeistThreadListener>();

    public final void addListener(final PoltergeistThreadListener listener) {
        listeners.add(listener);
    }

    public final void removeListener(final PoltergeistThreadListener listener) {
        listeners.remove(listener);
    }

    private final void notifyListeners() {
        for (PoltergeistThreadListener listener : listeners) {
            listener.onThreadExit(this);
        }
    }

    @Override
    public final void run() {
        try {
            doRun();
        } finally {
            notifyListeners();
        }
    }

    public abstract void doRun();
}
