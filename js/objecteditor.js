///////////MENU ITEMS/////////////////////

var gui = require('nw.gui');
var menu = new gui.Menu({
	type: 'menubar'
});

//////////file////////

menu.append(new gui.MenuItem({
	label: 'File',
	submenu: new gui.Menu()
}));

menu.items[0].submenu.append(new gui.MenuItem({
	label: 'Open                                     Ctrl+O',
	click: openfile,
	key: "o",
	modifiers: "ctrl"
}));

menu.items[0].submenu.append(new gui.MenuItem({
	label: 'Save                                      Ctrl+S',
	click: savefile,
	key: "s",
	modifiers: "ctrl"
}));

menu.items[0].submenu.append(new gui.MenuItem({
	label: 'Open file in Explorer           Ctrl+E',
	click: function() {
		if(getDocumentIndex() !== -1) {
			gui.Shell.showItemInFolder(window.primary_data_object.documents[getDocumentIndex()].filepath);
		}
	},
	key: "e",
	modifiers: "ctrl"
}));

menu.items[0].submenu.append(new gui.MenuItem({
	label: 'Open file in Tiled                Ctrl+T',
	click: function() {
		if(getDocumentIndex() !== -1) {
			gui.Shell.openItem(window.primary_data_object.documents[getDocumentIndex()].filepath);
		}
	},
	key: "t",
	modifiers: "ctrl"
}));

menu.items[0].submenu.append(new gui.MenuItem({
	type: 'separator'
}));

menu.items[0].submenu.append(new gui.MenuItem({
	label: 'Exit',
	click: function () {
		gui.Window.get().close();
	}
}));

//////////edit////////

menu.append(new gui.MenuItem({
	label: 'Edit',
	submenu: new gui.Menu()
}));

menu.items[1].submenu.append(new gui.MenuItem({
	label: 'Copy Object to Clipboard        Ctrl+Alt+C',
	click: function() {
		var clipboard = gui.Clipboard.get();
		clipboard.set(JSON.stringify(window.editor.getValue()));
	},
	key: "c",
	modifiers: "ctrl+alt"
}));

menu.items[1].submenu.append(new gui.MenuItem({
	label: 'Paste JSON object                      Ctrl+Alt+V',
	click: function() {
		var clipboard = gui.Clipboard.get();
		var text = clipboard.get('text');
		
		var response=jQuery.parseJSON(text);
		if(typeof response =='object')
		{
		  window.editor.setValue(response);
		}
	},
	key: "v",
	modifiers: "ctrl+alt"
}));

//////////tabs////////

menu.append(new gui.MenuItem({
	label: 'Tabs',
	submenu: new gui.Menu()
}));

menu.items[2].submenu.append(new gui.MenuItem({
	label: 'next tab        Ctrl+PgDwn',
	click: nexttab,
	key: "pagedown",
	modifiers: "ctrl"
}));

menu.items[2].submenu.append(new gui.MenuItem({
	label: 'prev tab        Ctrl+PgUp',
	click: prevtab,
	key: "pageup",
	modifiers: "ctrl"
}));

menu.items[2].submenu.append(new gui.MenuItem({
	type: 'separator'
}));

menu.items[2].submenu.append(new gui.MenuItem({
	label: 'close tab          Ctrl+W',
	click: closetab,
	key: "w",
	modifiers: "ctrl"
}));

//////////help////////

menu.append(new gui.MenuItem({
	label: 'Help',
	submenu: new gui.Menu()
}));

menu.items[3].submenu.append(new gui.MenuItem({
	label: 'About',
	click: function () {
		alert("falldeaf's object editor\n Version: " + gui.App.manifest.version + "\n Node-Webkit Version: " + process.versions['node-webkit']);
		console.log(gui.App.manifest);
	}
}));

menu.items[3].submenu.append(new gui.MenuItem({
	label: 'docs',
	click: function() {
		gui.Shell.openExternal('http://falldeaf.com');
	}
}));

menu.items[3].submenu.append(new gui.MenuItem({
	type: 'separator'
}));

menu.items[3].submenu.append(new gui.MenuItem({
	label: 'debug        Ctrl+h',
	click: function() {
		var win = gui.Window.get();
      	win.showDevTools();
	},
	key: "h",
	modifiers: "ctrl"
}));

gui.Window.get().menu = menu;

//////////Primary objects holder///////////////
var primary_data_object = {
	"documents": [],
	"currentdocumentindex": 0
};

$('body').on('click', 'a', function(e){
    e.preventDefault();
});

