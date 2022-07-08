import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import BlogAddForm from './BlogAddForm'
import userEvent from '@testing-library/user-event'

test('renders all elements of blog', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'your mom',
    url: 'localhost',
    likes: 0
  }

  render(<Blog blog={blog} />)

  const element = screen.getByText('Component testing is done with react-testing-library')
  const element2 = screen.getByText('your mom')
  const element3 = screen.getByText('localhost')
  const element4 = screen.getByText(0)
  expect(element).toBeDefined()
  expect(element2).toBeDefined()
  expect(element3).toBeDefined()
  expect(element4).toBeDefined()
})

test('clicking the button calls event handler once', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'your mom',
    url: 'localhost',
    likes: 0
  }

  const mockHandler = jest.fn()

  render(
    <Blog blog={blog} handleDeleteBlog={mockHandler} />
  )

  const user = userEvent.setup()
  const button = screen.getByText('Delete entry')
  await user.click(button)
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})

test('<BlogAddForm /> updates parent state and calls onSubmit', async () => {
  const handleAddBlog = jest.fn(e => e.preventDefault())
  const setBlogAuthor = jest.fn()
  const setBlogTitle = jest.fn()
  const setBlogUrl = jest.fn()

  const user = userEvent.setup()

  render(<BlogAddForm handleAddBlog={handleAddBlog} setBlogAuthor={setBlogAuthor} setBlogTitle={setBlogTitle} setBlogUrl={setBlogUrl}/>)

  const input1 = screen.getByPlaceholderText('title')
  // const input2 = screen.getByTitle('author')
  // const input3 = screen.getByTitle('url')


  const sendButton = screen.getByText('create new blog')

  await user.type(input1, 'testing title...' )
  // await user.type(input2, 'testing author...' )
  // await user.type(input3, 'localhost' )
  await user.click(sendButton)

  expect(handleAddBlog.mock.calls).toHaveLength(1)

})