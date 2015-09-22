var FS = require('fs');
module.exports = {
    "name": "metadata",
    "title": "Working with metadata",
    "icon": "exclamation",
    "description": "Learn to work with metadata.",
    "control_sets": [{
        "page": 0,
        "title": "Create metadata profile",
        "affects": "addMetadataProfile",
        "tip": ".",
        "disableAutorefresh": true,
        "inputs": [{
            "default": "",
            "type": "text",
            "label": "Profile Name",
            "name": "name"
        }, {
            "default": "",
            "type": "text",
            "label": "System Profile Name",
            "name": "systemName"
        }, {
            "default": "1",
            "type": "text",
            "name": "metadataObjectType",
            "hidden": true
        }, {
            "default": "1",
            "type": "text",
            "name": "objectType",
            "hidden": true
        }, {
            "default": "1",
            "type": "text",
            "name": "createMode",
            "hidden": true
        }, {
            "default": FS.readFileSync(__dirname + '/data/metadata_profile_sample.xsd', 'utf8'),
            "type": "text",
            "label": "XSD data",
            "name": "xsdData",
            "hidden": true
        }]
    }, {
        "page": 1,
        "title": "Add metadata to an entry",
        "affects": "addMetadata",
        "tip": ".",
        "disableAutorefresh": true,
        "inputs": [{
            "default": "",
            "type": "text",
            "label": "entryId",
            "name": "objectId"
        }, {
            "default": "<metadata><Somefield>LINUX RULES</Somefield></metadata>",
            "type": "text",
            "label": "XML",
            "name": "xmlData"
        }, {
            "default": "1",
            "type": "text",
            "name": "objectType",
            "hidden": true
        }, {
            "type": "select-chosen",
            "name": "metadataProfileId",
            "label": "Metadata Profile",
            "dynamicChoices": {
                "service": "metadataProfile",
                "action": "list",
                "map": {
                    "value": "id",
                    "label": "name"
                }
            }
        }]
    }, {
        "page": 2,
        "title": "Update entry metadata",
        "affects": "updateMetadata",
        "tip": ".",
        "disableAutorefresh": true,
        "inputs": [{
            "default": "",
            "type": "text",
            "label": "Metadata ID",
            "name": "id"
        }, {
            "default": "<metadata><Somefield>NEW VALUE HERE</Somefield></metadata>",
            "type": "text",
            "label": "XML",
            "name": "xmlData"
        }]
    }, {
        "page": 3,
        "title": "Delete metadata profiles",
        "tip": "Browse existing profiles in the frame below and click 'Delete' to remove them.",
        "inputs": [],
    }],

    "pages": [{
        "views": ["metadataProfileShow"],
        "actions": [{
          "service": "metadataProfile",
          "action": "add",
          "view": "metadataProfileShow"
        }],
        "start": {
          "view": "metadataProfileShow",
          "data": {
              "action": "addMetadataProfile"
          },
        }
    }, {
        "views": ["metadataShow"],
        "actions": [{
          "service": "metadata",
          "action": "add",
          "view": "metadataShow"
        }],
        "start": {
          "view": "metadataShow",
          "data": {
              "action": "addMetadata"
          }
        }
    }, {
        "views": ["metadataShow"],
        "actions": [{
          "service": "metadata",
          "action": "update",
          "view": "metadataShow"
        }],
        "start": {
          "view": "metadataShow",
          "data": {
              "action": "updateMetadata"
          }
        }
    }, {
        "views": ["KalturaMetadataProfileListResponse", "metadataProfileShow", "metadataProfileDeleted"],
        "actions": [{
          "service": "metadataProfile",
          "action": "listAction",
          "view": "KalturaMetadataProfileListResponse"
        }, {
          "service": "metadataProfile",
          "action": "deleteAction",
          "view": "metadataProfileDeleted"
        }],
        "start": {
          "view": "KalturaMetadataProfileListResponse",
          "data": {
              "action": "listMetadataProfile"
          }
        }
    }],
}
