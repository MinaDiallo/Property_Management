
from flask import Flask, request, jsonify, make_response

from os import environ
from flask_cors import CORS
from flask_swagger_ui import get_swaggerui_blueprint



app = Flask (__name__)

SWAGGER_URL="/swagger"
API_URL="static/swagger.json"

swagger_ui_blueprint = get_swaggerui_blueprint(
    SWAGGER_URL,
    API_URL,
    config={
        'app_name': 'Property Management API'
    }
)
app.register_blueprint(swagger_ui_blueprint, url_prefix=SWAGGER_URL)
app.config['SQLALCHEMY_DATABASE_URI'] = environ.get('DB_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
CORS(app)

import views
