#!/bin/bash
# prep.sh fichier.xlsx feuille cellule largeur [hauteur] [ligne_haut] [zoom]
osascript - "$1" "$2" "$3" "$4" "${5:-520}" "${6:-1}" "${7:-150}" <<'AS'
on run argv
  set f to item 1 of argv
  tell application "Microsoft Excel"
    activate
    close every workbook saving no
    open (POSIX file f)
    delay 2
    set bounds of window 1 to {0, 38, (item 4 of argv) as integer, 38 + ((item 5 of argv) as integer)}
    activate object worksheet (item 2 of argv) of active workbook
    set zoom of active window to ((item 7 of argv) as integer)
    set scroll row of active window to ((item 6 of argv) as integer)
    set scroll column of active window to 1
    select range (item 3 of argv) of active sheet
    delay 1
    select range (item 3 of argv) of active sheet
    delay 2
  end tell
end run
AS
