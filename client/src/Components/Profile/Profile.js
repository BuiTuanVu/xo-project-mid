import React from 'react';
import jwt_decode from 'jwt-decode'

class Profile extends Component {
    constructor() {
        super()
        this.state = {
            username: '',

        }
    }
    componentDidMount() {
        const token = localStorage.token
        const decoded = jwt_decode(token)
        this.setState({
            username: decoded.username
        })
    }
    render() {
        return (
            <div>
                <h1 className="text-center">Profile</h1>
                <p>{this.state.username}</p>
            </div>
        )
    }
}
export default Profile