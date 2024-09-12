from werkzeug.security import generate_password_hash, check_password_hash
from . import mongo
from mongoengine import Document, fields

class User:
    def __init__(self, email, password=None, hashed_password=None):
        self.email = email
        self.password = generate_password_hash(password) if password else hashed_password

    def to_dict(self):
        return {
            "email": self.email,
            "password": self.password
        }

    @staticmethod
    def find_by_email(email):
        return mongo.db.users.find_one({"email": email})

    @staticmethod
    def check_password(stored_password, provided_password):
        return check_password_hash(stored_password, provided_password)

    @staticmethod
    def create_user( email, password):
        user = User( email, password)
        mongo.db.users.insert_one(user.to_dict())

class Anamnese(Document):
    user_id = fields.ObjectIdField(required=True)
    historico_medico = fields.StringField()
    alergias = fields.StringField()
    medicamentos = fields.StringField()
    role = fields.StringFields()
