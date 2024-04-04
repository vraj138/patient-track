from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api, Resource
from flask_bcrypt import bcrypt
from models import Patient, User
from flask_login import login_user, login_required, current_user

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:vraj@1381@localhost/patient_information'
app.secret_key = 'patienttrack123'
db = SQLAlchemy(app)
api = Api(app)

@app.route('api/register', methods=['POST'])
def register_doctor():
    data = request.json
    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    new_doctor = User(username=data['username'], password=hashed_password, role='doctor')
    db.session.add(new_doctor)
    db.session.commit()
    return jsonify({'message': 'Doctor registered successfully'}), 201

@app.route('/api/login/doctor', methods=['POST'])
def login_doctor():
    data = request.json
    doctor = User.query.filter_by(username=data['username'], role='doctor').first()
    if doctor and bcrypt.check_password_hash(doctor.password, data['password']):
        login_user(doctor)
        return jsonify({'message': 'Doctor login successful', 'doctor_id': doctor.id, 'username': doctor.username})
    else:
        return jsonify({'error': 'Invalid username or password'}), 401
    
@app.route('/api/create_patient', methods=['POST'])
@login_required
def create_patient():
    if current_user.role == 'doctor':
        data = request.json
        new_patient = Patient(name=data['name'])
        db.session.add(new_patient)
        db.session.commit()
        return jsonify({'message': 'Patient created successfully', 'patient_id': new_patient.id}), 201
    else:
        return jsonify({'error': 'Unauthorized access'}), 403

if __name__ == "__main__":
    app.run(debug=True)
