export const updateBookmarks = (bookmarks) => {
    return {
      type: 'BOOKMARKS_UPDATED',
      payload: bookmarks
    }
  };