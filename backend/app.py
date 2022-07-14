from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from datetime import datetime
from flask_cors import CORS

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:postgres@localhost/recipesdb2'
db = SQLAlchemy(app)
migrate = Migrate(app, db)
CORS(app)

class Recipe(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    imageUrl = db.Column(db.String(5000), nullable=True)
    serving_size = db.Column(db.Integer, nullable=False)
    ingredients = db.Column(db.String(5000), nullable=False)
    instructions = db.Column(db.String(5000), nullable=False)
    category = db.Column(db.String(100), nullable=False)
    notes = db.Column(db.String(500), nullable=False)
    date_added = db.Column(db.DateTime, nullable=False, default=datetime.utcnow) 
    date_modified = db.Column(db.TIMESTAMP, nullable=False, default=datetime.utcnow) 

    def __repr__(self):
        f'Event: {self.name}'
    
    def __init__(self, name, imageUrl, serving_size, ingredients, instructions, category, notes):
        self.name = name
        self.imageUrl = imageUrl
        self.serving_size = serving_size
        self.ingredients = ingredients
        self.instructions = instructions
        self.category = category
        self.notes = notes

def format_recipe(recipe):
    return {
        "id": recipe.id,
        "name": recipe.name,
        "imageUrl": recipe.imageUrl,
        "serving_size": recipe.serving_size,
        "ingredients": recipe.ingredients,
        "instructions": recipe.instructions,
        "category": recipe.category,
        "notes": recipe.notes,
        "date_added": recipe.date_added,
        "date_modified": recipe.date_modified
    }

@app.route('/')
def hello():
    return 'Bonjour!'

#create a recipe
@app.route('/recipes', methods = ['POST'])
def create_recipe():
    name = request.json['name']
    imageUrl = request.json['imageUrl']
    serving_size = request.json['serving_size']
    ingredients = request.json['ingredients']
    instructions = request.json['instructions']
    category = request.json['category']
    notes = request.json['notes']
    recipe = Recipe(name, imageUrl, serving_size, ingredients, instructions, category, notes)
    db.session.add(recipe)
    db.session.commit()
    return format_recipe(recipe)

#get all recipes
@app.route('/recipes', methods = ['GET'])
def get_recipes():
    recipes = Recipe.query.order_by(Recipe.id.asc()).all()
    recipes_list = []
    for recipe in recipes:
        recipes_list.append(format_recipe(recipe))
    return {'recipes': recipes_list}

#get a recipe by id
@app.route('/recipes/<id>', methods = ['GET'])
def get_recipe_by_id(id):
    recipe = Recipe.query.filter_by(id=id).one()
    formatted_recipe = format_recipe(recipe)
    return {'recipe': formatted_recipe}

#delete a recipe by id
@app.route('/recipes/<id>', methods = ['DELETE'])
def delete_recipe_by_id(id):
    recipe = Recipe.query.filter_by(id=id).one()
    db.session.delete(recipe)
    db.session.commit()
    return f'Recipe id: {id} deleted'

#edit a recipe by id
@app.route('/recipes/<id>', methods = ['PUT'])
def update_recipe(id):
    recipe = Recipe.query.filter_by(id=id)
    name = request.json['name']
    imageUrl = request.json['imageUrl']
    serving_size = request.json['serving_size']
    ingredients = request.json['ingredients']
    instructions = request.json['instructions']
    category = request.json['category']
    notes = request.json['notes']
    recipe.update(dict(name = name, imageUrl = imageUrl, serving_size = serving_size, ingredients = ingredients,instructions = instructions,category = category, notes = notes, date_modified = datetime.utcnow()))
    db.session.commit()
    return {'recipe': format_recipe(recipe.one())}

if __name__ == '__main__':
    app.run()


