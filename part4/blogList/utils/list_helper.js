const _ = require('lodash')
const blog = require('../models/blog')

const dummy = (blogs) => {
    return 1
  }
 
const totalLikes = (blogs) => {
    const return_val = blogs.reduce(
        (prev,curr)=> prev + curr.likes , 0
    )
    return return_val
} 

const favoriteBlog = (blogs) => {
    const return_val = blogs.reduce(
        (prev,curr)=> {
            
            if(curr.likes > prev.likes){
                return {
                    title : curr.title,
                    author : curr.author,
                    likes : curr.likes
                }
            }
            else return prev
        } , {likes: 0}
    )
    console.log(return_val)
    return return_val
} 

const mostBlogs = (blogs) => {
    const blogCount = _.countBy(blogs,(blog)=>blog.author)
    let sorted = _.keysIn(blogCount).sort((a,b)=>blogCount[b]-blogCount[a])
    return {
        author: sorted[0],
        blogs: blogCount[sorted[0]]
      }
}

const mostLikes = blogs => {
	const mp = new Map();

	for (const blog of blogs){
		const authorName = blog.author;
		if (mp.has(authorName))
			mp.set(authorName, mp.get(authorName) + blog.likes);
		else
			mp.set(authorName, blog.likes);
	}

	let maxLikes = 0, result = null;
	for (const [k, v] of mp){
		if (v > maxLikes){
			result = {author: k, likes: v};
			maxLikes = v;
		}
	}

	return result;
};

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,mostBlogs,mostLikes
}