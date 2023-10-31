import {Component} from 'react'
import {v4} from 'uuid'
import Password from '../Password'
import './index.css'

class PasswordManager extends Component {
  state = {
    passwords: 0,
    websiteInput: '',
    usernameInput: '',
    passwordInput: '',
    passwordsList: [],
    isPasswordShown: false,
    searchInput: '',
  }

  onClickDelete = id => {
    const {passwordsList} = this.state
    const filteredPasswordList = passwordsList.filter(
      eachPassword => eachPassword.id !== id,
    )
    this.setState({passwordsList: filteredPasswordList})

    this.setState(prevState => ({
      passwords: prevState.passwords - 1,
    }))
  }

  onChangeWebsiteName = event => {
    this.setState({websiteInput: event.target.value})
  }

  onChangeUserName = event => {
    this.setState({usernameInput: event.target.value})
  }

  onChangePasswordInput = event => {
    this.setState({passwordInput: event.target.value})
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  getSearchResults = () => {
    const {searchInput, passwordsList} = this.state
    const searchResults = passwordsList.filter(eachPassword =>
      eachPassword.websiteInput
        .toLowerCase()
        .includes(searchInput.toLowerCase()),
    )
    this.setState({passwordsList: searchResults})
  }

  onClickCheckBox = event => {
    if (event.target.checked) {
      this.setState({isPasswordShown: true})
    } else {
      this.setState({isPasswordShown: false})
    }
  }

  onSubmitAddButton = event => {
    event.preventDefault()
    const {
      websiteInput,
      usernameInput,
      isPasswordShown,
      passwordInput,
    } = this.state

    const passwordText = isPasswordShown ? (
      passwordInput
    ) : (
      <img
        src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png "
        alt="stars"
        className="stars-image"
      />
    )

    const newPassword = {
      id: v4(),
      website: websiteInput,
      username: usernameInput,
      password: passwordText,
    }
    this.setState(prevState => ({
      passwordsList: [...prevState.passwordsList, newPassword],
      websiteInput: '',
      usernameInput: '',
      passwordInput: '',
    }))

    this.setState(prevState => ({
      passwords: prevState.passwords + 1,
    }))
  }

  render() {
    const {
      passwords,
      websiteInput,
      usernameInput,
      passwordInput,
      passwordsList,
      searchInput,
    } = this.state
    return (
      <div className="main-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          className="logo-image"
          alt="app logo"
        />
        <div className="add-new-password-background-container">
          <form className="form-container" onSubmit={this.onSubmitAddButton}>
            <h1 className="form-heading">Add New Password</h1>
            <div className="website-container">
              <img
                alt="website"
                className="website-logo"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
              />
              <hr className="hr-line" />
              <input
                type="text"
                value={websiteInput}
                placeholder="Enter Website"
                className="input-element"
                onChange={this.onChangeWebsiteName}
              />
            </div>
            <div className="website-container">
              <img
                alt="username"
                className="website-logo"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
              />
              <hr className="hr-line" />
              <input
                type="text"
                value={usernameInput}
                placeholder="Enter Username"
                className="input-element"
                onChange={this.onChangeUserName}
              />
            </div>
            <div className="website-container">
              <img
                alt="password"
                className="website-logo"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
              />
              <hr className="hr-line" />
              <input
                type="password"
                value={passwordInput}
                placeholder="Enter Password"
                className="input-element"
                onChange={this.onChangePasswordInput}
              />
            </div>
            <div className="button-container">
              <button className="add-button" type="submit">
                Add
              </button>
            </div>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
            className="password-manager-image"
          />
        </div>
        <div className="your-passwords-background-container">
          <div className="password-heading-search-container">
            <div className="Your-passwords-container">
              <h1 className="your-password-text">Your Passwords</h1>
              <div className="no-of-passwords-container">
                <p className="count-of-passwords">{passwords}</p>
              </div>
            </div>
            <div className="search-container">
              <img
                alt="search"
                className="website-logo"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
              />
              <hr className="hr-line" />
              <input
                type="search"
                placeholder="Search"
                value={searchInput}
                className="input-element"
                onChange={this.onChangeSearchInput}
              />
            </div>
          </div>
          <hr />
          <div className="check-box-show-passwords-container">
            <input
              type="checkbox"
              className="check-box"
              id="show-password"
              onChange={this.onClickCheckBox}
            />
            <label className="show-password-text" htmlFor="show-password">
              Show passwords
            </label>
          </div>
          <div className="new-storage-container">
            {passwordsList.length === 0 && (
              <div className="storage-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                  alt="no passwords"
                  className="no-password-container"
                />
                <p className="form-heading">No Passwords</p>
              </div>
            )}
            {passwordsList.length > 0 && (
              <ul className="list-storage-container">
                {passwordsList.map(eachPassword => (
                  <Password
                    passwordDetails={eachPassword}
                    key={eachPassword.id}
                    onClickButtonDelete={this.onClickDelete}
                  />
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default PasswordManager
