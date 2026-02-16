from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import json
import os
from datetime import datetime

app = Flask(__name__, static_folder='.')
CORS(app)

# Data storage files
CONTACTS_FILE = 'data/contacts.json'
BLOGS_FILE = 'data/blogs.json'

# Ensure data directory exists
os.makedirs('data', exist_ok=True)

# Initialize data files if they don't exist
if not os.path.exists(CONTACTS_FILE):
    with open(CONTACTS_FILE, 'w') as f:
        json.dump([], f)

if not os.path.exists(BLOGS_FILE):
    with open(BLOGS_FILE, 'w') as f:
        json.dump([], f)

# ===================================
# AUTHENTICATION
# ===================================

ADMIN_USERNAME = 'admin'
ADMIN_PASSWORD = '1234567890'

@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    
    if username == ADMIN_USERNAME and password == ADMIN_PASSWORD:
        return jsonify({
            'success': True,
            'message': 'Login successful',
            'user': {
                'username': username,
                'role': 'admin'
            }
        })
    else:
        return jsonify({
            'success': False,
            'message': 'Invalid credentials'
        }), 401

# ===================================
# CONTACT FORM ENDPOINTS
# ===================================

@app.route('/api/contact/submit', methods=['POST'])
def submit_contact():
    try:
        data = request.json
        
        # Validate required fields
        required_fields = ['name', 'email', 'subject', 'message']
        for field in required_fields:
            if not data.get(field):
                return jsonify({
                    'success': False,
                    'message': f'{field} is required'
                }), 400
        
        # Load existing contacts
        with open(CONTACTS_FILE, 'r') as f:
            contacts = json.load(f)
        
        # Add new contact
        contact = {
            'id': len(contacts) + 1,
            'name': data.get('name'),
            'email': data.get('email'),
            'company': data.get('company', ''),
            'phone': data.get('phone', ''),
            'subject': data.get('subject'),
            'message': data.get('message'),
            'newsletter': data.get('newsletter', False),
            'date': datetime.now().isoformat(),
            'status': 'new'
        }
        
        contacts.append(contact)
        
        # Save to file
        with open(CONTACTS_FILE, 'w') as f:
            json.dump(contacts, f, indent=2)
        
        return jsonify({
            'success': True,
            'message': 'Contact form submitted successfully',
            'contact': contact
        })
    
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500

@app.route('/api/contact/list', methods=['GET'])
def list_contacts():
    try:
        with open(CONTACTS_FILE, 'r') as f:
            contacts = json.load(f)
        
        return jsonify({
            'success': True,
            'contacts': contacts,
            'total': len(contacts)
        })
    
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500

@app.route('/api/contact/<int:contact_id>', methods=['GET'])
def get_contact(contact_id):
    try:
        with open(CONTACTS_FILE, 'r') as f:
            contacts = json.load(f)
        
        contact = next((c for c in contacts if c['id'] == contact_id), None)
        
        if contact:
            return jsonify({
                'success': True,
                'contact': contact
            })
        else:
            return jsonify({
                'success': False,
                'message': 'Contact not found'
            }), 404
    
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500

@app.route('/api/contact/<int:contact_id>', methods=['DELETE'])
def delete_contact(contact_id):
    try:
        with open(CONTACTS_FILE, 'r') as f:
            contacts = json.load(f)
        
        contacts = [c for c in contacts if c['id'] != contact_id]
        
        with open(CONTACTS_FILE, 'w') as f:
            json.dump(contacts, f, indent=2)
        
        return jsonify({
            'success': True,
            'message': 'Contact deleted successfully'
        })
    
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500

# ===================================
# BLOG ENDPOINTS
# ===================================

@app.route('/api/blogs/list', methods=['GET'])
def list_blogs():
    try:
        # For now, return empty array - blogs are managed in JS
        # You can implement full CRUD later
        return jsonify({
            'success': True,
            'blogs': [],
            'message': 'Blogs are currently managed client-side'
        })
    
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500

@app.route('/api/blogs/create', methods=['POST'])
def create_blog():
    try:
        data = request.json
        
        with open(BLOGS_FILE, 'r') as f:
            blogs = json.load(f)
        
        blog = {
            'id': len(blogs) + 1,
            'title': data.get('title'),
            'slug': data.get('slug'),
            'author': data.get('author'),
            'category': data.get('category'),
            'content': data.get('content'),
            'excerpt': data.get('excerpt'),
            'featured': data.get('featured', False),
            'date': datetime.now().isoformat(),
            'tags': data.get('tags', [])
        }
        
        blogs.append(blog)
        
        with open(BLOGS_FILE, 'w') as f:
            json.dump(blogs, f, indent=2)
        
        return jsonify({
            'success': True,
            'message': 'Blog created successfully',
            'blog': blog
        })
    
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500

# ===================================
# HEALTH CHECK
# ===================================

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'OK',
        'message': 'Qlystra Technologies API is running',
        'timestamp': datetime.now().isoformat()
    })

# ===================================
# SERVE STATIC FILES
# ===================================

@app.route('/')
def serve_index():
    return send_from_directory('.', 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory('.', path)

# ===================================
# RUN SERVER
# ===================================

if __name__ == '__main__':
    print('=' * 60)
    print('Qlystra Technologies Flask Server Starting...')
    print('=' * 60)
    print('Server running on: http://localhost:5000')
    print('API Health Check: http://localhost:5000/api/health')
    print('Admin Panel: http://localhost:5000/admin/login.html')
    print('')
    print('Press Ctrl+C to stop the server')
    print('=' * 60)
    print('')
    
    app.run(debug=True, host='0.0.0.0', port=5000)
