const BlogUpdateForm = ({
  handleUpdateBlog,
  setBlogTitle,
  setBlogAuthor,
  setBlogUrl,
  setBlogLikes,
  blogTitle,
  blogAuthor,
  blogUrl,
  blogLikes,
}) => {
  return (
    <form onSubmit={handleUpdateBlog}>
      <div>
        title
        <input
          type="text"
          value={blogTitle}
          name="title"
          onChange={({ target }) => setBlogTitle(target.value)}
        />
      </div>
      <div>
        author
        <input
          type="text"
          value={blogAuthor}
          name="author"
          onChange={({ target }) => setBlogAuthor(target.value)}
        />
      </div>
      <div>
        url
        <input
          type="text"
          value={blogUrl}
          name="url"
          onChange={({ target }) => setBlogUrl(target.value)}
        />
      </div>
      <div>
        likes
        <input
          type="text"
          value={blogLikes}
          name="likes"
          onChange={({ target }) => setBlogLikes(target.value)}
        />
      </div>
      <button type="submit">update blog likes</button>
    </form>
  )
}

export default BlogUpdateForm
