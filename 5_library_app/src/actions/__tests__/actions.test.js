import configureMockStore from 'redux-mock-store'
import { fetchBooks } from '../index'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'
const mockStore = configureMockStore([thunk])
const store = mockStore({})

describe('fetch books', () => {
  it('should load books', () => {
    fetchMock.getOnce("/books", {
        headers: { 'content-type': 'application/json' },
        body: [1, 2, 3],
      })
    store.dispatch(fetchBooks())
        .then(()=>{
          expect(store.getActions()).toEqual([{ type: 'SET_BOOKS', books: [ 1, 2, 3 ] }])
        })
  })
})
