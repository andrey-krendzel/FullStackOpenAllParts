

const Blog = ({ blog, handleDeleteBlog, handleLikeBlog }) => (
  <tr>
    <td>{blog.title}</td>
    <td>{blog.author}</td>
    <td>{blog.url}</td>
    <td>{blog.likes}</td>
    <td><button onClick={() => handleLikeBlog(blog.id)}>Like blog</button></td>
    <td><button onClick={() => handleDeleteBlog(blog.id)}>Delete entry</button></td>
  </tr>
)

export default Blog
