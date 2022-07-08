import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render,screen } from '@testing-library/react'
import userEvent  from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('form calls handler with right details when blog created',async()=>{
    const mockHandler = jest.fn(e=> e.preventDefault())
    const user = userEvent.setup()

    const container = render(<BlogForm handleCreate={mockHandler}/>).container

    const title = container.querySelector('#title')
    const author = container.querySelector('#author')
    const url = container.querySelector('#url')
    const button = container.querySelector('#createButton')

    await user.type(title,'title')
    await user.type(author,'author')
    await user.type(url,'url')
    await user.click(button)

    expect(mockHandler.mock.calls).toHaveLength(1)
    console.log(mockHandler.mock.calls[0][1].title)
})