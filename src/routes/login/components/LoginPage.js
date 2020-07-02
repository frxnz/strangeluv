const React = require('react');
const T = require('prop-types');
const { NavLink } = require('react-router-dom');
const { default: Styled } = require('styled-components');
const { default: Typography } = require('@material-ui/core/Typography');
const { default: TextField } = require('@material-ui/core/TextField');
const { default: Button } = require('@material-ui/core/Button');
const { default: Box } = require('@material-ui/core/Box');
const StrangeForms = require('strange-forms');

const internals = {};

module.exports = class LoginPage extends StrangeForms(React.Component) {

    static propTypes = {
        reqCreateAccount: T.func.isRequired,
        isAuthenticated: T.bool
    };

    static fields = {
        username: '',
        password: ''
    };

    constructor(props) {

        super(props);

        this.state = {
            username: '',
            password: '',
            isSubmitting: false
        };

        this.strangeForm({
            fields: Object.keys(LoginPage.fields),
            get: () => '',
            act: () => null
        });
    }

    disableSubmit() {

        return !this.fieldValue('password') || !this.fieldValue('username');
    }

    handleSubmit = async (ev) => {

        ev.preventDefault();
        const accountInfo = this.formatFields();
        this.setState({ isSubmitting: true });
        const [err] = await this.props.reqCreateAccount(accountInfo);
        this.setState({ isSubmitting: false });
        if (!err) {
            // Login and redirect
        }
    }

    formatFields = () => {

        return {
            username: this.fieldValue('username'),
            password: this.fieldValue('password')
        };
    };

    render() {

        const { isSubmitting } = this.state;
        const { PageContainer, StyledForm } = internals;

        return (
            <PageContainer>
                <Typography variant='h4' align='center' gutterBottom>Log In</Typography>
                <StyledForm onSubmit={this.handleSubmit}>
                    <TextField
                        required
                        type='username'
                        label='Email'
                        value={this.fieldValue('username')}
                        onChange={this.proposeNew('username')}
                    />
                    <TextField
                        required
                        type='password'
                        label='Password'
                        value={this.fieldValue('password')}
                        onChange={this.proposeNew('password')}
                    />
                    <Box
                        my={2}
                    >
                        <Button
                            type='submit'
                            variant='contained'
                            color='primary'
                            fullWidth
                            disabled={this.disableSubmit() || isSubmitting}
                        >
                            Log In
                        </Button>
                        <Typography variant='body2'>Don't have an account? <NavLink to='/join'>Sign up</NavLink></Typography>
                    </Box>
                </StyledForm>
            </PageContainer>
        );
    }
};

internals.StyledForm = Styled.form`
    display: flex;
    flex-direction: column;
`;

internals.PageContainer = Styled.div`
    align-self: center;
    margin: auto;
`;
