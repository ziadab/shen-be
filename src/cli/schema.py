from cerberus import Validator


schema = {
    "email": {
        "type": "string",
        "minlength": 8,
        "maxlength": 255,
        "required": True,
        "regex": "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$"
    },
    "password": {
        "type": "string",
        "minlength": 8,
        "maxlength": 255,
        "required": True,
    }
}

validator = Validator()
validator.schema = schema
