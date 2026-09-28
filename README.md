# Gemini Dictate

Voice dictation for GNOME Shell, powered by the Google Gemini API.

Click the microphone icon in the top panel, speak, press stop: the transcription lands in whatever window has focus. A small draggable overlay shows a live waveform while you record.

## How it works

- Audio is captured locally with PipeWire (`pw-record`, 16 kHz mono WAV).
- The recording is sent to the Gemini `generateContent` endpoint with a strict transcribe-verbatim prompt (temperature 0, instructions in the audio are transcribed, never executed).
- The result is copied to the clipboard and pasted into the focused window via a virtual Ctrl+Shift+V keystroke.
- If the request fails (network error, invalid key, quota or billing exhausted), the recording is not lost: it is saved to `~/.local/share/gemini-dictate/failed/` and the notification shows its path. From the right-click menu of the panel icon, *Retry failed recordings* re-sends every saved recording; the transcriptions are copied to the clipboard (not pasted) and each file is deleted once transcribed. The folder keeps at most 50 recordings and nothing older than 30 days.
- Every request is logged to `~/.local/share/gemini-dictate/usage.jsonl` (model, audio length, text/audio input tokens, output tokens including thinking, estimated cost in USD, errors). The right-click menu shows today's and this month's totals. Prices come from a built-in table (paid tier, Standard, per 1M tokens, [official pricing page](https://ai.google.dev/gemini-api/docs/pricing), checked 2026-09-28; a `-preview` model id is priced like its GA id) and can be overridden in the preferences. This is an estimate of this extension's own usage only: the billing page in AI Studio remains the source of truth for the whole project.

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
