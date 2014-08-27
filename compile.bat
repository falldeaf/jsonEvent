set PATH=%PATH%;C:\project\localapps\7za
del app.nw
7za a -r -tzip app.nw *
start app.nw