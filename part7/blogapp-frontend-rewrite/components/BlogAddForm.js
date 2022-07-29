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
              id="title"
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
              id="author"
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
              id="url"
              type="text"
              value={blogUrl}
              name="url"
              title="url"
              onChange={({ target }) => setBlogUrl(target.value)}
            />
          </div>
          <button type="submit" id="create-button">create new blog</button>
        </form>
      )
}

export default BlogAddForm