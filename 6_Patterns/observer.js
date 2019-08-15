class NewsEmiter {
  constructor() {
    this.observersList = [],
    this.news = []
  }

  addObserver(newObserver) {
    this.observersList.push(newObserver)
  }

  removeObserver(observerToRemove) {
    this.observersList = this.observersList.filter(observer => {
      if (observerToRemove === observer) return false
      return true
    })
  }

  emitAllObservers() {
    this.observersList.forEach(observer => {
      observer.onNewsUpdate()
    })
  }

  getNews() {
    return this.news
  }

  setNews(newNews) {
    this.news.push(newNews)
    this.emitAllObservers()
  }
}

let newsEmiter = new NewsEmiter()


class User {
  constructor(login) {
    this.login = login
  }
  onNewsUpdate() {
    console.log(this.login, newsEmiter.getNews())
  }
}

let user1 = new User('user1')
let user2 = new User('user2')
let user3 = new User('user3')


newsEmiter.addObserver(user1)
newsEmiter.addObserver(user2)
newsEmiter.addObserver(user3)
newsEmiter.setNews('supr news 1')
newsEmiter.removeObserver(user3)
newsEmiter.setNews('supr news 2')
