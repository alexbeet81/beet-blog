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