import React from 'react';

class CustomerDelete extends React.Component {
    deleteCustomer(id) {
        const url = '/api/customers/' + id; // api/customers/7 고객 데이터가 7인 고객을 삭제하겠다.
        fetch(url, {
            method: 'DELETE'
        })
        this.props.stateRefresh();
    }

    render() {
        return (
            <button onClick={(e) => {this.deleteCustomer(this.props.id)}}>삭제</button>
        )
    }
}

export default CustomerDelete; // 외부에서 사용해야하기 때문에 export를 붙여야한다.