function handleFileSelect(evt) {

	var files = evt.target.files; // FileList object

	// Loop through the FileList and render image files as thumbnails.
	var totalfiles = files
	for (var i = 0, f; f = files[i]; i++) {

		var reader = new FileReader();

		// Closure to capture the file information.
		reader.onload = (function (theFile) {
			var currentfilename = f.name;
			var currentfilepath = f.path;
			//var islast = (i == (files.length - 1)) ? f.name : "";
			//alert(f.name);
			return function (e) {

				var curdoc = adddocument(e.target.result, currentfilename, currentfilepath);
				//console.log(e);
				addtab(currentfilename, curdoc);
			}
		})(f);

		// Read in the image file as a data URL.
		reader.readAsText(f, "UTF-8");
	}
	$('#files').val('');
	
	window.totaltabs = $('#filetabs').length + files.length;
}

function addtab(name, did) {
	$('#filetabs li').removeClass('active');
	$('#filetabs').append('<li did="' + did + '" class="active"><a href="#"><span class="asterisk"> * </span><span class="tabname">' + name + '</span> <span class="closetab glyphicon glyphicon-remove"></span> </a></li>');
}

function switchtab(did) {
	console.log(did);
	if (getDocumentIndex() != did) {
		window.primary_data_object.currentdocumentindex = did;
		$('#objects').html('');

		//rebuild object menu
		addobjects(window.primary_data_object.documents[getDocumentIndex()], false);
		openobject();
	}
}

function openobject() {

	if (getObject(true)) {
		//console.log(JSON.parse(getObject(true)));
		if (window.editor) {
			window.editor.destroy();
		}
		window.first_open = true;
		window.olddoc = -1;
		window.oldobj = -1;
		starteditor();
		window.editor.setValue(JSON.parse(htmlUnescape(getObject(true))));
	} else {
		window.editor.setValue({});
	}

}

function addobjects(object, create) {
	//objecttype = 'script';
	//uid = 'eventname';
	var object_number = 0;
	window.schemacounter = 0;
	window.cobcounter = -1;

	if (window.settings && window.settings.objects) {
		window.settings.objects.forEach(function (element, index, array) {
			objecttype = element.property;
			uid = element.uid;

			$(object.modifiedxml).find("property[name='" + objecttype + "']").parent().parent().each(function () {
				if (create) {
					console.log(this);
					var currentobjectindex = object.objects.push(this) - 1;
					var activeph = "";
				} else {
					currentobjectindex = ++cobcounter;
					var activeph = (getObjectIndex() == currentobjectindex) ? " active" : "";
				}

				var currentdocumentindex = getDocumentIndex();
				var objectname = $(this).attr('name');
				var propertyname = $(this).find("property[name='" + uid + "']").attr('value');
				$('#objects').append("<a href='#' sid='" + window.schemacounter + "' did='" + currentdocumentindex + "' oid='" + currentobjectindex + "' class='list-group-item objectbutton" + activeph + "'><h4 class='list-group-item-heading'>" + propertyname + "</h4><p class='list-group-item-text'>" + objectname + "</p>");
			object_number++;
			});
			window.schemacounter++;
		});
	}
	if(object_number <= 0) {
		blankout();
	}
}

function adddocument(xml, fname, fpath, last) {
	// do something with xml
	var temp = {};
	temp.modifiedxml = $(xml);
	temp.filename = fname;
	temp.filepath = fpath;
	temp.currentobjectindex = 0;
	temp.currentschemaindex = 0;
	temp.objects = [];
	var currentdocumentindex = window.primary_data_object.documents.push(temp) - 1;
	window.primary_data_object.currentdocumentindex = currentdocumentindex;

	//CREATE OBJECT MENU (first, blank out the object menu)
	$('#objects').html('');
	//alert(last + ": creating tabs for " + fname);
	addobjects(temp, true);
	
	if(last) {
		//Open the first oject automatically
		//alert('open the first tab!');
		//$('.objectbutton').first().trigger('click');
	}

	blankout(true);
	return currentdocumentindex;
}

function starteditor() {
	//empty the editor div
	$('#editor_holder').html("");

	//start the editor
	window.editor = new JSONEditor(document.getElementById('editor_holder'), {
		"schema": JSON.parse(window.settings.objects[getSchemaIndex()].schema),
		"iconlib": "bootstrap3",
		"theme": "bootstrap3"
	});

	//Editor change action (Update the current data object)
	window.editor.on('change', function () {
		if (window.olddoc == getDocumentIndex() &&
			window.oldobj == getObjectIndex()) {

			//console.log("POSITIVE od:" + window.olddoc + " ob:" + window.oldobj);
			var editorvalue = window.editor.getValue();
			$(getObject()).find("property[name='" + window.settings.objects[getSchemaIndex()].property + "']").attr('value', JSON.stringify(editorvalue));

			//show 'changed file' indicator
			$('li[did="' + getDocumentIndex() + '"] span.asterisk').css('visibility', 'visible');
		} else {
			//console.log("NEGATIVE od:" + window.olddoc + " ob:" + window.oldobj);
		}

		if (!window.first_open) {
			window.olddoc = getDocumentIndex();
			window.oldobj = getObjectIndex();

		} else {
			window.first_open = false;
		}
	});
}

