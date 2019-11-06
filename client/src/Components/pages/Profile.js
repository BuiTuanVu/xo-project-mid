import React from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import avatar from '../../avatar.jpg';
import { Link } from 'react-router-dom';
import './Profile.css'
import { connect } from 'react-redux';
class Profile extends React.Component {


    constructor(props) {
        super(props);


        this.state = {
            fullname: '',
            username: '',
            errors: {}

        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }


    componentDidMount() {
        const { user } = this.props;
        this.setState({ fullname: user.user.fullname, username: user.user.username })
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault();
        const user = {
            fullname: this.state.fullname,
            username: this.state.username,
            password: this.state.password
        }
        this.props.register(user, this.props.history)
    }

    render() {


        const { user } = this.props
        return (
            <div className='profile-form'>

                <Card style={{ width: '25rem' }}>
                    <Card.Img variant="top" src={avatar} style={{ width: "100%" }} />
                    <Card.Body>
                        <Card.Title>Profile</Card.Title>
                        <Card.Text>
                            Full name: {user.user.fullname}
                        </Card.Text>
                        <Card.Text>
                            Email: Vu Bui
                        </Card.Text>
                        <Card.Text>
                            User name: {user.user.username}
                        </Card.Text>

                        <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                </Card>


                <Form className="form-profile" onSubmit={this.onSubmit}>
                    <Form.Group>
                        <Form.Label htmlFor="name">Username</Form.Label>
                        <Form.Control type="text" id="username"
                            readOnly
                            placeholder="Enter your username"
                            name="username"
                            required
                            value={this.state.username}
                            onChange={this.onChange} autoComplete="off" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="fullname">Full name</Form.Label>
                        <Form.Control type="text" id="fullname"

                            placeholder="Enter your full name"
                            name="fullname"
                            required
                            value={this.state.fullname}
                            onChange={this.onChange} autoComplete="off" />
                    </Form.Group>

                    <div className="FormField">
                        <Button type="submit"
                            className="FormField__Button mr-20">Update Info</Button>
                    </div>
                </Form>

            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.auth.user
})
export default connect(mapStateToProps, null)(Profile);