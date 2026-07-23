# Gemini Dictate

Voice dictation for GNOME Shell, powered by the Google Gemini API.

Click the microphone icon in the top panel, speak, press stop: the transcription lands in whatever window has focus. A small draggable overlay shows a live waveform while you record.

## How it works

- Audio is captured locally with PipeWire (`pw-record`, 16 kHz mono WAV).
- The recording is sent to the Gemini `generateContent` endpoint with a strict transcribe-verbatim prompt (temperature 0, instructions in the audio are transcribed, never executed).
- The result is copied to the clipboard and pasted into the focused window via a virtual Ctrl+Shift+V keystroke.

## Requirements

- GNOME Shell 45–50 (developed and tested on 50 / Fedora 44, Wayland)
- PipeWire with `pw-record` and `pw-cat` (the `pipewire-utils` package on Fedora; `pw-cat` is optional, it only feeds the live waveform)
- A Google Gemini API key ([aistudio.google.com/apikey](https://aistudio.google.com/apikey)) — the free tier is more than enough for dictation

## Install

From a clone of this repo:

```bash
make install
```

Then log out and back in (Wayland cannot hot-reload extensions) and enable it:

```bash
gnome-extensions enable gemini-dictate@cosimomiccol.is
```

Finally open the extension preferences (Extensions app → Gemini Dictate → Settings) and paste your Gemini API key.

## Configuration

All settings live in the preferences window:

| Setting | Default | Notes |
|---|---|---|
| API key | empty | Required. Stored in dconf, never written to disk in plain files. |
| Model | `gemini-3.1-flash-lite-preview` | Any Gemini model id that accepts audio input. |
| Custom prompt | empty | Replaces the built-in transcription prompt. Leave empty for the default (verbatim transcription, language kept as spoken). |

## Privacy

Recorded audio is sent to Google's Gemini API for transcription — nothing else leaves your machine. The temporary WAV file is written to `$XDG_RUNTIME_DIR` (user-private) and deleted as soon as it has been read. No transcriptions or logs are stored.

## Development

Symlink the repo into the extensions directory so edits are picked up at next login:

```bash
glib-compile-schemas schemas/
ln -s "$PWD" ~/.local/share/gnome-shell/extensions/gemini-dictate@cosimomiccol.is
```

Logs:

```bash
journalctl --user -f -o cat /usr/bin/gnome-shell | grep -i gemini
```

## License

GPL-2.0-or-later. See [LICENSE](LICENSE).