$(function () {
	/////////////////////INIT//////////////////////////////////
	JSONEditor.plugins.ace.theme = 'clouds_midnight';
	window.editorstarted = false;
	window.first_open = true;

	document.getElementById('files').addEventListener('change', handleFileSelect, false);

	if (localStorage.getItem('schema')) {
		window.settings = JSON.parse(localStorage.getItem('schema'));
	}

	/////////////////////OBJECT BUTTONS///////////////////

	//Set click event for objects
	$('#objects').on('click', 'a', function () {
		$('.objectbutton').removeClass('active');
		$(this).addClass('active');

		window.primary_data_object.documents[$(this).attr('did')].currentobjectindex = $(this).attr('oid');
		window.primary_data_object.documents[$(this).attr('did')].currentschemaindex = $(this).attr('sid');
		//console.log(window.primary_data_object.documents[$(this).attr('did')].currentschemaindex);
		//editor.setValue(JSON.parse(htmlUnescape($(this).attr('json'))));

		/*
		if (getObject(true)) {
            //console.log(JSON.parse(getObject(true)));
			if(window.editor) {
				window.editor.destroy();
			}
			window.first_open = true;
			window.olddoc = -1;
			window.oldobj = -1;
			starteditor();
			window.editor.setValue(JSON.parse(htmlUnescape(getObject(true))));
        } else {
			window.editor.setValue({});
		}*/
		openobject();
	});

	/////////////////////TABS///////////////////

	//Switch File tab action
	$('#filetabs').on('click', 'li', function () {
		//console.log(this);
		//console.log("Switch tabs!");
		$('#filetabs li').removeClass('active');
		$(this).addClass('active');
		switchtab($(this).attr('did'));
		//switchtab(getDocumentIndex());
	});

	//Close File tab action
	$('#filetabs').on('click', 'li span.closetab', function (e) {
		e.stopPropagation();
		//console.log(this);
		console.log("Close the damn file!");

		if ($(this).parent().parent().attr('did') == getDocumentIndex()) {
			console.log("Same tab!" + $(this).parent().parent().attr('did') + ":" + getDocumentIndex());
			$(this).parent().parent().remove();

			if ($('#filetabs li').length >= 1) {
				console.log("number of tabs" + $('#filetabs li').length);
				$('#filetabs li').first().trigger('click');
			} else {
				console.log("none left!");
				//Emtpy, put graphic up and remove sidebar
				blankout();
			}
		} else {
			console.log("not the same, just delete!" + $(this).parent().parent().attr('did') + ":" + getDocumentIndex());
			$(this).parent().parent().remove();
		}

		//kind of hacky... deletes the object array where most of the memory is being taken up but doesn't delete the 'file' object, so that order is preserved.
		window.primary_data_object.documents[$(this).parent().parent().attr('did')] == undefined;

	});

	$('#filetabs').sortable({
		"axis": "x"
	});

	/////////////////////ACTIONS///////////////////

	//Hotkey
	//$(document).bind('keydown', 'ctrl+o', openfile);
	//Nav button
	$('#openaction').click(openfile);

	//Hotkey
	//$(document).bind('keydown', 'ctrl+s', savefile);
	//Nav button
	$('#saveaction').click(savefile);

	//Hotkey
	//$(document).bind('keydown', 'ctrl+u', savefile);
	//Nav button
	$('#setupaction').click(modalstart);

	//////////////////////MODAL/////////////////////////

	$('#savesettings').click(function () {
		console.log("Save Schema");
		localStorage.setItem('schema', JSON.stringify(schemaeditor.getValue()));
		window.settings = schemaeditor.getValue();
	});

	/*
    $.ajax({
        url: 'map.tmx',
        type: 'GET',
        dataType: 'xml',
        timeout: 1000,
        error: function () {
            console.log('Error loading XML document');
        },
        success: adddocument
    });
    */

	$('.themebuttons').click(function () {
		localStorage.setItem('theme', $(this).attr('id'));
		$(".themes").attr('disabled', true);
		$("#" + localStorage.getItem('theme') + "theme").attr('disabled', false);
	});

	//////////////////////THEMES/////////////////////////
	if (localStorage.getItem('theme')) {
		$(".themes").attr('disabled', true);
		$("#" + localStorage.getItem('theme') + "theme").attr('disabled', false);
	} else {
		$(".themes").attr('disabled', true);
		$("#defaulttheme").attr('disabled', false);
	}

});

