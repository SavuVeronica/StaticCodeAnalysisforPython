import React, { useState } from 'react';
import "./Preferences.css";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import SideMenu from '../Menu/SideMenu';
import { UserContext } from '../../contexts/UserContext';

async function getUserData(userId) {
  return fetch('http://localhost:4000/user/' + userId, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json'
      }
  }).then((res) => res.json())
      .then(data => {
          return data;
      });
}

async function updatePreferences(userId, data) {
  return fetch('http://localhost:4000/user/' + userId, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then((res) => res.json())
    .then(data => {
      return data;
    });
}

export default function Preferences() {
  const { userId } = React.useContext(UserContext);

  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();

  const handleNewPassword = async e => {
    e.preventDefault();
    // Check old password is correct
    const user = await getUserData(userId);
    if(user.password !== oldPassword) {
      NotificationManager.error('Password provided is not correct.', 'Error', 1500);
      return;
    }

    const updatedData = updatePreferences(userId, {
      password: newPassword
    });

    if (updatedData === undefined) {
      NotificationManager.error('Errors occured. Password was not updated.', 'Error', 1500);
    } else {
      NotificationManager.success('Your password is updated!', 'Success', 1500);
    }
  };

  return (
    <div className='content'>
      <SideMenu />
      <div className='page-content'>
        <div className="wrapper">
          <div className="form">
            <form onSubmit={handleNewPassword} className="project-form">
              <div className="form-fields">
                <div className="form-group">
                  <label>Old Password</label>
                  <input
                    type="password"
                    className="form-control"
                    onChange={e => setOldPassword(e.target.value)}
                    required />
                </div>
                <div className="form-group">
                  <label>New Password</label>
                  <input
                    type="password"
                    className="form-control"
                    onChange={e => setNewPassword(e.target.value)}
                    required />
                </div>
              </div>
              <div className='form-buttons'>
                <button type="submit" className="btn btn-primary btn-block submitBtn">Save</button>
              </div>
            </form>
          </div>
        </div>
        <NotificationContainer />
      </div>
    </div>
  );
}

// Preferences.propTypes = {
//   userId: PropTypes.number.isRequired
// };