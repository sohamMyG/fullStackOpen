import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render,screen } from '@testing-library/react'
import userEvent  from '@testing-library/user-event'
import Blog from './Blog'


const blog = {
    title : 'you dont',
    author : 'Mikell',
    url : 'ydks.com',
    likes : 7,
    user : {
        name:'adsada',
        username:'dsadas'
    }
}

test('renders title and author but not url or likes by default', () => {
    
    const container = render(<Blog blog={blog} username="dsadas"/>).container

    let element = screen.getByText('you dont Mikell')
    expect(element).toBeDefined()

    element = container.querySelector('.togglable')
    expect(element).toHaveStyle('display:none')
})

test('blog\'s url and likes are shown when button is clicked', async()=>{
    
    const container = render(<Blog blog={blog} username="dsadas"/>).container

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)
   
    const element = container.querySelector('.togglable')
    expect(element).not.toHaveStyle('display:none')
})

test('when like button is clicked twice event handler prop is called twice',async()=>{
    const mockHandler = jest.fn()
    
    render(<Blog blog={blog} username="dsadas" updateBlog={mockHandler}/>)

    const user = userEvent.setup()
    let button = screen.getByText('view')
    await user.click(button)
    button = screen.getByText('like')
    await user.click(button)
    await user.click(button)
    expect(mockHandler.mock.calls).toHaveLength(2)
    screen.debug()
})

