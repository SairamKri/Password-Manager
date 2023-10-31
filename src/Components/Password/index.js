import './index.css'

const Password = props => {
  const {passwordDetails, onClickButtonDelete} = props
  const {id, website, username, password} = passwordDetails
  const profileImageText = website.slice(0, 1).toUpperCase()

  const onClickDeleteButton = () => {
    onClickButtonDelete(id)
  }

  return (
    <li className="single-password-container">
      <div className="profile-image-container">
        <p className="profile-image-text">{profileImageText}</p>
      </div>
      <div className="website-name-name-password-container">
        <p className="name-text">{website}</p>
        <p className="name-text">{username}</p>
        <p className="name-text">{password}</p>
      </div>
      <button
        className="delete-button"
        type="button"
        data-testid="delete"
        onClick={onClickDeleteButton}
      >
        <img
          alt="delete"
          className="delete-button-image"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
        />
      </button>
    </li>
  )
}

export default Password
