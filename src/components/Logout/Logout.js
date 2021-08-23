import { getDefaultNormalizer } from '@testing-library/react'
import React, {Component} from 'react'
import { connect } from 'react-redux'
import {logout} from '../../redux/actions/auth'

class Logout extends Component {
    componentDidMount() {
        getDefaultNormalizer()
    }
}

function mapDispatchToProps(dispatch) {
    return {
        logout: () => dispatch(logout())
    }
}

export default connect(null,mapDispatchToProps)(Logout)