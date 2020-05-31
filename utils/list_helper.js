
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum,blog) => {
    return sum + blog.likes
  }
  return blogs.reduce(reducer,0)
}

const favoriteBlog = (blogs) => {
  var max = blogs[0]
  for (var i=1; i<blogs.length; i++) {
    if(max.likes<blogs[i].likes) {
      console.log(blogs[i])
      max = blogs[i]
    }
  }
  return max;
}

module.exports ={
  dummy,
  totalLikes,
  favoriteBlog
}