import AsyncStorage from '@react-native-community/async-storage';

const STORAGE_KEY = 'BOOKMARKS';

const parseHighScores = (highScores) =>
  JSON.parse(highScores).map((highScore) => {
    highScore.createdAt = new Date(highScore.createdAt)
    return highScore;
  });

export const fetchBookmarks = async () => {
  try {
    let bookmarks = await AsyncStorage.getItem(STORAGE_KEY);

    if (bookmarks === null) { return []; }

    return JSON.parse(bookmarks);
  } catch (error) {
    console.log('Error fetching bookmarks', error);
  }
}

export const saveBookmarks = (bookmarks) => {
  AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
}

export const removeBookmark = async (bookmark) => {
  let bookmarkIndex;
  let bookmarks = await fetchBookmarks();
  bookmarks.forEach( (b,i) => {
    if(b.url.includes(bookmark.url)){
      bookmarkIndex = i;
    }
  });
  bookmarks.splice(bookmarkIndex, 1);
  saveBookmarks(bookmarks);
}

export const saveBookmark = async (bookmark) => {
  let bookmarks = await fetchBookmarks();
  bookmarks = mergeBookmarks(bookmarks, bookmark);
  saveBookmarks(bookmarks);
}

export const mergeBookmarks = (bookmarks, bookmark) => {
  return [...bookmarks, bookmark];
}