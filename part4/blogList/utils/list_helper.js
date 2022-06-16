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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}