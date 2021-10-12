import '../assets/styles/UserInfo.css'

const UserInfo = (props) => {

    const { trim, photoURL, displayName, email, className } = props

    return <div className={`user-info-container ${className}`}>
        <img src={photoURL} alt='avata' className="avata"/>
        <div className="text-user-info">
            <p className="display-name">
                {
                    trim && displayName?.length > 15
                    ? displayName.substr(0, 15).concat('...')
                    : displayName
                }
            </p>
            <p className="email">
                {
                    trim && email?.length > 15
                    ? email.substr(0, 15).concat('...')
                    : email
                }
            </p>
        </div>
    </div>
}

export default UserInfo