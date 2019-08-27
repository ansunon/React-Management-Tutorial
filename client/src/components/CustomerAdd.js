/* 고객 추가 양식 관리 부분 */
import React from 'react';
import { post } from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/Dialogcontent';
import TextField from '@material-ui/core/TextField'; // text 형식을 이용하는 라이브러리
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
    hidden: {
        display: 'none'
    }
})

class  CustomerAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null, // byte 형태의 데이터를 의미하는 부분
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: '', // 파일 이미지의 이름
            open: false // Dialog가 열려있는지 닫혀있는지를 알려주는 변수
        }
    }

    handleClickOpen = () => { // 사용자가 고객 추가 버튼을 누르면 추가할 팝업창이 뜨도록 하는 부분
        this.setState({
            open: true
        })
    }

    handleClose = () => { // 현재 팝업창이 화면에 출력되지 않은 형태가 되도록
        this.setState({
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: '',
            open: false
        })
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
            fileName: '',
            open: false
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
        const { classes } = this.props; // 클래스 변수 초기화

        return (
            <div>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}>고객 추가하기</Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle>고객 추가</DialogTitle>
                     <DialogContent> {/* classes.hidden 을 하는 이유 입력값을 보이지 않게 하기 위해서 */}
                        <input className={classes.hidden} accept="image/*" id="raised-button-file" type="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}/><br/>
                        <label htmlFor="raised-button-file">
                            <Button variant="contained" color="primary" component="span" name="file">
                                {this.state.fileName === "" ? "프로필 이미지 선택" : this.state.fileName}
                            </Button>
                        </label>
                        <br/>
                        <TextField label="이름" type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange}/><br/>
                        <TextField label="생년월일" type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange}/><br/>
                        <TextField label="성별" type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange}/><br/>
                        <TextField label="직업" type="test" name="job" value={this.state.job} onChange={this.handleValueChange}/><br/>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>추가</Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default withStyles(styles)(CustomerAdd);