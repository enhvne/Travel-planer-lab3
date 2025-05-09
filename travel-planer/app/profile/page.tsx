'use client'; 
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './style.module.css';
import '../../app/globals.css';
import TopBar from '@/components/TopBar';
import { FaUser, FaCog, FaHistory, FaHeart, FaSignOutAlt, FaEdit } from 'react-icons/fa';

interface User {
  avatar: string;
  name: string;
  email: string;
  joinedDate: string;
  savedTours: number;
  completedTours: number;
}

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('info');
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<User | null>(null);

  useEffect(() => {
    // API-оос хэрэглэгчийн мэдээлэл татна
    fetch('/api/user')
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setEditedUser(data);
      });
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const response = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedUser),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
        setIsEditing(false);
      } else {
        console.error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleCancel = () => {
    setEditedUser(user);
    setIsEditing(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editedUser) {
      setEditedUser({
        ...editedUser,
        [e.target.name]: e.target.value,
      });
    }
  };

  if (!user) return <p>Уншиж байна...</p>;

  const renderContent = () => {
    switch (activeTab) {
      case 'info':
        return (
          <div className={styles.infoSection}>
            <div className={styles.avatarContainer}>
              <Image
                src={user.avatar}
                alt={user.name}
                width={120}
                height={120}
                className={styles.avatar}
              />
              <button className={styles.editAvatar}>Edit Photo</button>
            </div>
            <div className={styles.userInfo}>
              {isEditing ? (
                <div className={styles.editForm}>
                  <div className={styles.formGroup}>
                    <label>Name:</label>
                    <input
                      type="text"
                      name="name"
                      value={editedUser?.name || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Email:</label>
                    <input
                      type="email"
                      name="email"
                      value={editedUser?.email || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className={styles.editButtons}>
                    <button onClick={handleSave} className={styles.saveButton}>
                      Save
                    </button>
                    <button onClick={handleCancel} className={styles.cancelButton}>
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h2>{user.name}</h2>
                  <p>{user.email}</p>
                  <p>Member since {user.joinedDate}</p>
                  <button onClick={handleEdit} className={styles.editButton}>
                    <FaEdit /> Edit Profile
                  </button>
                </>
              )}
            </div>
            <div className={styles.stats}>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>{user.savedTours}</span>
                <span className={styles.statLabel}>Saved Tours</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>{user.completedTours}</span>
                <span className={styles.statLabel}>Completed Tours</span>
              </div>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className={styles.settingsSection}>
            <h2>Account Settings</h2>
            <div className={styles.settingItem}>
              <label>Email Notifications</label>
              <input type="checkbox" defaultChecked />
            </div>
            <div className={styles.settingItem}>
              <label>Language</label>
              <select defaultValue="en">
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
              </select>
            </div>
            <div className={styles.settingItem}>
              <label>Currency</label>
              <select defaultValue="usd">
                <option value="usd">USD</option>
                <option value="eur">EUR</option>
                <option value="gbp">GBP</option>
              </select>
            </div>
          </div>
        );
      case 'activity':
        return (
          <div className={styles.activitySection}>
            <h2>Recent Activity</h2>
            <div className={styles.activityList}>
              {/* Mock activity items */}
              <div className={styles.activityItem}>
                <FaHeart className={styles.activityIcon} />
                <div className={styles.activityContent}>
                  <p>Saved "Mountain Adventure" to wishlist</p>
                  <span className={styles.activityDate}>2 days ago</span>
                </div>
              </div>
              <div className={styles.activityItem}>
                <FaHistory className={styles.activityIcon} />
                <div className={styles.activityContent}>
                  <p>Completed "Beach Resort" tour</p>
                  <span className={styles.activityDate}>1 week ago</span>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <TopBar />
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <div className={styles.sidebarHeader}>
            <Image
              src={user.avatar}
              alt={user.name}
              width={60}
              height={60}
              className={styles.sidebarAvatar}
            />
            <h3>{user.name}</h3>
          </div>
          <nav className={styles.nav}>
            <button
              className={`${styles.navItem} ${activeTab === 'info' ? styles.active : ''}`}
              onClick={() => setActiveTab('info')}
            >
              <FaUser className={styles.navIcon} />
              Profile Info
            </button>
            <button
              className={`${styles.navItem} ${activeTab === 'settings' ? styles.active : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              <FaCog className={styles.navIcon} />
              Settings
            </button>
            <button
              className={`${styles.navItem} ${activeTab === 'activity' ? styles.active : ''}`}
              onClick={() => setActiveTab('activity')}
            >
              <FaHistory className={styles.navIcon} />
              Activity
            </button>
          </nav>
          <button className={styles.logoutButton}>
            <FaSignOutAlt className={styles.navIcon} />
            Logout
          </button>
        </div>
        <main className={styles.mainContent}>
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default ProfilePage; 