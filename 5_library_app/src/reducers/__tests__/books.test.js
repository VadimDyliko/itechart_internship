import books from '../books'
import { setBooks } from '../../actions'

describe('SET_BOOKS', () => {
  test('Should return initial state', () => {
    expect(books(undefined, {type:null})).toEqual([])
  })
  test('Should return state with action data', () => {
    expect(books({}, setBooks([1,2,3]))).toEqual([1,2,3])
  })
})
