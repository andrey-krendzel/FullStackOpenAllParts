const dummy = require('../utils/list_helper').dummy
const totalLikes = require('../utils/list_helper').totalLikes
const favouriteBlog = require('../utils/list_helper').favouriteBlog

test('dummy test', () => {
    const blogs = []

    const result = dummy(blogs)
    expect(result).toBe(1)
})

describe('total likes', () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      },
      {
        _id: '6a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 111,
        __v: 0
      },
      {
        _id: '7a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 1313,
        __v: 0
      }
    ]
  
    test('when list has only one blog, equals the likes of that', () => {
      const result = totalLikes(listWithOneBlog)
      expect(result).toBe(5+111+1313)
    })

    test('favourite blog should be Go To Statement', () =>{
        let favouriteObject = 
        {   title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            likes: 1313
        }

        let testedFavouriteObject = favouriteBlog(listWithOneBlog)

        expect(testedFavouriteObject).toStrictEqual(favouriteObject);
    })
  })