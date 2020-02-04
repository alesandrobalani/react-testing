import React from 'react'
import { shallow} from 'enzyme'
import CommentBox from 'components/CommentBox'

let wrapped

beforeEach(() => {
    wrapped = shallow(<CommentBox />)  
})

afterEach(() => {
  wrapped.unmount()
})

it('Shows text area and a button', () => {  
  expect(wrapped.find('textarea').length).toEqual(1)
  expect(wrapped.find('button').length).toEqual(1)
})

it('Value from text area stored in comment status and shows in text area', () => {
  const texto = 'teste texto'
  wrapped.find('textarea').simulate('change', {target: { value: texto}})
  wrapped.update()
  expect(wrapped.find('textarea').prop('value')).toEqual(texto)
  expect(wrapped.state('comment')).toEqual(texto)
})

it('OnSubmit text area and comment status is cleaned', () => {
  const texto = 'teste texto 2'
  wrapped.setState({ comment: texto })
  expect(wrapped.find('textarea').prop('value')).toEqual(texto)
  wrapped.find('form').simulate('submit', { preventDefault:  () => {}})
  wrapped.update()
  expect(wrapped.find('textarea').prop('value')).toEqual('')
  expect(wrapped.state('comment')).toEqual('')
})