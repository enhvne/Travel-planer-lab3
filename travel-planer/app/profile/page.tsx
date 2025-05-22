'use client'; 
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './style.module.css';
import TopBar from '@/components/TopBar';
import { FaUser, FaCog, FaHistory, FaSignOutAlt, FaEdit, FaComment, FaKey } from 'react-icons/fa';
import { User } from '@/models/model';

const ProfilePage = () => {
  // Router
  const router = useRouter();

  // Token шалгах
  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  // Profile state-ууд
  const [activeTab, setActiveTab] = useState('info');
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<User | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Хэрэглэгчийн мэдээлэл авах
  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    fetch('/api/user', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setEditedUser(data);
      });
  }, []);

  const handleEdit = () => setIsEditing(true);

  const handleSave = async () => {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      const response = await fetch('/api/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(editedUser),
      });
      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
        setIsEditing(false);
      } else {
        alert('Failed to update profile');
      }
    } catch (error) {
      alert('Error updating profile');
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

  const handleEditPhoto = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setSelectedImage(ev.target?.result as string);
        setEditedUser((prev) => prev ? { ...prev, image: ev.target?.result as string } : prev);
      };
      reader.readAsDataURL(file);
    }
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  if (!user) return <p>Loading user...</p>;

  // Tab бүрийн контент
  const renderContent = () => {
    switch (activeTab) {
      case 'info':
        return (
          <div className={styles.infoSection}>
            <div className={styles.avatarContainer}>
              <Image
                src={selectedImage || user.image}
                alt={user.name}
                width={120}
                height={120}
                className={styles.avatar}
              />
              <button className={styles.editAvatar} onClick={handleEditPhoto}>Edit Photo</button>
              <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                ref={fileInputRef}
                onChange={handlePhotoChange}
              />
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
                  <button onClick={handleEdit} className={styles.editButton}>
                    <FaEdit /> Edit Profile
                  </button>
                </>
              )}
            </div>
            <div className={styles.stats}>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Saved Tours</span>
              </div>
              <div className={styles.statItem}>
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
                <option value="fr">Mongolia</option>
              </select>
            </div>
            <div className={styles.settingItem}>
              <label>Currency</label>
              <select defaultValue="usd">
                <option value="usd">USD</option>
                <option value="eur">EUR</option>
                <option value="mnt">MNT</option>
              </select>
            </div>
          </div>
        );
      case 'comments':
        return (
          <div className={styles.commentsSection}>
            <h2>My Comments</h2>
            <div className={styles.commentList}>
              {user.comments && user.comments.filter(c => c.author === user.email).length > 0 ? (
                user.comments
                  .filter(c => c.author === user.email)
                  .map((comment, idx) => (
                    <div className={styles.commentItem} key={idx}>
                      <p>{comment.desc}</p>
                      <span className={styles.commentDate}>
                        {comment.date ? new Date(comment.date).toLocaleDateString() : ''}
                      </span>
                    </div>
                  ))
              ) : (
                <p>No comments yet.</p>
              )}
            </div>
          </div>
        );
      case 'history':
        return (
          <div>
            <h2>Travel History</h2>
            {/* Хэрэглэгчийн аяллын түүхийг энд харуулна */}
          </div>
        );
      case 'changePassword':
        return (
          <div className={styles.changePasswordSection}>
            <h2>Change Password</h2>
            <div className={styles.changePasswordForm}>
              <div className={styles.formGroup}>
                <label>Current Password:</label>
                <input type="password" name="currentPassword" />
              </div>
              <div className={styles.formGroup}>
                <label>New Password:</label>
                <input type="password" name="newPassword" />
              </div>
              <div className={styles.formGroup}>
                <label>Confirm New Password:</label>
                <input type="password" name="confirmNewPassword" />
              </div>
              <button className={styles.saveButton}>Change Password</button>
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
              src={selectedImage || user.image}
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
              className={`${styles.navItem} ${activeTab === 'comments' ? styles.active : ''}`}
              onClick={() => setActiveTab('comments')}
            >
              <FaComment className={styles.navIcon} />
              Comments
            </button>
            <button
              className={`${styles.navItem} ${activeTab === 'history' ? styles.active : ''}`}
              onClick={() => setActiveTab('history')}
            >
              <FaHistory className={styles.navIcon} />
              History
            </button>
            <button
              className={`${styles.navItem} ${activeTab === 'changePassword' ? styles.active : ''}`}
              onClick={() => setActiveTab('changePassword')}
            >
              <FaKey className={styles.navIcon} />
              Change Password
            </button>
          </nav>
          <button className={styles.logoutButton} onClick={handleLogout}>
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