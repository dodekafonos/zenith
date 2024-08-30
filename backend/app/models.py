from werkzeug.security import generate_password_hash, check_password_hash
from . import mongo

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


class Item:
    def __init__(self, name, description):
        self.name = name
        self.description = description

    def to_dict(self):
        return {
            "name": self.name,
            "description": self.description
        }
