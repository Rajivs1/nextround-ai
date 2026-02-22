import { doc, updateDoc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

/**
 * Calculate streak based on last activity date
 * @param {Date} lastActivityDate - Last date user was active
 * @param {number} currentStreak - Current streak count
 * @returns {number} - Updated streak count
 */
export const calculateStreak = (lastActivityDate, currentStreak) => {
  if (!lastActivityDate) return 1; // First time activity

  const now = new Date();
  const lastDate = new Date(lastActivityDate);
  
  // Reset time to start of day for both dates
  now.setHours(0, 0, 0, 0);
  lastDate.setHours(0, 0, 0, 0);
  
  const diffTime = now - lastDate;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) {
    // Same day - keep current streak
    return currentStreak;
  } else if (diffDays === 1) {
    // Next day - increment streak
    return currentStreak + 1;
  } else {
    // Streak broken - reset to 0
    return 0;
  }
};

/**
 * Check if user's streak should be reset due to inactivity
 * Call this when user visits the app
 * @param {string} userId - Firebase user ID
 * @returns {Promise<Object>} - Current streak data
 */
export const checkAndResetStreak = async (userId) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    
    if (!userSnap.exists()) {
      return { currentStreak: 0, longestStreak: 0 };
    }
    
    const userData = userSnap.data();
    const lastActivityDate = userData.lastActivityDate;
    const currentStreak = userData.currentStreak || 0;
    
    if (!lastActivityDate) {
      return { currentStreak, longestStreak: userData.longestStreak || 0 };
    }
    
    const now = new Date();
    const lastDate = new Date(lastActivityDate);
    
    // Reset time to start of day
    now.setHours(0, 0, 0, 0);
    lastDate.setHours(0, 0, 0, 0);
    
    const diffTime = now - lastDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    // If more than 1 day has passed, reset streak to 0
    if (diffDays > 1 && currentStreak > 0) {
      await updateDoc(userRef, {
        currentStreak: 0,
      });
      
      return {
        currentStreak: 0,
        longestStreak: userData.longestStreak || 0,
        streakReset: true,
      };
    }
    
    return {
      currentStreak,
      longestStreak: userData.longestStreak || 0,
      streakReset: false,
    };
  } catch (error) {
    console.error('Error checking streak:', error);
    return { currentStreak: 0, longestStreak: 0, streakReset: false };
  }
};

/**
 * Update user's streak when they solve a problem
 * @param {string} userId - Firebase user ID
 * @returns {Promise<Object>} - Updated streak data
 */
export const updateUserStreak = async (userId) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    
    if (!userSnap.exists()) {
      throw new Error('User not found');
    }
    
    const userData = userSnap.data();
    const lastActivityDate = userData.lastActivityDate;
    const currentStreak = userData.currentStreak || 0;
    const longestStreak = userData.longestStreak || 0;
    
    // Calculate new streak
    const newStreak = calculateStreak(lastActivityDate, currentStreak);
    const newLongestStreak = Math.max(newStreak, longestStreak);
    
    // Update Firestore
    await updateDoc(userRef, {
      currentStreak: newStreak,
      longestStreak: newLongestStreak,
      lastActivityDate: new Date().toISOString(),
    });
    
    return {
      currentStreak: newStreak,
      longestStreak: newLongestStreak,
      streakIncreased: newStreak > currentStreak,
    };
  } catch (error) {
    console.error('Error updating streak:', error);
    throw error;
  }
};

/**
 * Get user's current streak data
 * @param {string} userId - Firebase user ID
 * @returns {Promise<Object>} - Streak data
 */
export const getUserStreak = async (userId) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    
    if (!userSnap.exists()) {
      return {
        currentStreak: 0,
        longestStreak: 0,
        lastActivityDate: null,
      };
    }
    
    const userData = userSnap.data();
    return {
      currentStreak: userData.currentStreak || 0,
      longestStreak: userData.longestStreak || 0,
      lastActivityDate: userData.lastActivityDate || null,
    };
  } catch (error) {
    console.error('Error getting streak:', error);
    return {
      currentStreak: 0,
      longestStreak: 0,
      lastActivityDate: null,
    };
  }
};

/**
 * Initialize streak fields for a new user
 * @param {string} userId - Firebase user ID
 */
export const initializeUserStreak = async (userId) => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      currentStreak: 0,
      longestStreak: 0,
      lastActivityDate: null,
    });
  } catch (error) {
    console.error('Error initializing streak:', error);
  }
};
