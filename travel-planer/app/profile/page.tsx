'use client'; 
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './style.module.css';
import { FaUser, FaCog, FaComment, FaSignOutAlt, FaEdit, FaKey } from 'react-icons/fa';
import { User } from '@/models/model';
import { useRouter } from 'next/navigation';

// Define interfaces if not already in models/model.ts
interface Settings { // If not in models/model.ts
  emailNotifications: boolean;
  language: string;
  currency: string;
}

interface ActivityItem { // If not in models/model.ts
  id: number;
  desc: string;
  date: string;
}

// Update User interface if not already in models/model.ts
// export interface User { // If not in models/model.ts
//   id?: number;
//   name: string;
//   image: string;
//   role?: string;
//   username?: string;
//   email: string;
//   password?: string;
//   wishLists?: any[];
//   comments?: any[];
//   isPro?: boolean;
//   recently?: any[];
//   messages?: string[];
//   savedTours?: number;
//   completedTours?: number;
//   settings?: Settings;
//   activity?: ActivityItem[];
// }

const ProfilePage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('info');
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<User | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // State for Settings form
  const [settings, setSettings] = useState<Settings>({ // Initialize with default or fetched data
    emailNotifications: true,
    language: 'en',
    currency: 'usd',
  });
  const [isSavingSettings, setIsSavingSettings] = useState(false);

  // State for Change Password form (frontend only mock)
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [passwordError, setPasswordError] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState('');

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token) {
      router.push('/login');
      return;
    }

    fetch('/api/user', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          localStorage.removeItem('token');
          router.push('/login');
          throw new Error('Failed to fetch user data');
        }
        return res.json();
      })
      .then((data: User) => {
        setUser(data);
        setEditedUser(data);
        if (data.settings) setSettings(data.settings); // Initialize settings state
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
        localStorage.removeItem('token');
        router.push('/login');
      });

  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!editedUser) return;

    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      const response = await fetch('/api/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ name: editedUser.name, email: editedUser.email, image: editedUser.image }),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
        setEditedUser(updatedUser);
        setIsEditing(false);
        setSelectedImage(null); // Clear selected image after saving
      } else {
        console.error('Failed to update profile');
        alert('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile');
    }
  };

  const handleCancel = () => {
    setEditedUser(user);
    setSelectedImage(null); // Clear selected image on cancel
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
        const imageUrl = ev.target?.result as string;
        setSelectedImage(imageUrl);
        setEditedUser((prev) => prev ? { ...prev, image: imageUrl } : prev); // Update image in editedUser
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSettingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, type } = e.target;
    const value = type === 'checkbox' ? (e.target as HTMLInputElement).checked : (e.target as HTMLSelectElement).value;
    setSettings(prev => ({
      ...prev!,
      [name]: value,
    }));
  };

  const handleSaveSettings = async () => {
    setIsSavingSettings(true);
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      const response = await fetch('/api/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ settings: settings }),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
        setEditedUser(updatedUser);
        alert('Settings saved successfully!');
      } else {
        console.error('Failed to save settings');
        alert('Failed to save settings.');
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Error saving settings.');
    } finally {
      setIsSavingSettings(false);
    }
  };

  const handlePasswordInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({ ...prev, [name]: value }));
    setPasswordError('');
    setPasswordSuccess('');
  };

  const handleChangePassword = async () => {
    setPasswordError('');
    setPasswordSuccess('');
    setIsChangingPassword(true);

    if (passwordForm.newPassword !== passwordForm.confirmNewPassword) {
      setPasswordError('New passwords do not match.');
      setIsChangingPassword(false);
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      setPasswordError('Password must be at least 6 characters long.');
      setIsChangingPassword(false);
      return;
    }

    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      const response = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        setPasswordError(data.error || 'Failed to change password');
      } else {
        setPasswordSuccess('Password changed successfully');
        setPasswordForm({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
      }
    } catch (error) {
      setPasswordError('An error occurred while changing password');
    } finally {
      setIsChangingPassword(false);
    }
  };

  if (!user) return <p>Loading...</p>;

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
                    <label htmlFor="name">Name:</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={editedUser?.name || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="email">Email:</label>
                    <input
                      type="email"
                      id="email"
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
                <span className={styles.statNumber}>{user.savedTours ?? 0}</span>
                <span className={styles.statLabel}>Saved Tours</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>{user.completedTours ?? 0}</span>
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
              <label htmlFor="emailNotifications">Email Notifications</label>
              <input
                type="checkbox"
                id="emailNotifications"
                name="emailNotifications"
                checked={settings.emailNotifications}
                onChange={handleSettingChange}
              />
            </div>
            <div className={styles.settingItem}>
              <label htmlFor="language">Language</label>
              <select id="language" name="language" value={settings.language} onChange={handleSettingChange}>
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="mn">Mongolia</option>
              </select>
            </div>
            <div className={styles.settingItem}>
              <label htmlFor="currency">Currency</label>
              <select id="currency" name="currency" value={settings.currency} onChange={handleSettingChange}>
                <option value="usd">USD</option>
                <option value="eur">EUR</option>
                <option value="gbp">GBP</option>
                <option value="mnt">MNT</option>
              </select>
            </div>
            <button onClick={handleSaveSettings} className={styles.saveButton} disabled={isSavingSettings}>
              {isSavingSettings ? 'Saving...' : 'Save Settings'}
            </button>
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
      case 'changePassword':
        return (
          <div className={styles.changePasswordSection}>
            <h2>Change Password</h2>
            <div className={styles.changePasswordForm}>
              <div className={styles.formGroup}>
                <label htmlFor="currentPassword">Current Password:</label>
                <input type="password" id="currentPassword" name="currentPassword" value={passwordForm.currentPassword} onChange={handlePasswordInputChange} />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="newPassword">New Password:</label>
                <input type="password" id="newPassword" name="newPassword" value={passwordForm.newPassword} onChange={handlePasswordInputChange} />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="confirmNewPassword">Confirm New Password:</label>
                <input type="password" id="confirmNewPassword" name="confirmNewPassword" value={passwordForm.confirmNewPassword} onChange={handlePasswordInputChange} />
              </div>
              {passwordError && <p className={styles.error}>{passwordError}</p>}
              {passwordSuccess && <p className={styles.success}>{passwordSuccess}</p>}
              <button onClick={handleChangePassword} className={styles.saveButton} disabled={isChangingPassword}>
                {isChangingPassword ? 'Changing...' : 'Change Password'}
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <div className={styles.sidebarHeader}>
            <Image
              src={selectedImage || (user?.image ?? '/default-avatar.png')}
              alt={user?.name ?? 'User'}
              width={60}
              height={60}
              className={styles.sidebarAvatar}
            />
            <h3>{user?.name ?? 'User'}</h3>
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