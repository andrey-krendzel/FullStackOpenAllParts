const BlogAddForm = ({
  handleAddBlog,
  setBlogTitle,
  setBlogAuthor,
  setBlogUrl,
  blogTitle,
  blogAuthor,
  blogUrl,
}) => {
  return (
    <form onSubmit={handleAddBlog}>
      <div>
        title
        <input
          type="text"
          value={blogTitle}
          name="title"
          placeholder="title"
          onChange={({ target }) => setBlogTitle(target.value)}
        />
      </div>
      <div>
        author
        <input
          type="text"
          value={blogAuthor}
          name="author"
          title="author"
          onChange={({ target }) => setBlogAuthor(target.value)}
        />
      </div>
      <div>
        url
        <input
          type="text"
          value={blogUrl}
          name="url"
          title="url"
          onChange={({ target }) => setBlogUrl(target.value)}
        />
      </div>
      <button type="submit">create new blog</button>
    </form>
  )
}

export default BlogAddForm
