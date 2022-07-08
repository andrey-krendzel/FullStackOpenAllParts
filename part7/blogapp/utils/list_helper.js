const dummy = (blogs) => {
  return 1;
};

const totalLikes = (list) => {
  let sum = 0;
  list.forEach((blog) => {
    sum = sum + blog.likes;
  });

  return sum;
};

const favouriteBlog = (list) => {
  let mostLikes = 0;
  let mostLikedIndex = 0;
  let favouriteObject = {};

  for (let i = 0; i < list.length; i++) {
    if (list[i].likes > mostLikes) {
      mostLikes = list[i].likes;
      mostLikedIndex = i;

      favouriteObject = {
        title: list[i].title,
        author: list[i].author,
        likes: list[i].likes,
      };
    }
  }

  return favouriteObject;
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
};