function modalstart() {
	console.log("Setup");
	$('#schemaedit').html('');
	$('#myModal').modal();

	window.schemaeditor = new JSONEditor(document.getElementById('schemaedit'), {
		"schema": {
			"title": "Object Editor List",
			"type": "object",
			"id": "person",
			"properties": {
				"objects": {
					"type": "array",
					"format": "grid",
					"title": "Objects",
					"uniqueItems": false,
					"items": {
						"type": "object",
						"title": "object",
						"properties": {
							"property": {
								"type": "string",
								"description": "Name of property that holds the JSON"
							},
							"uid": {
								"type": "string",
								"description": "Name of property that holds unique ID (Name) for the object"
							},
							"schema": {
								"type": "string",
								"format": "json",
								"description": "JSON Schema"
							}
						}
					}
				}
			}
		},
		"iconlib": "bootstrap3",
		"theme": "bootstrap3",
		"disable_array_reorder": "true",
		"disable_collapse": "true",
		"disable_edit_json": "true",
		"disable_properties": "true"

	});

	if (localStorage.getItem('schema')) {
		schemaeditor.setValue(JSON.parse(localStorage.getItem('schema')));
	}
}

function savefile() {
	console.log("save file");
	var fs = require('fs');
	var xmldata = window.primary_data_object.documents[getDocumentIndex()].modifiedxml[2];
	
	//if(xmldata == undefined) {
	//	xmldata = window.primary_data_object.documents[getDocumentIndex()].modifiedxml;
	//}

	console.log(xmldata);
	//console.log(xmldata);
	
	var xmlText = '<?xml version="1.0" encoding="UTF-8"?>\n' + new XMLSerializer().serializeToString(xmldata);
    //fix erroneously repaired image tags
    xmlText = xmlText.replace(/<img /g, "<image ");
    
	fs.writeFile(primary_data_object.documents[getDocumentIndex()].filepath, xmlText,
	function (err) {
		if (err) {
			console.log(err);
			alert("error" + err.message);
		} else {
			$('li[did="' + getDocumentIndex() + '"] span.asterisk').css('visibility', 'hidden');	
		}
	});


}

function openfile() {
	console.log("open file");
	$('#files').trigger('click');
}

function nexttab() {
	if ($('#filetabs li.active').next().trigger('click').length <= 0) {
		$('#filetabs li').first().trigger('click');
	}
}

function prevtab() {
	//$('#filetabs li.active').prev().trigger('click');
	if ($('#filetabs li.active').prev().trigger('click').length <= 0) {
		$('#filetabs li').last().trigger('click');
	}
}

function closetab() {
	$('#filetabs li.active a span.closetab').trigger('click');
}

function blankout(justeditor) {
	if(!justeditor) {
		$('#objects').html('');
	}
	$('#editor_holder').html('<div id="placeholder"></div>');
		
}

function htmlEscape(str) {
	return String(str)
		.replace(/&/g, '&amp;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;');
}

function htmlUnescape(str) {
	return String(str)
		.replace(/&amp;/g, '&')
		.replace(/&quot;/g, '"')
		.replace(/&#39;/g, "'")
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>');
}

function getObject(pvalue) {
	if (window.primary_data_object.documents[window.primary_data_object.currentdocumentindex]) {

		var currentdoc = getDocumentIndex();
		var currentobj = getObjectIndex();

		//console.log("curr doc index: " + currentdoc);
		//console.log("curr obj index: " + currentobj);


		if (pvalue) {
			return $(window.primary_data_object.documents[currentdoc].objects[currentobj]).find("property[name='" + window.settings.objects[getSchemaIndex()].property + "']").attr('value');

		} else {
			return window.primary_data_object.documents[currentdoc].objects[currentobj];
		}
	}
}

function getDocumentIndex() {
	if (window.primary_data_object.documents[window.primary_data_object.currentdocumentindex]) {
		return window.primary_data_object.currentdocumentindex;
	} else {
		return -1;
	}
}

function getObjectIndex() {
	if (window.primary_data_object.documents[window.primary_data_object.currentdocumentindex]) {
		return window.primary_data_object.documents[window.primary_data_object.currentdocumentindex].currentobjectindex;
	}
}

function getSchemaIndex() {
	if (window.primary_data_object.documents[window.primary_data_object.currentdocumentindex]) {
		return window.primary_data_object.documents[window.primary_data_object.currentdocumentindex].currentschemaindex;
	}
}

/* // Hook up the submit button to log to the console
document.getElementById('submit').addEventListener('click', function () {
    // Get the value from the editor
    console.log(editor.getValue());
});*/