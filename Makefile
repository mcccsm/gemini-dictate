UUID = gemini-dictate@cosimomiccol.is
ZIP = $(UUID).shell-extension.zip

.PHONY: pack install uninstall clean

pack:
	gnome-extensions pack --force .

install: pack
	gnome-extensions install --force $(ZIP)
	@echo "Now log out and back in, then run: gnome-extensions enable $(UUID)"

uninstall:
	gnome-extensions uninstall $(UUID)

clean:
	rm -f $(ZIP) schemas/gschemas.compiled
