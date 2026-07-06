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
    }
}
