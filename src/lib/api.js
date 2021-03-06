const FIREBASE_DOMAIN =
  "https://beet-blog-default-rtdb.asia-southeast1.firebasedatabase.app";

export const getAllPosts = async () => {
  const response = await fetch(`${FIREBASE_DOMAIN}/posts.json`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not find posts");
  }

  const transformedPosts = [];

  for (const key in data) {
    const postObj = {
      id: key,
      ...data[key],
    };
    transformedPosts.push(postObj);
  }

  return transformedPosts;
};

export const getSinglePost = async (postId) => {
  const reponse = await fetch(`${FIREBASE_DOMAIN}/posts/${postId}.json`);
  const data = await reponse.json();

  if (!reponse.ok) {
    throw new Error(data.message || "could not find post");
  }

  const loadedPost = {
    id: postId,
    ...data,
  };

  return loadedPost;
};

export const addPost = async (postData) => {
  const response = await fetch(`${FIREBASE_DOMAIN}/posts.json`, {
    method: "POST",
    body: JSON.stringify(postData),
    headers: {
      "Content-Typs": "application/json",
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "cannot create post");
  }

  const postId = data.name

  return postId;
};

export const removePost = async (postId) => {
  const response = await fetch(`${FIREBASE_DOMAIN}/posts/${postId}.json`, {
    method: "DELETE",
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "could not find post");
  }

  return null;
};

export const signUp = async (userData) => {
  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCPPP_IKRSQnWYo15i5r-6-ZF6KTUgPewU`,
    {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "could not sign up");
  }

  return data;
};

export const login = async (userData) => {
  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCPPP_IKRSQnWYo15i5r-6-ZF6KTUgPewU`,
    {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not login");
  }

  return data;
};
