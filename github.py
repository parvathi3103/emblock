from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)

GITHUB_API_URL = "https://api.github.com/users/"

GITHUB_TOKEN = "YOUR_TOKEN"


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/api/user/<username>', methods=['GET'])
def get_user(username):
    headers = {'Authorization': f'Bearer {GITHUB_TOKEN}'}
    response = requests.get(GITHUB_API_URL + username, headers=headers)
    return jsonify(response.json())


@app.route('/api/user/<username>/repos', methods=['GET'])
def get_repos(username):
    headers = {'Authorization': f'Bearer {GITHUB_TOKEN}'}
    response = requests.get(GITHUB_API_URL + username + '/repos', headers=headers)
    return jsonify(response.json())


@app.route('/api/user/<username>/activity', methods=['GET'])
def get_activity(username):
    
    return jsonify([]) 


if __name__ == '__main__':
    app.run(debug=True)