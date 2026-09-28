// SPDX-License-Identifier: GPL-2.0-or-later
// Gemini Dictate - preferences window
// Copyright (C) 2026 Cosimo Miccolis

import Adw from 'gi://Adw';
import Gio from 'gi://Gio';

import { ExtensionPreferences } from 'resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js';

export default class GeminiDictatePreferences extends ExtensionPreferences {
    fillPreferencesWindow(window) {
        const settings = this.getSettings();

        const page = new Adw.PreferencesPage();
        window.add(page);

        const apiGroup = new Adw.PreferencesGroup({
            title: 'Google Gemini API',
            description: 'Get a free API key at aistudio.google.com/apikey. Recorded audio is sent to the Gemini API for transcription.',
        });
        page.add(apiGroup);

        const keyRow = new Adw.PasswordEntryRow({ title: 'API key' });
        settings.bind('api-key', keyRow, 'text', Gio.SettingsBindFlags.DEFAULT);
        apiGroup.add(keyRow);

        const modelRow = new Adw.EntryRow({ title: 'Model' });
        settings.bind('model', modelRow, 'text', Gio.SettingsBindFlags.DEFAULT);
        apiGroup.add(modelRow);

        const promptGroup = new Adw.PreferencesGroup({
            title: 'Transcription prompt',
            description: 'Optional. Replaces the built-in transcription prompt; leave empty to use the default.',
        });
        page.add(promptGroup);

        const promptRow = new Adw.EntryRow({ title: 'Custom prompt' });
        settings.bind('custom-prompt', promptRow, 'text', Gio.SettingsBindFlags.DEFAULT);
        promptGroup.add(promptRow);

        const costGroup = new Adw.PreferencesGroup({
            title: 'Cost tracking',
            description: 'Every request is logged with its token counts and estimated cost to ~/.local/share/gemini-dictate/usage.jsonl. Optional: a JSON object that overrides the built-in prices (USD per 1M tokens), e.g. {"gemini-3.1-flash-lite": {"text": 0.25, "audio": 0.5, "output": 1.5}}.',
        });
        page.add(costGroup);

        const pricesRow = new Adw.EntryRow({ title: 'Price overrides (JSON)' });
        settings.bind('price-overrides', pricesRow, 'text', Gio.SettingsBindFlags.DEFAULT);
        costGroup.add(pricesRow);
    }
}
