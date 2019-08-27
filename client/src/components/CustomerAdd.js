/* 고객 추가 양식 관리 부분 */
import React from 'react';
import { post } from 'axios';

class  CustomerAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null, // byte 형태의 데이터를 의미하는 부분
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: '' // 파일 이미지의 이름
        }
    }

    handleFormSubmit = (e) => { // e: 내부적으로 이벤트 변수를 전달받는다.
        e.preventDefault()
        this.addCustomer()
            .then((response) => {
                console.log(response.data);
                this.props.stateRefresh(); // 고객을 추가한 이후에 서버로 응답을 받고나서 고객 목록을 다시 불러와야하므로 여기에 작성해야한다.
            })
        this.setState({
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: ''
        })
        //window.location.reload(); // html 페이지 다시 읽기
    }

    handleFileChange = (e) => {
        this.setState({
        file: e.target.files[0],
        fileName: e.target.value
        });
    }

    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    addCustomer = () => {
        const url ='/api/customers'; // 해당 주소에 보내는 부분을 정의한 부분
        const formData = new FormData(); // formData 객체를 이용해서 데이터를 보내겠다.
        formData.append('image',this.state.file); // byte 데이터를 image라는 이름으로 보내겠다.
        formData.append('name',this.state.userName)
        formData.append('birthday',this.state.birthday);
        formData.append('gender',this.state.gender);
        formData.append('job',this.state.job);

        const config = { // 파일이 포함된 데이터를 서버로 보낼때에는 웹 표준에 맞는 헤더를 추가 해줘야한다.
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return post(url, formData, config); //axios를 이용해서 서버에 데이터를 보내는 부분
    }

    render() { // onsubmit 에서 handleFormSubmit을 이용해서 데이터베이스에 고객 정보를 보낸다.
        return (
            <form onSubmit={this.handleFormSubmit}> 
                <h1>고객 추가</h1>
                프로필 이미지: <input type="file" name="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}/><br/>
                이름: <input type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange}/><br/>
                생년월일: <input type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange}/><br/>
                성별: <input type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange}/><br/>
                직업: <input type="test" name="job" value={this.state.job} onChange={this.handleValueChange}/><br/>
                <button type="submit">추가하기</button>
            </form>
        );
    }
}

export default CustomerAdd;