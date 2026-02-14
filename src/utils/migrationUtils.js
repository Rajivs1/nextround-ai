import { collection, getDocs, doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

/**
 * Migration utility to initialize streak and leaderboard fields for existing users
 * This should be run once to update all existing user documents
 * 
 * Usage: Import and call this function from a component (like Dashboard) on mount
 */
export const migrateExistingUsers = async () => {
  try {
    console.log('Starting user migration...');
    
    const usersRef = collection(db, 'users');
    const querySnapshot = await getDocs(usersRef);
    
    let updatedCount = 0;
    let skippedCount = 0;
    
    const updatePromises = [];
    
    querySnapshot.forEach((userDoc) => {
      const userData = userDoc.data();
      
      // Check if user needs migration (missing any of the new fields)
      const needsMigration = (
        userData.totalProblemsSolved === undefined ||
        userData.currentStreak === undefined ||
        userData.longestStreak === undefined ||
        userData.lastActivityDate === undefined ||
        userData.solvedQuestions === undefined
      );
      
      if (needsMigration) {
        // Calculate totalProblemsSolved from existing solvedQuestions if available
        const existingSolutions = userData.solvedQuestions || [];
        
        // Count unique problems (by questionId + topic)
        const uniqueProblems = new Set();
        existingSolutions.forEach(sol => {
          uniqueProblems.add(`${sol.questionId}-${sol.topic}`);
        });
        
        const updateData = {
          totalProblemsSolved: userData.totalProblemsSolved ?? uniqueProblems.size,
          currentStreak: userData.currentStreak ?? 0,
          longestStreak: userData.longestStreak ?? 0,
          lastActivityDate: userData.lastActivityDate ?? null,
          solvedQuestions: userData.solvedQuestions ?? [],
        };
        
        updatePromises.push(
          updateDoc(doc(db, 'users', userDoc.id), updateData)
            .then(() => {
              updatedCount++;
              console.log(`✅ Updated user: ${userData.username || userData.email}`);
            })
            .catch((error) => {
              console.error(`❌ Failed to update user ${userDoc.id}:`, error);
            })
        );
      } else {
        skippedCount++;
      }
    });
    
    // Wait for all updates to complete
    await Promise.all(updatePromises);
    
    console.log('Migration complete!');
    console.log(`✅ Updated: ${updatedCount} users`);
    console.log(`⏭️ Skipped: ${skippedCount} users (already migrated)`);
    
    return {
      success: true,
      updated: updatedCount,
      skipped: skippedCount,
      total: querySnapshot.size,
    };
  } catch (error) {
    console.error('Error during migration:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};

/**
 * Check if a single user needs migration and update if needed
 * Can be called when a user logs in
 * 
 * @param {string} userId - Firebase user ID
 */
export const migrateUserIfNeeded = async (userId) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    
    if (!userSnap.exists()) {
      console.log('User not found');
      return false;
    }
    
    const userData = userSnap.data();
    
    // Check if user needs migration
    const needsMigration = (
      userData.totalProblemsSolved === undefined ||
      userData.currentStreak === undefined ||
      userData.longestStreak === undefined ||
      userData.lastActivityDate === undefined ||
      userData.solvedQuestions === undefined
    );
    
    if (needsMigration) {
      // Calculate totalProblemsSolved from existing solvedQuestions if available
      const existingSolutions = userData.solvedQuestions || [];
      
      // Count unique problems (by questionId + topic)
      const uniqueProblems = new Set();
      existingSolutions.forEach(sol => {
        uniqueProblems.add(`${sol.questionId}-${sol.topic}`);
      });
      
      const updateData = {
        totalProblemsSolved: userData.totalProblemsSolved ?? uniqueProblems.size,
        currentStreak: userData.currentStreak ?? 0,
        longestStreak: userData.longestStreak ?? 0,
        lastActivityDate: userData.lastActivityDate ?? null,
        solvedQuestions: userData.solvedQuestions ?? [],
      };
      
      await updateDoc(userRef, updateData);
      console.log('✅ User migrated successfully');
      return true;
    }
    
    console.log('⏭️ User already migrated');
    return false;
  } catch (error) {
    console.error('Error migrating user:', error);
    return false;
  }
};
