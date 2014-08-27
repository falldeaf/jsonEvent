#!/bin/bash
rm app.nw
zip -r app.nw *
/home/falldeaf/project/localapps/node-webkit-v0.10.1-linux-ia32/./nw app.nw
