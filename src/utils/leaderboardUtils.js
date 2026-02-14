import { collection, getDocs, doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

/**
 * Get top users for the leaderboard
 * @param {number} limitCount - Number of users to fetch (default: 10)
 * @returns {Promise<Array>} - Array of top users
 */
export const getLeaderboard = async (limitCount = 10) => {
  try {
    const usersRef = collection(db, 'users');
    
    // Fetch all users (Firestore orderBy only returns docs with the field)
    // We need to get all users and sort manually to include users without totalProblemsSolved
    const querySnapshot = await getDocs(usersRef);
    
    const leaderboard = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      leaderboard.push({
        userId: doc.id,
        username: data.username || data.email?.split('@')[0] || 'Anonymous',
        email: data.email,
        profileImage: data.profileImage || null,
        totalProblemsSolved: data.totalProblemsSolved || 0,
        currentStreak: data.currentStreak || 0,
        longestStreak: data.longestStreak || 0,
        solvedQuestions: data.solvedQuestions?.length || 0,
      });
    });
    
    // Sort by totalProblemsSolved in descending order
    leaderboard.sort((a, b) => b.totalProblemsSolved - a.totalProblemsSolved);
    
    // Return only the top users
    return leaderboard.slice(0, limitCount);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return [];
  }
};

/**
 * Get user's rank in the leaderboard
 * @param {string} userId - Firebase user ID
 * @returns {Promise<number>} - User's rank (1-indexed)
 */
export const getUserRank = async (userId) => {
  try {
    const usersRef = collection(db, 'users');
    const querySnapshot = await getDocs(usersRef);
    
    const users = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      users.push({
        userId: doc.id,
        totalProblemsSolved: data.totalProblemsSolved || 0,
      });
    });
    
    // Sort by totalProblemsSolved in descending order
    users.sort((a, b) => b.totalProblemsSolved - a.totalProblemsSolved);
    
    // Find user's rank
    const rank = users.findIndex(u => u.userId === userId) + 1;
    return rank || null;
  } catch (error) {
    console.error('Error getting user rank:', error);
    return null;
  }
};

/**
 * Update user's total problems solved count
 * @param {string} userId - Firebase user ID
 * @param {number} count - Number to add to total
 */
export const updateTotalProblemsSolved = async (userId, count = 1) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    
    if (!userSnap.exists()) {
      throw new Error('User not found');
    }
    
    const currentTotal = userSnap.data().totalProblemsSolved || 0;
    
    await updateDoc(userRef, {
      totalProblemsSolved: currentTotal + count,
    });
  } catch (error) {
    console.error('Error updating total problems solved:', error);
  }
};
