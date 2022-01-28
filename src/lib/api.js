const FIREBASE_DOMAIN = "https://beet-blog-default-rtdb.asia-southeast1.firebasedatabase.app"

export const getAllPosts = async () => {
  const response = await fetch(`${FIREBASE_DOMAIN}/posts.json`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not find posts');
  }

  const transformedPosts = [];

  for (const key in data) {
    const postObj = {
      id: key,
      ...data[key],
    }
    transformedPosts.push(postObj);
  };

  return transformedPosts;
};

export const getSinglePost = async (postId) => {
  const reponse = await fetch(`${FIREBASE_DOMAIN}/posts/${postId}.json`);
  const data = await reponse.json();

  if (!reponse.ok) {
    throw new Error(data.message || 'could not find post')
  }

  const loadedPost = {
    id: postId,
    ...data
  }

  return loadedPost;
};

export const addPost = async (postData) => {
  const response = await fetch(`${FIREBASE_DOMAIN}/posts.json`, {
    method: 'POST',
    body: JSON.stringify(postData),
    headers: {
      'Content-Typs' : 'application/json'
    }
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'cannot create post')
  };

  return null;
};