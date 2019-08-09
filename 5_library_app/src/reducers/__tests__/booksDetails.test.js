import booksDetails from '../booksDetails'
import { setSingleBook } from '../../actions'

describe('SET_SINGLE_BOOK', () => {
  test('Should return initial state', () => {
    expect(booksDetails(undefined, {type:null})).toEqual({})
  })
  test('Should return state with action data', () => {
    expect(booksDetails({}, setSingleBook({bookId:1}))).toEqual({bookId: 1})
  })
})
